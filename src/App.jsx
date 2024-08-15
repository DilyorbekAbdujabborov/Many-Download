import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import Loading from "./Loading";
import Videbox from "./Videbox";

const App = () => {
  const [api, setApi] = useState({});
  const [inputUrl, setInputUrl] = useState('');
  const urlInput = useRef(null);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [ad, setAd] = useState([]);
  const [adLoading, setAdLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // Check if ad is within the visibility time range
  const isAdVisible = (startAt, endAt) => {
    const now = new Date();
    const start = new Date(startAt);
    const end = new Date(endAt);
    return now >= start && now <= end;
  };

  // Handle URL input and set fetch URL
  const handleLoad = () => {
  const inputValue = urlInput.current.value.trim();
  if (inputValue) {
    setInputUrl(`http://m4788.myxvest.ru/api.php?url=${encodeURIComponent(inputValue)}`);
    urlInput.current.value = '';  // Clear the input field
  }
};


  // Fetch video data when inputUrl changes
  useEffect(() => {
    const fetchData = async () => {
      if (inputUrl) {
        setLoading(true);
        setLoaded(false);
        try {
          const response = await fetch(inputUrl);
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.json();
          setApi(data);
          setLoaded(true);
        } catch (error) {
          console.error("Error fetching video data:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [inputUrl]);

  // // Fetch ads data on component mount
  // useEffect(() => {
  //   const fetchAd = async () => {
  //     setAdLoading(true);
  //     setFetchError(null);
  //     try {
  //       const response = await fetch('https://manydownload.pythonanywhere.com/ads/?format=json');
  //       if (!response.ok) throw new Error('Network response was not ok');
  //       const data = await response.json();
  //       setAd(data);
  //     } catch (error) {
  //       console.error("Error fetching ad:", error);
  //       setFetchError("Failed to fetch ad. There might be an issue with the advertisement service.");
  //     } finally {
  //       setAdLoading(false);
  //     }
  //   };
  //   fetchAd();
  // }, []);

  // Determine the highest quality media
  const highestQualityMedia = api.medias ? api.medias.reduce((prev, current) => 
    (prev.quality > current.quality) ? prev : current
  ) : null;

  // Handle video download
  const handleDownload = () => {
    if (highestQualityMedia && highestQualityMedia.url) {
      const link = document.createElement('a');
      link.href = highestQualityMedia.url;
      link.download = `video.${highestQualityMedia.extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Handle ad click
  const handleAdClick = (adUrl) => {
    window.open(adUrl, '_blank');
  };

  // Filter visible ads
  const visibleAds = ad.filter(adItem => isAdVisible(adItem.start_at, adItem.end_at) && adItem.video_file);

  return (
    <div className='app-container'>
      <header className='app-header'>
        <nav className='navbar'>
          <h1>Video Downloader</h1>
          <p>A website that uploads videos, reels, shorts, and more from social sites</p>
          <a href="https://t.me/ManyDownload_Bot" className='bot-link'>
            <i className='fab fa-telegram'></i> Bot
          </a>
        </nav>
      </header>

      <main className='app-main'>
        <center>
          <div className="urlinput-container">
            <input
              type="text"
              placeholder='Enter video URL here'
              ref={urlInput}
              className='urlinput'
            />
            <button className='btn-load' onClick={handleLoad}>Load</button>
          </div>
        </center>
        <div className='content'>
          {loading ? (
            <Loading />
          ) : loaded ? (
            <>
              <Videbox
                videotitle={api.title || 'No title available'}
                videoSrc={highestQualityMedia ? highestQualityMedia.url : ''}
                videourl={api.url || ''}
                videoduration={api.duration || 'Unknown'}
                videoquality={highestQualityMedia ? highestQualityMedia.quality : 'Unknown'}
                videoextension={highestQualityMedia ? highestQualityMedia.extension : 'mp4'}
                videoformattedSize={highestQualityMedia ? highestQualityMedia.formattedSize : 'Unknown'}
              />
              <center>
                <button className='btn-download' onClick={handleDownload} type="button">Download</button>
              </center>
            </>
          ) : (
            <center>
              <p className='fallback-message'>No video data loaded.</p>
            </center>
          )}
        </div>
{/*         <aside className='advertisement'>
          <h3>Advertisement</h3>
          {adLoading ? (
            <p>Loading ad...</p>
          ) : fetchError ? (
            <p>{fetchError}</p>
          ) : visibleAds.length > 0 ? (
            visibleAds.map(adItem => (
              <a 
                href={adItem.url} 
                key={adItem.id} 
                onClick={(e) => { 
                  e.preventDefault(); 
                  handleAdClick(adItem.url); 
                }}
              >
                <div className='ad-container'>
                  <video className='ad-video' autoPlay muted>
                    <source src={adItem.video_file} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </a>
            ))
          ) : (
            <div className="no-ad">
              <h4>Your ad could be here!</h4>
              <p>Contact us to place your ad. <a href="https://t.me/Manager_Dilyorbek">Telegram</a></p>
            </div>
          )}
        </aside> */}
      </main>
      <footer className='app-footer'>
        <p>© 2024 Many Download App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
