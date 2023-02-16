import fs from "fs-extra";
import path from "path";
import { PKG_ROOT } from "~/const.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";
import type { Installer } from "~/installers/index.js";

export const trpcInstaller: Installer = ({ projectDir, packages }) => {
  addPackageDependency({
    projectDir,
    dependencies: [
      "superjson",
      "@trpc/server",
      "@trpc/client",
      "trpc-nuxt",
      "zod",
    ],
    devMode: false,
  });

  const usingAuth = packages?.nextAuth.inUse;
  const usingPrisma = packages?.prisma.inUse;

  const extrasDir = path.join(PKG_ROOT, "template/extras");

  const apiHandlerSrc = path.join(extrasDir, "src/server/api/trpc/[trpc].ts");
  const apiHandlerDest = path.join(projectDir, "server/api/trpc/[trpc].ts");

  const pluginsSrc = path.join(extrasDir, "src/plugins/client.ts");
  const pluginsDest = path.join(projectDir, "plugins/client.ts");

  const trpcFile =
    usingAuth && usingPrisma
      ? "with-auth-prisma.ts"
      : usingAuth
      ? "with-auth.ts"
      : usingPrisma
      ? "with-prisma.ts"
      : "base.ts";
  const trpcSrc = path.join(extrasDir, "src/server/trpc", trpcFile);
  const trpcDest = path.join(projectDir, "server/trpc/trpc.ts");

  const rootRouterSrc = path.join(extrasDir, "src/server/trpc/root.ts");
  const rootRouterDest = path.join(projectDir, "server/trpc/root.ts");

  const exampleRouterFile =
    usingAuth && usingPrisma
      ? "with-auth-prisma.ts"
      : usingAuth
      ? "with-auth.ts"
      : usingPrisma
      ? "with-prisma.ts"
      : "base.ts";

  const exampleRouterSrc = path.join(
    extrasDir,
    "src/server/trpc/routers/example",
    exampleRouterFile,
  );
  const exampleRouterDest = path.join(
    projectDir,
    "server/trpc/routers/example.ts",
  );

  fs.copySync(apiHandlerSrc, apiHandlerDest);
  fs.copySync(pluginsSrc, pluginsDest);
  fs.copySync(trpcSrc, trpcDest);
  fs.copySync(rootRouterSrc, rootRouterDest);
  fs.copySync(exampleRouterSrc, exampleRouterDest);
};
