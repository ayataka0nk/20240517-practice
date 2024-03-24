import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config";

const fullConfig = resolveConfig(tailwindConfig);

export const getTailwindConfig = () => fullConfig;
export type BaseTailwindConfig = ReturnType<typeof getTailwindConfig>;
