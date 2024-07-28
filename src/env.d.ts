/// <reference types="astro/client" />
interface ImportMetaEnv {
    readonly DEBUG: boolean;
    readonly DEBUG_REQUEST: boolean;
    readonly DATABASE_URL: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }