import { tailwindMD3Preset } from "@ayataka0nk/ryokucha-ui";
import type { Config } from "tailwindcss";

const config: Config = {
  presets: [tailwindMD3Preset],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {},
  plugins: [],
};
export default config;
