window.onload = getApi;
const BASE_URL = "https://swapi.dev/api/";
let collectionData = null;
// let fullCollection = null;

//CLASSES

class People {
  constructor(Name, Height, Mass, Birth_Year, Gender, Created) {
    this.Name = Name;
    this.Height = Height;
    this.Mass = Mass;
    this.Birth_Year = Birth_Year;
    this.Gender = Gender;
    this.Created = Created.slice(0, 10);
    // this.Delete = Delete;
  }
}
class Planets {
  constructor(Name, Climate, Gravity, Terrain, Population, Created) {
    this.Name = Name;
    this.Climate = Climate;
    this.Gravity = Gravity;
    this.Terrain = Terrain;
    this.Population = Population;
    this.Created = Created.slice(0, 10);
  }
}
class Films {
  constructor(Title, Director, Producer, Release_Date, Episode_Id, Created) {
    this.Title = Title;
    this.Director = Director;
    this.Producer = Producer;
    this.Release_Date = Release_Date;
    this.Episode_Id = Episode_Id;
    this.Created = Created.slice(0, 10);
  }
}
class Species {
  constructor(
    Name,
    Classification,
    Language,
    Eye_Colors,
    Skin_Colors,
    Created
  ) {
    this.Name = Name;
    this.Classification = Classification;
    this.Language = Language;
    this.Eye_Colors = Eye_Colors;
    this.Skin_Colors = Skin_Colors;
    this.Created = Created.slice(0, 10);
  }
}
class Vehicles {
  constructor(
    Name,
    Model,
    Max_Atmosphering_Speed,
    Cost_In_Credits,
    Passengers,
    Created
  ) {
    this.Name = Name;
    this.Model = Model;
    this.Max_Atmosphering_Speed = Max_Atmosphering_Speed;
    this.Cost_In_Credits = Cost_In_Credits;
    this.Passengers = Passengers;
    this.Created = Created.slice(0, 10);
  }
}
class Starships {
  constructor(
    Name,
    Model,
    Max_Atmosphering_Speed,
    Cost_In_Credits,
    Passengers,
    Created
  ) {
    this.Name = Name;
    this.Model = Model;
    this.Max_Atmosphering_Speed = Max_Atmosphering_Speed;
    this.Cost_In_Credits = Cost_In_Credits;
    this.Passengers = Passengers;
    this.Created = Created.slice(0, 10);
  }
}

// CREATE TABLE
async function createTable(table, arrOfKeys, collection) {
  const tableHead = table.querySelector("thead");
  const tableBody = table.querySelector("tbody");
  const resultBar = document.getElementById("result-bar");
  tableHead.innerHTML = "<tr></tr>";
  tableBody.innerHTML = "";
  const selectNumberOfPages = document.getElementById("select-number-of-pages");
  // let valueOfSelectedNumberOfPages = selectNumberOfPages.value;
  // console.log(valueOfSelectedNumberOfPages);

  // function pagination(valueOfSelectedNumberOfPages) {
  //   if (valueOfSelectedNumberOfPages == 5) {
  //   }
  // }

  function removeClik() {
    const result = confirm("Are you sure?");
    if (result) {
      this.closest("tr").remove();
    }
  }

  const ID = document.createElement("th");
  ID.textContent = "ID";
  tableHead.querySelector("tr").appendChild(ID);

  for (headerText of arrOfKeys) {
    const headerElement = document.createElement("th");
    headerElement.textContent = headerText;
    tableHead.querySelector("tr").appendChild(headerElement);
  }

  const actions = document.createElement("th");
  actions.textContent = "Actions";
  tableHead.querySelector("tr").appendChild(actions);

  for (row of collection) {
    const rowElement = document.createElement("tr");
    const IDcell = document.createElement("td");
    const allRows = document.querySelectorAll("tr");
    IDcell.textContent = allRows.length;
    rowElement.appendChild(IDcell);

    for (cellText in row) {
      const cellElement = document.createElement("td");
      cellElement.textContent = row[cellText];
      rowElement.appendChild(cellElement);
    }

    const removeDetailsDiv = document.createElement("div");
    rowElement.appendChild(removeDetailsDiv);
    const dumpsterIcon = document.createElement("i");
    dumpsterIcon.setAttribute("class", "fa-solid fa-trash-can");
    removeDetailsDiv.appendChild(dumpsterIcon);
    dumpsterIcon.onclick = removeClik;
    const detailsIcon = document.createElement("i");
    detailsIcon.setAttribute("class", "fa-solid fa-plus");
    // detailsButton.textContent = "Details";
    removeDetailsDiv.appendChild(detailsIcon);
    tableBody.appendChild(rowElement);
  }

  resultBar.innerHTML = `Result: ${collection.length}`;
}

