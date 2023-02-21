import path from "path";
import fs from "fs-extra";
import { type PackageJson } from "type-fest";

export const addScriptDependency = (opts: {
  script: string;
  projectDir: string;
}) => {
  const { script, projectDir } = opts;

  const pkgJson = fs.readJSONSync(
    path.join(projectDir, "package.json"),
  ) as PackageJson;

  if (pkgJson.scripts?.postinstall) {
    const preScript = pkgJson.scripts.postinstall;
    const postScript = preScript + ` && ${script}`;
    pkgJson.scripts.postinstall = postScript;
  } else {
    pkgJson.scripts!.postinstall = script;
  }

  fs.writeJSONSync(path.join(projectDir, "package.json"), pkgJson, {
    spaces: 2,
  });
};
