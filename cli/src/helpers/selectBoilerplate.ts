import type { InstallerOptions } from "~/installers/index.js";
import path from "path";
import fs from "fs-extra";
import { PKG_ROOT } from "~/const.js";

type SelectBoilerplateProps = Required<
  Pick<InstallerOptions, "projectDir" | "packages">
>;

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
    indexFile = "with-trpc-tw.vue";
  } else if (usingTRPC && !usingTw) {
    indexFile = "with-trpc.vue";
  } else if (!usingTRPC && usingTw) {
    indexFile = "with-tw.vue";
  }

  if (indexFile !== "") {
    const indexSrc = path.join(indexFileDir, indexFile);
    const indexDest = path.join(projectDir, "pages/index.vue");
    fs.copySync(indexSrc, indexDest);
  }
};

// This selects the proper nuxt.config.ts to be used that showcases the chosen tech
export const selectNuxtConfigFile = ({
  projectDir,
  packages,
}: SelectBoilerplateProps) => {
  const configFileDir = path.join(
    PKG_ROOT,
    "template/extras/config/nuxt-config",
  );

  const usingTRPC = packages.trpc.inUse;
  const usingTw = packages.tailwind.inUse;
  // const usingAuth = packages.nextAuth.inUse;

  let nuxtConfig = "";
  if (usingTw && usingTRPC) {
    nuxtConfig = "with-trpc-tw.ts";
  } else if (usingTw && !usingTRPC) {
    nuxtConfig = "with-tw.ts";
  } else if (!usingTw && usingTRPC) {
    nuxtConfig = "with-trpc.ts";
  }

  if (nuxtConfig !== "") {
    const configSrc = path.join(configFileDir, nuxtConfig);
    const configDest = path.join(projectDir, "nuxt.config.ts");
    fs.copySync(configSrc, configDest);
  }
};
