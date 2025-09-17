import { useEffect, useState } from 'react'
import Typewriter from 'typewriter-effect';
import { Fade } from "react-awesome-reveal";
import { SpotifyDisplay } from './';
import axios from 'axios';

type HomeProps = {
  darkMode: boolean;
}

type SpotifyTrack = {
  id: string;
  name: string;
  artists: { name: string }[];
  external_urls: { spotify: string };
  track: string;
};

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN;
const Home = ({darkMode}: HomeProps) => {
    const [nowPlaying, setNowPlaying] = useState<SpotifyTrack | null>(null);
    const [topTracks, setTopTracks] = useState<SpotifyTrack[] | null>(null);
    const [recentlyPlayed, setRecentlyPlayed] = useState<SpotifyTrack[] | null>(null);

    const basic = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
    const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
    const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks?time_range=short_term`;
    const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=5`;
    const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
    
    const getAccessToken = async () => {

        const params = new URLSearchParams();
        params.append("grant_type", "refresh_token");
        params.append("refresh_token", REFRESH_TOKEN);

        const response = await fetch(TOKEN_ENDPOINT, {
            method: 'POST',
            headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString()
        })

        // return result;
        return response.json()
    }

    const getRecentlyPlayed = async () => {
      const {access_token} = await getAccessToken();

      await axios(RECENTLY_PLAYED_ENDPOINT, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + access_token,
          },
      }).then((response) => {
          setRecentlyPlayed(response.data.items.map((item: SpotifyTrack) => item.track))
      })
    }

    // gets now playing song
    const getNowPlaying = async () => {
        const { access_token } = await getAccessToken()

        await axios(NOW_PLAYING_ENDPOINT, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + access_token,
            },
        }).then((response) => {
            setNowPlaying(response.data.item)
        })
    }

    const getTopTracks = async () => {
        const { access_token } = await getAccessToken()

        await axios(TOP_TRACKS_ENDPOINT, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + access_token,
            },
        }).then((response) => {
            setTopTracks(response.data.items.map((item: SpotifyTrack) => item))
        })
    }

    useEffect(() => {
        getNowPlaying()
        getRecentlyPlayed()
        getTopTracks()
    }, [])

  return (
    <div>
      <div className='flex flex-row max-sm:flex-col items-center justify-between relative'>
        <span className='text-3xl font-mono'>
            <Typewriter
              onInit={(typewriter) => {
                typewriter.typeString("hey, i'm Ricky")
                  .stop()
                  .start();
              }}
            />
        </span>
        <Fade
          delay={2300}
          direction='right'
          triggerOnce={true}
        >
          <h1>📍 Vancouver</h1>
        </Fade>
      </div>
      <Fade
        delay={2300}
        direction='up'
        triggerOnce={true}
      >
        <h1 className='mt-4 text-md font-light max-sm:text-sm max-sm:text-center max-sm:m-4'>just another keyboard warrior from winnipeg trying to break into software engineering.</h1>
      </Fade>
      <SpotifyDisplay 
        nowPlaying={nowPlaying}
        recentlyPlayed={recentlyPlayed}
        topTracks={topTracks}
        darkMode={darkMode}
      />
      <div className={` ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded-xl overflow-hidden`}>
        <Fade
          className='' 
          delay={4000}
          direction="up"
          triggerOnce={true}
        >
          <img
            className="w-full h-full"
            src={`https://leetcard.jacoblin.cool/Laxunie?theme=${darkMode ? "nord" : "light"}&font=Inter&ext=heatmap&border=0`}
          />
        </Fade>
      </div>
    </div>
  )
}

export default Home