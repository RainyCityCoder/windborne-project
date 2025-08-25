import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// --- Proxy route ---
app.get("/api/treasure/:file", async (req, res) => {
  const upstream = process.env.TREASURE_BASE_URL;
  if (!upstream) {
    console.error("Balloon API not set");
    return res.status(500).json({ error: "Proxy Server misconfigured" });
  }

  try {
    // Get balloon data
    const response = await fetch(
      // `https://a.windbornesystems.com/treasure/${req.params.file}`
      `${upstream}/${req.params.file}`
    );
    if (!response.ok) {
      return res.status(response.status).send("Failed to fetch balloon data");
    }
    const data = await response.json(); // [[lat, lon, alt] ...]

    // Pick 12 random balloons (avoids overquerying is-on-water API)
    const sampleSize = 12;
    const shuffled = [...data].sort(() => 0.5 - Math.random());
    const sample = shuffled.slice(0, sampleSize);

    // Map balloon coordinates to boolean isOverWater value
    const completeArray = await Promise.all(
      sample.map(async ([lat, lon, alt]) => {
        try {
          const waterResp = await fetch(
            `https://is-on-water.balbona.me/api/v1/get/${lat}/${lon}`
          );
          if (!waterResp.ok) {
            console.error("Over-water API HTTP error", waterResp.status);
            return [lat, lon, alt, null];
          }
          try {
            const isOverWater = await waterResp.json();
            return [lat, lon, alt, isOverWater.isWater];
          } catch (parseErr) {
            console.error("Invalid JSON from over-water API: ", parseErr);
            return [lat, lon, alt, null];
          }
        } catch (err) {
          console.error("Over-water API failed for ", lat, lon, err);
          return [lat, lon, alt, null]; // null value if over-water api call failes for given coordinates
        }
      })
    );

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(completeArray);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Proxy failed" });
  }
});

// --- Serve React build ---
// After running `npm run build`, Vite outputs into "dist"
app.use(express.static(path.join(__dirname, "dist")));
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// --- Start server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
