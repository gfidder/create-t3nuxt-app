import type { InstallerOptions } from "~/installers/index.js";
import path from "path";
import fs from "fs-extra";
import { PKG_ROOT } from "~/const.js";

type SelectBoilerplateProps = Required<
  Pick<InstallerOptions, "projectDir" | "packages">
>;
// This generates the _app.tsx file that is used to render the app
export const selectAppFile = ({
  projectDir,
  packages,
}: SelectBoilerplateProps) => {
  const appFileDir = path.join(PKG_ROOT, "template/extras/src/pages/_app");

  const usingTRPC = packages.trpc.inUse;
  const usingNextAuth = packages.nextAuth.inUse;

  let appFile = "";
  if (usingNextAuth && usingTRPC) {
    appFile = "with-auth-trpc.tsx";
  } else if (usingNextAuth && !usingTRPC) {
    appFile = "with-auth.tsx";
  } else if (!usingNextAuth && usingTRPC) {
    appFile = "with-trpc.tsx";
  }

  if (appFile !== "") {
    const appSrc = path.join(appFileDir, appFile);
    const appDest = path.join(projectDir, "src/pages/_app.tsx");
    fs.copySync(appSrc, appDest);
  }
};

// This selects the proper index.tsx to be used that showcases the chosen tech
export const selectIndexFile = ({
  projectDir,
  packages,
}: SelectBoilerplateProps) => {
  const indexFileDir = path.join(PKG_ROOT, "template/extras/src/pages/index");

  const usingTRPC = packages.trpc.inUse;
  const usingTw = packages.tailwind.inUse;
  const usingAuth = packages.nextAuth.inUse;

  let indexFile = "";
  if (usingTRPC && usingTw && usingAuth) {
    indexFile = "with-auth-trpc-tw.tsx";
  } else if (usingTRPC && !usingTw && usingAuth) {
    indexFile = "with-auth-trpc.tsx";
  } else if (usingTRPC && usingTw) {
    indexFile = "with-trpc-tw.tsx";
  } else if (usingTRPC && !usingTw) {
    indexFile = "with-trpc.tsx";
  } else if (!usingTRPC && usingTw) {
    indexFile = "with-tw.tsx";
  }

  if (indexFile !== "") {
    const indexSrc = path.join(indexFileDir, indexFile);
    const indexDest = path.join(projectDir, "src/pages/index.tsx");
    fs.copySync(indexSrc, indexDest);
  }
};
