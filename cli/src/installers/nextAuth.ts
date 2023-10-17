import path from "path";
import fs from "fs-extra";

import { PKG_ROOT } from "~/const.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";
import { AvailableDependencies } from "./dependencyVersionMap.js";
import type { Installer } from "./index.js";

export const nextAuthInstaller: Installer = ({ projectDir, packages }) => {
  const usingPrisma = packages?.prisma.inUse;
  const deps: AvailableDependencies[] = ["next-auth"];
  if (usingPrisma) {
    deps.push("@next-auth/prisma-adapter");
  }

  addPackageDependency({
    projectDir,
    dependencies: ["@sidebase/nuxt-auth"],
    devMode: true,
  });

  addPackageDependency({
    projectDir,
    dependencies: deps,
    devMode: false,
  });

  const extrasDir = path.join(PKG_ROOT, "template/extras");

  const apiHandlerSrc = path.join(
    extrasDir,
    "src/server/api/auth",
    packages?.prisma.inUse ? "with-prisma.ts" : "base.ts"
  );

  const apiHandlerDest = path.join(projectDir, "server/api/auth/[...].ts");

  const nextAuthDTSSrc = path.join(extrasDir, "src/types/next-auth.d.ts");
  const nextAuthDTSDest = path.join(projectDir, "types/next-auth.d.ts");

  fs.copySync(apiHandlerSrc, apiHandlerDest);
  fs.copySync(nextAuthDTSSrc, nextAuthDTSDest);
};
