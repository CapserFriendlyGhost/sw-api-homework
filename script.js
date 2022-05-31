window.onload = getApi;
const BASE_URL = "https://swapi.dev/api/";
let collectionData = null;

//CLASSES

class People {
  constructor(name, height, mass, birth_year, gender) {
    this.name = name;
    this.height = height;
    this.mass = mass;
    this.birth_year = birth_year;
    this.gender = gender;
  }
}
class Planets {
  constructor(name, climate, gravity, terrain, population) {
    this.name = name;
    this.climate = climate;
    this.gravity = gravity;
    this.terrain = terrain;
    this.population = population;
  }
}
class Films {
  constructor(title, director, producer, release_date, episode_id) {
    this.title = title;
    this.director = director;
    this.producer = producer;
    this.release_date = release_date;
    this.episode_id = episode_id;
  }
}
class Species {
  constructor(name, classification, language, eye_colors, skin_colors) {
    this.name = name;
    this.classification = classification;
    this.language = language;
    this.eye_colors = eye_colors;
    this.skin_colors = skin_colors;
  }
}
class Vehicles {
  constructor(
    name,
    model,
    max_atmosphering_speed,
    cost_in_credits,
    passengers
  ) {
    this.name = name;
    this.model = model;
    this.max_atmosphering_speed = max_atmosphering_speed;
    this.cost_in_credits = cost_in_credits;
    this.passengers = passengers;
  }
}
class Starships {
  constructor(
    name,
    model,
    max_atmosphering_speed,
    cost_in_credits,
    passengers
  ) {
    this.name = name;
    this.model = model;
    this.max_atmosphering_speed = max_atmosphering_speed;
    this.cost_in_credits = cost_in_credits;
    this.passengers = passengers;
  }
}

function createTable(table, arrOfKeys, collection) {
  const tableHead = table.querySelector("thead");
  const tableBody = table.querySelector("tbody");
  tableHead.innerHTML = "<tr></tr>";
  tableBody.innerHTML = "";

  for (headerText of arrOfKeys) {
    const headerElement = document.createElement("th");
    headerElement.textContent = headerText;
    tableHead.querySelector("tr").appendChild(headerElement);
  }
  for (row of collection) {
    const rowElement = document.createElement("tr");
    for (cellText in row) {
      const cellElement = document.createElement("td");
      cellElement.textContent = row[cellText];
      rowElement.appendChild(cellElement);
    }

    tableBody.appendChild(rowElement);
  }
}

// COLLECTION API FETCH WITH RETURNED CLASS

async function fetchCollection(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  collectionData = await response.json();
  // console.log(collectionData);
  console.log(collectionData);
}

// FULL API FETCH
async function getApi() {
  const response = await fetch(BASE_URL);
  const data = await response.json();

  const allButtons = document.getElementById("buttons");
  const button = document.createElement("button");

  //FETCHING COLLECION
  const fetchClick = async (event) => {
    const table = document.querySelector("table");
    const endpoint = event.target.innerHTML.toLowerCase();
    await fetchCollection(endpoint);

    function getKeys(mappedCollection) {
      return Object.keys(mappedCollection[0]);
    }

    if (endpoint === "people") {
      //PEOPLE
      const collectionMapPeople = collectionData.results.map(
        ({ name, height, mass, birth_year, gender }) => {
          return new People(name, height, mass, birth_year, gender);
        }
      );

      console.log(collectionMapPeople);

      createTable(table, getKeys(collectionMapPeople), collectionMapPeople);
    } else if (endpoint === "planets") {
      //PLANETS
      const collectionMapPlanets = collectionData.results.map(
        ({ name, climate, gravity, terrain, population }) => {
          return new Planets(name, climate, gravity, terrain, population);
        }
      );
      createTable(table, getKeys(collectionMapPlanets), collectionMapPlanets);
      console.log(collectionMapPlanets);
    } else if (endpoint === "films") {
      //FILMS
      const collectionMapFilms = collectionData.results.map(
        ({ title, director, producer, release_date, episode_id }) => {
          return new Films(title, director, producer, release_date, episode_id);
        }
      );
      console.log(collectionMapFilms);
      createTable(table, getKeys(collectionMapFilms), collectionMapFilms);
    } else if (endpoint === "species") {
      //SPECIES
      const collectionMapSpecies = collectionData.results.map(
        ({ name, classification, language, eye_colors, skin_colors }) => {
          return new Species(
            name,
            classification,
            language,
            eye_colors,
            skin_colors
          );
        }
      );
      console.log(collectionMapSpecies);
      createTable(table, getKeys(collectionMapSpecies), collectionMapSpecies);
    } else if (endpoint === "vehicles") {
      //VEHICLES
      const collectionMapVehicles = collectionData.results.map(
        ({
          name,
          model,
          max_atmosphering_speed,
          cost_in_credits,
          passengers,
        }) => {
          return new Vehicles(
            name,
            model,
            max_atmosphering_speed,
            cost_in_credits,
            passengers
          );
        }
      );
      console.log(collectionMapVehicles);
      createTable(table, getKeys(collectionMapVehicles), collectionMapVehicles);
    } else if (endpoint === "starships") {
      //STARSHIPS
      const collectionMapStarships = collectionData.results.map(
        ({
          name,
          model,
          max_atmosphering_speed,
          cost_in_credits,
          passengers,
        }) => {
          return new Starships(
            name,
            model,
            max_atmosphering_speed,
            cost_in_credits,
            passengers
          );
        }
      );
      console.log(collectionMapStarships);
      createTable(
        table,
        getKeys(collectionMapStarships),
        collectionMapStarships
      );
    }

    console.log("clicked");
  };

  // CREATING BUTTONS BY KEYS OF API AND FETCH COLLECTION
  const collectionName = Object.keys(data);

  const collectionNameCapital = collectionName.map((name) => {
    const capitalFirstLetter = name.charAt(0).toUpperCase() + name.slice(1);
    const button = document.createElement("button");
    button.innerHTML = capitalFirstLetter;
    allButtons.onclick = fetchClick;
    allButtons.appendChild(button);
  });
}
