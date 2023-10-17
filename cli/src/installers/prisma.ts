import path from "path";
import fs from "fs-extra";

import { PKG_ROOT } from "~/const.js";
import type { Installer } from "~/installers/index.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";
import { addScriptDependency } from "~/utils/addScriptDependency.js";

export const prismaInstaller: Installer = ({ projectDir, packages }) => {
  addPackageDependency({
    projectDir,
    dependencies: ["prisma"],
    devMode: true,
  });
  addPackageDependency({
    projectDir,
    dependencies: ["@prisma/client"],
    devMode: false,
  });

  addScriptDependency({
    projectDir,
    script: "prisma generate",
  });

  const extrasDir = path.join(PKG_ROOT, "template/extras");

  const schemaSrc = path.join(
    extrasDir,
    "prisma/schema",
    packages?.nextAuth.inUse ? "with-auth.prisma" : "base.prisma"
  );
  const schemaDest = path.join(projectDir, "prisma/schema.prisma");

  const clientSrc = path.join(extrasDir, "src/server/db.ts");
  const clientDest = path.join(projectDir, "server/db.ts");

  fs.copySync(schemaSrc, schemaDest);
  fs.copySync(clientSrc, clientDest);
};
