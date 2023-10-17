import path from "path";
import fs from "fs-extra";

import { PKG_ROOT } from "~/const.js";
import type { InstallerOptions } from "~/installers/index.js";

type SelectBoilerplateProps = Required<
  Pick<InstallerOptions, "projectDir" | "packages">
>;

// This selects the proper index.vue to be used that showcases the chosen tech
export const selectIndexFile = ({
  projectDir,
  packages,
}: SelectBoilerplateProps) => {
  const indexFileDir = path.join(PKG_ROOT, "template/extras/src/pages/index");

  const usingTRPC = packages.trpc.inUse;
  const usingTw = packages.tailwind.inUse;
  const usingAuth = packages.nextAuth.inUse;

  let indexFile = "";
  if (usingTRPC && usingAuth && usingTw) {
    indexFile = "with-auth-trpc.vue";
  } else if (usingTRPC && usingAuth && !usingTw) {
    indexFile = "with-auth-trpc.vue";
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

// This selects the proper index.tsx to be used that showcases the chosen tech
export const selectAuthShowcaseFile = ({
  projectDir,
  packages,
}: SelectBoilerplateProps) => {
  const componentFileDir = path.join(
    PKG_ROOT,
    "template/extras/src/components/AuthShowcase"
  );

  const usingTRPC = packages.trpc.inUse;
  const usingTw = packages.tailwind.inUse;
  const usingAuth = packages.nextAuth.inUse;

  let componentFile = "";
  if (usingTRPC && !usingTw && usingAuth) {
    componentFile = "with-auth.vue";
  } else if (usingTRPC && usingTw && usingAuth) {
    componentFile = "with-auth-tw.vue";
  }

  if (componentFile !== "") {
    const indexSrc = path.join(componentFileDir, componentFile);
    const indexDest = path.join(projectDir, "components/AuthShowcase.vue");
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
    "template/extras/config/nuxt-config"
  );

  const usingTRPC = packages.trpc.inUse;
  const usingTw = packages.tailwind.inUse;
  const usingAuth = packages.nextAuth.inUse;

  let nuxtConfig = "";
  if (usingTw && usingTRPC && usingAuth) {
    nuxtConfig = "with-auth-trpc-tw.ts";
  } else if (usingTw && usingTRPC && !usingAuth) {
    nuxtConfig = "with-trpc-tw.ts";
  } else if (usingTw && !usingTRPC && usingAuth) {
    nuxtConfig = "with-auth-tw.ts";
  } else if (usingTw && !usingTRPC && !usingAuth) {
    nuxtConfig = "with-tw.ts";
  } else if (!usingTw && usingTRPC && usingAuth) {
    nuxtConfig = "with-auth-trpc.ts";
  } else if (!usingTw && usingTRPC && !usingAuth) {
    nuxtConfig = "with-trpc.ts";
  } else if (!usingTw && !usingTRPC && usingAuth) {
    nuxtConfig = "with-auth.ts";
  }

  if (nuxtConfig !== "") {
    const configSrc = path.join(configFileDir, nuxtConfig);
    const configDest = path.join(projectDir, "nuxt.config.ts");
    fs.copySync(configSrc, configDest);
  }
};
