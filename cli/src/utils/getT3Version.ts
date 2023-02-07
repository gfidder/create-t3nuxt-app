import type { PackageJson } from "type-fest";
import path from "path";
import fs from "fs-extra";
import { PKG_ROOT } from "~/const.js";

export const getVersion = () => {
  const packageJsonPath = path.join(PKG_ROOT, "package.json");

  const packageJsonContent = fs.readJSONSync(packageJsonPath) as PackageJson;

  return packageJsonContent.version ?? "1.0.0";
};