// COLLECTION API FETCH WITH RETURNED CLASS
let fullCollection = [];
async function fetchCollection(endpoint) {
  // let fullCollection = [];
  const response = await fetch(`${BASE_URL}${endpoint}`);
  collectionData = await response.json();
  fullCollection.push(...collectionData.results);

  async function nextPageOfCollection(nextPage) {
    if (collectionData.next === null) return;
    const response = await fetch(collectionData.next);
    collectionData = await response.json();
    fullCollection.push(...collectionData.results);
    await nextPageOfCollection(collectionData.next);
  }
  nextPageOfCollection(collectionData.next);

  return fullCollection;
  // console.log(fullCollection);
  // console.log(collectionData);
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
    const allFetchResults = await fetchCollection(endpoint);

    console.log(allFetchResults);
    console.log(fullCollection);
    console.log(fullCollection[24]);
    // console.log(collectionData.results);
    // console.log(collectionData);

    function getKeys(mappedCollection) {
      return Object.keys(mappedCollection[0]);
    }

    if (endpoint === "people") {
      //PEOPLE
      const collectionMapPeople = fullCollection.map(
        ({ name, height, mass, birth_year, gender, created }) => {
          return new People(name, height, mass, birth_year, gender, created);
        }
      );

      console.log(collectionMapPeople[22]);

      await createTable(
        table,
        getKeys(collectionMapPeople),
        collectionMapPeople
      );
    } else if (endpoint === "planets") {
      //PLANETS
      const collectionMapPlanets = collectionData.results.map(
        ({ name, climate, gravity, terrain, population, created }) => {
          return new Planets(
            name,
            climate,
            gravity,
            terrain,
            population,
            created
          );
        }
      );
      await createTable(
        table,
        getKeys(collectionMapPlanets),
        collectionMapPlanets
      );
      console.log(collectionMapPlanets);
    } else if (endpoint === "films") {
      //FILMS
      const collectionMapFilms = collectionData.results.map(
        ({ title, director, producer, release_date, episode_id, created }) => {
          return new Films(
            title,
            director,
            producer,
            release_date,
            episode_id,
            created
          );
        }
      );
      console.log(collectionMapFilms);
      await createTable(table, getKeys(collectionMapFilms), collectionMapFilms);
    } else if (endpoint === "species") {
      //SPECIES
      const collectionMapSpecies = collectionData.results.map(
        ({
          name,
          classification,
          language,
          eye_colors,
          skin_colors,
          created,
        }) => {
          return new Species(
            name,
            classification,
            language,
            eye_colors,
            skin_colors,
            created
          );
        }
      );
      console.log(collectionMapSpecies);
      await createTable(
        table,
        getKeys(collectionMapSpecies),
        collectionMapSpecies
      );
    } else if (endpoint === "vehicles") {
      //VEHICLES
      const collectionMapVehicles = collectionData.results.map(
        ({
          name,
          model,
          max_atmosphering_speed,
          cost_in_credits,
          passengers,
          created,
        }) => {
          return new Vehicles(
            name,
            model,
            max_atmosphering_speed,
            cost_in_credits,
            passengers,
            created
          );
        }
      );
      console.log(collectionMapVehicles);
      await createTable(
        table,
        getKeys(collectionMapVehicles),
        collectionMapVehicles
      );
    } else if (endpoint === "starships") {
      //STARSHIPS
      const collectionMapStarships = collectionData.results.map(
        ({
          name,
          model,
          max_atmosphering_speed,
          cost_in_credits,
          passengers,
          created,
        }) => {
          return new Starships(
            name,
            model,
            max_atmosphering_speed,
            cost_in_credits,
            passengers,
            created
          );
        }
      );
      console.log(collectionMapStarships);
      await createTable(
        table,
        getKeys(collectionMapStarships),
        collectionMapStarships
      );
    }
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

  // RESULTS AND SEARCH
  const resultSearch = document.getElementById("result-search");
  const resultBar = document.createElement("span");
  resultBar.setAttribute("id", "result-bar");
  resultBar.innerHTML = "Result:";
  const searchInput = document.createElement("input");
  resultSearch.appendChild(resultBar);
  resultSearch.appendChild(searchInput);

  // PAGINATION
  const pagination = document.getElementById("pagination");
  const prevButton = document.createElement("button");
  prevButton.innerHTML = "PREV";
  const nextButton = document.createElement("button");
  nextButton.innerHTML = "NEXT";
  const numbersOfPages = document.createElement("span");
  numbersOfPages.innerHTML = "1 of 10";
  const selectPages = document.createElement("select");
  selectPages.setAttribute("id", "select-number-of-pages");
  const pagesOption5 = document.createElement("option");
  pagesOption5.innerHTML = "5";
  const pagesOption10 = document.createElement("option");
  pagesOption10.innerHTML = "10";
  const pagesOption15 = document.createElement("option");
  pagesOption15.innerHTML = "15";
  selectPages.appendChild(pagesOption5);
  selectPages.appendChild(pagesOption10);
  selectPages.appendChild(pagesOption15);

  pagination.appendChild(prevButton);
  pagination.appendChild(nextButton);
  pagination.appendChild(numbersOfPages);
  pagination.appendChild(selectPages);
}
