const axios = require("axios");

const MAL_CLIENT_ID = "a78c823da099819e4ef186a8923e869f";
const MAL_API_URL = "https://api.myanimelist.net/v2";

exports.handler = async function (event, context) {
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
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: "Erro ao buscar os dados",
    };
  }
};
