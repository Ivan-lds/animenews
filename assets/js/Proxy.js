const express = require("express");
const axios = require("axios");
const app = express();

const MAL_CLIENT_ID = "a78c823da099819e4ef186a8923e869f"; // Seu Client ID do MyAnimeList
const MAL_API_URL = "https://api.myanimelist.net/v2";

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/anime/ranking", async (req, res) => {
  try {
    const response = await axios.get(`${MAL_API_URL}/anime/ranking`, {
      headers: {
        "X-MAL-CLIENT-ID": MAL_CLIENT_ID,
      },
      params: {
        ranking_type: "all",
        limit: 8,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Erro ao buscar os dados");
  }
});

app.listen(3001, () => {
  console.log("Servidor proxy rodando na porta 3001");
});
