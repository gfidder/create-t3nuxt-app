import path from "path";
import fs from "fs-extra";

import { PKG_ROOT } from "~/const.js";
import type { Installer } from "~/installers/index.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";

export const tailwindInstaller: Installer = ({ projectDir }) => {
  addPackageDependency({
    projectDir,
    dependencies: [
      "tailwindcss",
      "postcss",
      "autoprefixer",
      "prettier",
      "prettier-plugin-tailwindcss",
      "@types/prettier",
    ],
    devMode: true,
  });

  const extrasDir = path.join(PKG_ROOT, "template/extras");

  const twCfgSrc = path.join(extrasDir, "config/tailwind.config.ts");
  const twCfgDest = path.join(projectDir, "tailwind.config.ts");

  const prettierSrc = path.join(extrasDir, "config/prettier.config.cjs");
  const prettierDest = path.join(projectDir, "prettier.config.cjs");

  const cssSrc = path.join(extrasDir, "src/assets/global.css");
  const cssDest = path.join(projectDir, "assets/global.css");

  fs.copySync(twCfgSrc, twCfgDest);
  fs.copySync(cssSrc, cssDest);
  fs.copySync(prettierSrc, prettierDest);
};
