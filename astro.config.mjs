import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://itsfdavid.com",
  integrations: [sitemap()],
  build: {
    inlineStylesheets: "auto",
  },
  server: {
    port: 4321,
    allowedHosts: [".itsfdavid.com"],
  },
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
