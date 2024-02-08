const baseURL = "https://pokeapi.co/api/v2/pokemon";
const pokemonListContainer = document.getElementById("pokemon-list");
const pokemonInfoContainer = document.getElementById("pokemon-info");

const getRandomPokemonId = () => {
  return Math.floor(Math.random() * 1025) + 1; 
};

const axiosPokemon = async (nombre) => {
  try {
    const response = await axios.get(`${baseURL}/${nombre}`);
    const datos = response.data;
    const pokemonData = `
      <h2>${datos.name.toUpperCase()}</h2>
      <p>Altura: ${datos.height} m</p>
      <p>Peso: ${datos.weight} kg</p>
      <p>Habilidades: ${datos.abilities.length}</p>
      <p>Experiencia base: ${datos.base_experience}</p>
      <p>ID: ${datos.id}</p>
      <p><img src=${datos.sprites.other.dream_world.front_default}></p>
      <p><img src=${datos.sprites.front_shiny} class="shiny-image"></p>
    `;

    // Crear un nuevo div para cargar los datos del Pokémon
    const pokemonInfoDiv = document.createElement("div");
    pokemonInfoDiv.classList.add("pokemon-info");
    pokemonInfoDiv.innerHTML = pokemonData;

    // Limpiar el contenedor antes de agregar el nuevo div
    pokemonInfoContainer.innerHTML = "";
    
    // Agregar el nuevo div al contenedor
    pokemonInfoContainer.appendChild(pokemonInfoDiv);

    // Centrar el contenedor horizontalmente
    pokemonInfoContainer.style.display = "flex";
    pokemonInfoContainer.style.alignItems = "center";
    pokemonInfoContainer.style.justifyContent = "center";
  } catch (error) {
    console.log(error);
    pokemonInfoContainer.innerHTML = "Pokémon no encontrado";
  }
};

const displayRandomPokemonList = async () => {
  try {
    for (let i = 0; i < 24; i++) {
      const randomPokemonId = getRandomPokemonId();
      const response = await axios.get(`${baseURL}/${randomPokemonId}`);
      const pokemon = response.data;
      const pokemonCard = document.createElement("div");
      pokemonCard.classList.add("pokemon-card");

      const pokemonImage = document.createElement("img");
      pokemonImage.src = pokemon.sprites.front_default;
      pokemonCard.appendChild(pokemonImage);

      const shinyImage = document.createElement("img");
      shinyImage.src = pokemon.sprites.front_shiny;
      shinyImage.classList.add("shiny-image");
      shinyImage.style.display = "none";
      pokemonCard.appendChild(shinyImage);

      const pokemonName = document.createElement("p");
      pokemonName.textContent = pokemon.name;
      pokemonName.classList.add("pokemon-name");
      pokemonCard.appendChild(pokemonName);

      // Utilizar una función anónima para capturar el estado actual de las variables
      pokemonCard.addEventListener("click", (function(pokemonImage, shinyImage) {
        return function() {
          axiosPokemon(pokemon.name);

          // Alternar la visibilidad de las imágenes al hacer clic
          if (pokemonImage.style.display === "none") {
            pokemonImage.style.display = "block";
            shinyImage.style.display = "none";
          } else {
            pokemonImage.style.display = "none";
            shinyImage.style.display = "block";
            shinyImage.classList.add("shiny-active");
          }
        };
      })(pokemonImage, shinyImage));

      pokemonListContainer.appendChild(pokemonCard);
    }
  } catch (error) {
    console.log(error);
  }
};
displayRandomPokemonList();
