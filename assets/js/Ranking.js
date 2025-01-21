async function fetchTopAnimes() {
  try {
    console.log("Iniciando a busca dos top animes...");

    const response = await fetch("/.netlify/functions/anime-ranking");
    console.log("Requisição enviada, aguardando resposta...");

    if (!response.ok) {
      throw new Error("Erro ao buscar os dados: " + response.statusText);
    }

    console.log("Resposta recebida com sucesso!");
    const data = await response.json();
    console.log("Dados convertidos para JSON:", data);

    const topAnimes = data.data;
    console.log("Top animes extraídos:", topAnimes);

    const rankingContainer = document.querySelector(".ranking-melhores");
    console.log("Contêiner de ranking encontrado:", rankingContainer);

    topAnimes.forEach((anime, index) => {
      console.log(`Processando anime ${index + 1}:`, anime.node);

      const animeElement = document.createElement("div");
      animeElement.classList.add("ranking-anime");

      const rankElement = document.createElement("h2");
      rankElement.textContent = `${index + 1}º -`;

      const imgElement = document.createElement("img");
      imgElement.src = anime.node.main_picture
        ? anime.node.main_picture.medium
        : "";
      imgElement.alt = anime.node.title;

      const titleElement = document.createElement("p");
      titleElement.classList.add("titulo");
      titleElement.textContent = anime.node.title;

      animeElement.appendChild(rankElement);
      animeElement.appendChild(imgElement);
      animeElement.appendChild(titleElement);

      const rankingItem = document.createElement("div");
      rankingItem.classList.add("ranking");
      rankingItem.appendChild(animeElement);

      console.log("Item do ranking criado:", rankingItem);
      rankingContainer.appendChild(rankingItem);
    });

    console.log("Todos os animes foram adicionados ao ranking com sucesso!");
  } catch (error) {
    console.error("Erro ao buscar os dados ou processar:", error.message);
  }
}

fetchTopAnimes();
