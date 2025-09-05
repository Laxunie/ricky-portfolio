/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SPOTIFY_CLIENT_ID: string;
  readonly VITE_SPOTIFY_CLIENT_SECRET: string;
  // add other env vars here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}