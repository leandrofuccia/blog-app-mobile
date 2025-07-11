/*const fs = require("fs");
const os = require("os");
const path = require("path");

function getLocalIPAddress() {
  const interfaces = os.networkInterfaces();

  // Tenta encontrar uma interface Wi-Fi
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

  // Se não achar, pega qualquer IPv4
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

*/

const fs = require("fs");
const os = require("os");
const path = require("path");

function getLocalIPAddress() {
  const interfaces = os.networkInterfaces();

  // Tenta encontrar uma interface Wi-Fi primeiro
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

  // Se não encontrar, pega qualquer IPv4 não interna
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
console.log(`🌐 IP detectado: ${ip}`);

// Atualizar .env
const envPath = path.join(__dirname, "..", ".env");
if (fs.existsSync(envPath)) {
  let env = fs.readFileSync(envPath, "utf-8");
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
  console.log(`✅ EXPO_PUBLIC_API_URL atualizado no .env`);
} else {
  console.warn(`⚠️ Arquivo .env não encontrado, ignorando atualização do .env`);
}

// Atualizar docker-compose.yml
const composePath = path.join(__dirname, "..", "docker-compose.yml");
if (fs.existsSync(composePath)) {
  let compose = fs.readFileSync(composePath, "utf-8");
  const composeUpdated = compose.replace(
    /NEXT_PUBLIC_API_URL:.*$/m,
    `NEXT_PUBLIC_API_URL: http://${ip}:3002`
  );
  fs.writeFileSync(composePath, composeUpdated, "utf-8");
  console.log(`✅ NEXT_PUBLIC_API_URL atualizado no docker-compose.yml`);
} else {
  console.warn(`⚠️ docker-compose.yml não encontrado, ignorando atualização do docker-compose.yml`);
}

// Atualizar src/services/api.ts
const apiPath = path.join(__dirname, "..", "src", "services", "api.ts");
if (fs.existsSync(apiPath)) {
  let apiFile = fs.readFileSync(apiPath, "utf-8");

  // Substitui apenas a parte do "http://10.0.2.2:3002"
  const newLine = `? "http://${ip}:3002"`;
  apiFile = apiFile.replace(
    /const localhost =([\s\S]*?)\? "http:\/\/.*?:3002"/,
    `const localhost =\n  Platform.OS === 'android'\n  ${newLine}`
  );

  fs.writeFileSync(apiPath, apiFile, "utf-8");
  console.log(`✅ src/services/api.ts atualizado com IP http://${ip}:3002`);
} else {
  console.warn(`⚠️ src/services/api.ts não encontrado, ignorando atualização do api.ts`);
}

