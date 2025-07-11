const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");
const os = require("os");

function getLocalIPAddress() {
  const interfaces = os.networkInterfaces();
  const preferred = ["Wi-Fi", "WLAN", "Wireless Network Connection"];
  for (const name of preferred) {
    const iface = interfaces[name];
    if (iface) {
      for (const net of iface) {
        if (net.family === "IPv4" && !net.internal) {
          return net.address;
        }
      }
    }
  }
  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name]) {
      if (net.family === "IPv4" && !net.internal) {
        return net.address;
      }
    }
  }
  return "127.0.0.1";
}

const ip = getLocalIPAddress();
console.log(`✅ IP detectado: ${ip}`);

const envPath = path.join(__dirname, "..", ".env");
const composePath = path.join(__dirname, "..", "docker-compose.yml");

// Atualiza .env
let env = "";
if (fs.existsSync(envPath)) {
  env = fs.readFileSync(envPath, "utf-8");
}
let foundExpo = false;
const envUpdated = env
  .split("\n")
  .map((line) => {
    if (line.startsWith("EXPO_PUBLIC_API_URL=")) {
      foundExpo = true;
      return `EXPO_PUBLIC_API_URL=http://${ip}:3002`;
    }
    return line;
  });
if (!foundExpo) {
  envUpdated.push(`EXPO_PUBLIC_API_URL=http://${ip}:3002`);
}
fs.writeFileSync(envPath, envUpdated.join("\n"), "utf-8");
console.log(`✅ EXPO_PUBLIC_API_URL atualizado para http://${ip}:3002`);

// Atualiza docker-compose.yml
let compose = fs.readFileSync(composePath, "utf-8");
const composeUpdated = compose.replace(
  /NEXT_PUBLIC_API_URL:.*$/m,
  `NEXT_PUBLIC_API_URL: http://${ip}:3002`
);
fs.writeFileSync(composePath, composeUpdated, "utf-8");
console.log(`✅ NEXT_PUBLIC_API_URL atualizado para http://${ip}:3002`);

console.log(`\n🔄 Baixando imagem do Docker Hub...`);
execSync("docker pull leandrofuccia/blog-app-mobile:latest", { stdio: "inherit" });

console.log(`\n🚀 Subindo containers...`);
execSync("docker compose up -d", { stdio: "inherit" });

console.log(`\n✅ Tudo pronto! Use 'docker logs -f blog-app-mobile' para ver o QR Code.`);
