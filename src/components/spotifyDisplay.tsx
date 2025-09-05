import { useEffect, useRef, useState } from "react";
import { Fade } from "react-awesome-reveal";

type SpotifyTrack = {
  id: string;
  name: string;
  artists: { name: string }[];
  external_urls: { spotify: string };
};

const SpotifyDisplay = ({nowPlaying, recentlyPlayed, topTracks, darkMode}: {nowPlaying: SpotifyTrack | null, recentlyPlayed: SpotifyTrack[] | null, topTracks: SpotifyTrack[] | null, darkMode: boolean}) => { 
  const [index, setIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [highlightStyle, setHighlightStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const linkEls = Array.from(container.querySelectorAll('a')) as HTMLElement[];
    const linkEl = linkEls[index]; // get the correct <a> by index
    if (!linkEl) return;

    setHighlightStyle({
      left: linkEl.offsetLeft,
      width: linkEl.offsetWidth,
    });
  }, [index, recentlyPlayed, nowPlaying, topTracks]);

    return (
      <div className="my-4">
        <div className="flex justify-between my-2 max-sm:flex-col sm:hidden">
          <h2 className="text-lg font-semibold max-sm:text-sm">{nowPlaying ? "Now Playing" : "Recently Played"}</h2>
          {recentlyPlayed && recentlyPlayed.length > 0 && (
            <>
              {
                nowPlaying ? (
                  <div className={` ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded-xl overflow-hidden w-[300px] h-[80px]`}>
                    <Fade direction="up" triggerOnce={true} delay={4000}>
                      <iframe
                        key={nowPlaying.id}
                        className="rounded-xl"
                        src={`https://open.spotify.com/embed/track/${nowPlaying.id}`}
                        width="300"
                        height="80"
                        allow="encrypted-media"
                      />
                    </Fade>
                  </div>
                ) : (
                  <div className={` ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded-xl overflow-hidden w-[300px] h-[80px]`}>
                    <Fade direction="up" triggerOnce={true} delay={4000}>
                      <iframe
                        key={recentlyPlayed[0].id}
                        className="rounded-xl"
                        src={`https://open.spotify.com/embed/track/${recentlyPlayed[0].id}`}
                        width="300"
                        height="80"
                        allow="encrypted-media"
                      />
                    </Fade>
                  </div>
                )
              }
              {/* 4 stacked small ones on the right */}
              <div className="relative flex gap-4 text-sm font-light text-gray-600 justify-center mt-4 mb-2" ref={containerRef}>
                {/* Moving highlight */}
                <div
                  className="absolute top-0 h-full rounded-lg bg-gray-200 transition-all duration-300"
                  style={{
                    left: highlightStyle.left,
                    width: highlightStyle.width,
                  }}
                ></div>
                <a className="relative px-3 py-2 cursor-pointer hover:text-gray-900 z-10" onClick={() => setIndex(0)}>Recently Played</a>
                <a className="relative px-3 py-2 cursor-pointer hover:text-gray-900 z-10" onClick={() => setIndex(1)}>Top Tracks</a>
              </div>
              <div className="flex flex-col gap-4">
                {index === 0 ? (
                  recentlyPlayed.slice(1, 5).map((track) => (
                    <div className={` ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded-xl overflow-hidden w-[300px] h-[80px]`}>
                      <Fade key={track.id} direction="up" triggerOnce={true} delay={4000}>
                        <iframe
                          key={track.id}
                          className="rounded-xl"
                          src={`https://open.spotify.com/embed/track/${track.id}`}
                          width="300"
                          height="80"
                          allow="encrypted-media"
                        />
                      </Fade>
                    </div>
                  ))) : (
                  topTracks && topTracks.length > 1 && (
                    <div className="flex flex-col gap-4 ">
                      {topTracks.slice(1, 5).map((track) => (
                      <div className={` ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded-xl overflow-hidden w-[300px] h-[80px]`}>
                        <Fade key={track.id} direction="up" triggerOnce={true} delay={4000}>
                          <iframe
                            key={track.id}
                            className="rounded-xl"
                            src={`https://open.spotify.com/embed/track/${track.id}`}
                          width="300"
                          height="80"
                          allow="encrypted-media"
                        />
                        </Fade>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="flex gap-4 max-sm:hidden">
          {recentlyPlayed && recentlyPlayed.length > 0 && (
            <>
              {/* Big one on the left */}
              {
                nowPlaying ? (
                  <div className={` ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded-xl overflow-hidden h-[352px]`}>
                    <Fade direction="up" triggerOnce={true} delay={4000}>
                      <iframe
                        key={nowPlaying.id}
                        className="flex-shrink-0 rounded-xl"
                        src={`https://open.spotify.com/embed/track/${nowPlaying.id}`}
                        width="300"
                        height="362"
                        allow="encrypted-media"
                      />
                    </Fade>
                  </div>
                ) : (
                  <div className={` ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded-xl overflow-hidden h-[352px]`}>
                    <Fade direction="up" triggerOnce={true} delay={4000}>
                      <iframe
                        key={recentlyPlayed[0].id}
                        className="flex-shrink-0 rounded-xl"
                        src={`https://open.spotify.com/embed/track/${recentlyPlayed[0].id}`}
                        width="300"
                        height="380"
                        allow="encrypted-media"
                      />
                    </Fade>
                  </div>
                )
              }
              {/* 4 stacked small ones on the right */}
              <div className="flex flex-col gap-4">
                {index === 0 ? (
                  recentlyPlayed.slice(1, 5).map((track) => (
                    <div className={` ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded-xl overflow-hidden`}>
                      <Fade key={track.id} direction="up" triggerOnce={true} delay={4000}>
                        <iframe
                          key={track.id}
                          className="rounded-xl"
                          src={`https://open.spotify.com/embed/track/${track.id}`}
                          width="300"
                          height="80"
                          allow="encrypted-media"
                        />
                      </Fade>
                    </div>
                  ))) : (
                  topTracks && topTracks.length > 1 && (
                    <div className="flex flex-col gap-4 ">
                      {topTracks.slice(1, 5).map((track) => (
                        <div className={` ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded-xl overflow-hidden`}>
                        <Fade key={track.id} direction="up" triggerOnce={true} delay={4000}>
                          <iframe
                            key={track.id}
                            className="rounded-xl"
                            src={`https://open.spotify.com/embed/track/${track.id}`}
                            width="300"
                            height="80"
                            allow="encrypted-media"
                          />
                        </Fade>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    ) 
}

export default SpotifyDisplay