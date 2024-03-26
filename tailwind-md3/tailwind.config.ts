import {tailwindMD3Preset} from './lib/tailwind-md3-preset'

export default {
  content: ['./lib/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  presets: [tailwindMD3Preset],
  theme: {
    extend: {}
  },
  plugins: []
}
