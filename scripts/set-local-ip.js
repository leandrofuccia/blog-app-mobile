const fs = require("fs");
const os = require("os");
const path = require("path");

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
console.log(` IP detectado: ${ip}`);

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
  console.log(`EXPO_PUBLIC_API_URL atualizado no .env`);
} else {
  console.warn(` .env não encontrado, ignorando`);
}

const composePath = path.join(__dirname, "..", "docker-compose.yml");
if (fs.existsSync(composePath)) {
  let compose = fs.readFileSync(composePath, "utf-8");
  const composeUpdated = compose.replace(
    /NEXT_PUBLIC_API_URL:.*$/m,
    `NEXT_PUBLIC_API_URL: http://${ip}:3002`
  );
  fs.writeFileSync(composePath, composeUpdated, "utf-8");
  console.log(` NEXT_PUBLIC_API_URL atualizado no docker-compose.yml`);
} else {
  console.warn(` docker-compose.yml não encontrado, ignorando`);
}


const apiPath = path.join(__dirname, "..", "src", "services", "api.ts");
if (fs.existsSync(apiPath)) {
  let apiFile = fs.readFileSync(apiPath, "utf-8");

  const regex = /const IP_LOCAL = "http:\/\/.*?:3002";/;
  const newLine = `const IP_LOCAL = "http://${ip}:3002";`;

  if (regex.test(apiFile)) {
    apiFile = apiFile.replace(regex, newLine);
    fs.writeFileSync(apiPath, apiFile, "utf-8");
    console.log(` src/services/api.ts atualizado com IP ${ip}`);
  } else {
    console.warn(` Linha const IP_LOCAL não encontrada no api.ts`);
  }
} else {
  console.warn(` src/services/api.ts não encontrado, ignorando`);
}
