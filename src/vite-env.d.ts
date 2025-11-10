/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SHOW_LANGUAGE_SELECTOR?: boolean;
  readonly VITE_APP_ASSETS_DIR: string;
  readonly VITE_EXTERNAL_ECHARTS_SCRIPT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
