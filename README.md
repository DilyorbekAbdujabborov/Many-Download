# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

        <aside className='advertisement'>
          <h3>Advertisement</h3>
          {adLoading ? (
            <p>Loading ad...</p>
          ) : fetchError ? (
            <p>{fetchError}</p>
          ) : ad.length > 0 ? (
            ad.map(ad => (
              ad.video_file ? (
                <a href={ad.url}><div key={ad.id} className='ad-container' onClick={() => handleAdClick(ad.video_file)}>
                  <video className='ad-video' autoPlay={true}>
                    <source src={ad.video_file} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div></a>
              ) : null
            ))
          ) : (
            <div className="no-ad"><br/>
              <h4>Sizning reklamangiz shu yerda bo'lishi mumkin!</h4><br/>
              <p>Reklamangizni joylashtirish uchun biz bilan bog'laning. <br/><br /><a href="https://t.me/Manager_Dilyorbek">Telegram</a></p></div>
          )}
        </aside>
