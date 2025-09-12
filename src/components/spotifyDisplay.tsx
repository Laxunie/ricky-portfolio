import { useEffect, useRef, useState } from "react";
import { Fade } from "react-awesome-reveal";

type SpotifyTrack = {
  id: string;
  name: string;
  artists: { name: string }[];
  external_urls: { spotify: string };
};

const SpotifyDisplay = ({
    nowPlaying,
    recentlyPlayed,
    topTracks,
    darkMode,
  }: {
    nowPlaying: SpotifyTrack | null;
    recentlyPlayed: SpotifyTrack[] | null;
    topTracks: SpotifyTrack[] | null;
    darkMode: boolean;
  }) => {
  const [index, setIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [highlightStyle, setHighlightStyle] = useState({ left: 0, width: 0 });

  const updateHighlight = () => {
    const container = containerRef.current;
    if (!container) return;

    const linkEls = Array.from(container.querySelectorAll("a")) as HTMLElement[];
    const linkEl = linkEls[index];
    if (!linkEl) return;

    setHighlightStyle({
      left: linkEl.offsetLeft,
      width: linkEl.offsetWidth,
    });
  };

  useEffect(() => {
    updateHighlight();
    window.addEventListener("resize", updateHighlight);
    return () => window.removeEventListener("resize", updateHighlight);
  }, [index, recentlyPlayed, nowPlaying, topTracks]);

  return (
    <div className="my-4">
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold"> {nowPlaying ? "Now Playing" : "Recently Played"}</h2>
          <div
            className={`relative flex gap-4 text-sm font-light ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-sm:hidden`}
            ref={containerRef}
          >
            <div
              className={`absolute top-0 h-full rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} transition-all duration-300`}
              style={{
                left: highlightStyle.left,
                width: highlightStyle.width,
              }}
            ></div>
            <a
              className={`relative px-3 py-2 cursor-pointer ${darkMode ? 'hover:text-gray-100' : 'hover:text-gray-900'} z-10 ${index === 0 ? 'font-semibold' : ''}`}
              onClick={() => setIndex(0)}
            >
              Recently Played
            </a>
            <a
              className={`relative px-3 py-2 cursor-pointer ${darkMode ? 'hover:text-gray-100' : 'hover:text-gray-900'} z-10 ${index === 1 ? 'font-semibold' : ''}`}
              onClick={() => setIndex(1)}
            >
              Top Tracks
            </a>
          </div>
        </div>

        {recentlyPlayed && recentlyPlayed.length > 0 && (
          <div className="flex flex-row max-sm:flex-col gap-4 mt-4">
            {/* Big embed */}
            <div className="">
              <div
                className={`${
                  darkMode ? "bg-gray-800" : "bg-gray-200"
                } rounded-xl overflow-hidden h-[352px]`}
              >
                <Fade direction="up" triggerOnce={true} delay={4000}>
                  <iframe
                    key={
                      nowPlaying
                        ? nowPlaying.id
                        : recentlyPlayed[0].id
                    }
                    className="rounded-xl"
                    src={`https://open.spotify.com/embed/track/${
                      nowPlaying ? nowPlaying.id : recentlyPlayed[0].id
                    }`}
                    width="300"
                    height="362"
                    allow="encrypted-media"
                  />
                </Fade>
              </div>
            </div>
            <div
              className={`flex gap-4 text-sm font-light ${darkMode ? 'text-gray-300' : 'text-gray-600'} sm:hidden`}
            >
              <a
                className={`px-3 py-2 cursor-pointer hover:text-gray-900 z-10 ${index === 0 ? 'font-semibold' : ''}`}
                onClick={() => setIndex(0)}
              >
                Recently Played
              </a>
              <a
                className={`px-3 py-2 cursor-pointer hover:text-gray-900 z-10 ${index === 1 ? 'font-semibold' : ''}`}
                onClick={() => setIndex(1)}
              >
                Top Tracks
              </a>
            </div>

            {/* Small embeds */}
            <div className="flex flex-col gap-4">
              {index === 0
                ? recentlyPlayed.slice(1, 5).map((track) => (
                    <div
                      key={track.id}
                      className={`${
                        darkMode ? "bg-gray-800" : "bg-gray-200"
                      } rounded-xl overflow-hidden`}
                    >
                      <Fade direction="up" triggerOnce={true} delay={4000}>
                        <iframe
                          className="rounded-xl"
                          src={`https://open.spotify.com/embed/track/${track.id}`}
                          width="300"
                          height="80"
                          allow="encrypted-media"
                        />
                      </Fade>
                    </div>
                  ))
                : topTracks?.slice(1, 5).map((track) => (
                  <div
                    key={track.id}
                    className={`${
                      darkMode ? "bg-gray-800" : "bg-gray-200"
                    } rounded-xl overflow-hidden`}
                  >
                    <Fade direction="up" triggerOnce={true} delay={4000}>
                      <iframe
                        className="rounded-xl"
                        src={`https://open.spotify.com/embed/track/${track.id}`}
                        width="300"
                        height="80"
                        allow="encrypted-media"
                      />
                    </Fade>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpotifyDisplay;
