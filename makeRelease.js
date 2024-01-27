/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

function release(version) {
    // Actualiza la versión en package.json
    const packageJsonPath = path.join(".", "package.json");
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
    packageJson.version = version;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    // Hace commit del cambio
    execSync(`git commit -am v${version}`);

    // Etiqueta el commit
    execSync(`git tag v${version}`);

    // Hace push de los cambios a GitHub
    execSync("git push && git push --tags");
}

// Llama a la función release con la versión que quieres lanzar
const version = process.argv[2];
if (!version) {
    console.error("Please provide a version");
    process.exit(1);
}
release(version);