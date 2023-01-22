import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import { CreateDogForm } from "./Components/CreateDogForm";
import { Dogs } from "./Components/Dogs";
import { Section } from "./Components/Section";
import "./fonts/RubikBubbles-Regular.ttf";

function App() {
  const [dogs, setDogs] = useState([]);
  const [dogsError, setDogsError] = useState("");
  const [selector, setSelector] = useState("");

  async function fetchData() {
    const requestOptions = {
      method: "GET",
    };

    try {
      const response = await fetch(
        "http://localhost:3000/dogs",
        requestOptions
      );
      if (response.ok) {
        const json = await response.json();
        setDogs(json);
      } else {
        setDogsError(`Error ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function changeSelector(newSelector) {
    setSelector(newSelector === selector ? "" : newSelector);
  }

  function toggleDogFavorited(dogId) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      isFavorite: !dogs.find((dog) => dog.id == dogId).isFavorite,
    });

    const requestOptions = {
      method: "PATCH",
      headers: headers,
      body: raw,
    };

    try {
      fetch(`http://localhost:3000/dogs/${dogId}`, requestOptions).then(() =>
        fetchData()
      );
    } catch (error) {
      console.log(error);
    }
  }

  function deleteDog(dogId) {
    try {
      const requestOptions = {
        method: "DELETE",
      };
      fetch(`http://localhost:3000/dogs/${dogId}`, requestOptions).then(() =>
        fetchData()
      );
    } catch (error) {
      console.log(error);
    }
  }

  function findHighestId() {
    let highestId = 0;
    for (let i = 0; i < dogs.length; i++) {
      if (dogs[i].id > highestId) highestId = dogs[i].id;
    }
    return highestId;
  }

  function addDog(dog) {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      ...dog,
      id: findHighestId() + 1,
    });

    var requestOptions = {
      method: "POST",
      headers: headers,
      body: raw,
    };

    try {
      fetch("http://localhost:3000/dogs", requestOptions).then(() =>
        fetchData()
      );
    } catch (error) {
      console.log(error);
    }
  }

  const favoritedDogs = dogs.filter((dog) => dog.isFavorite);
  const unfavoritedDogs = dogs.filter((dog) => !dog.isFavorite);
  let dogsToDisplay = dogs;
  if (selector === "favorited") dogsToDisplay = favoritedDogs;
  if (selector === "unfavorited") dogsToDisplay = unfavoritedDogs;

  return (
    <div className="App">
      <header>
        <h1>pup-e-picker</h1>
      </header>
      <Section
        label={"Dogs: "}
        selector={selector}
        changeSelector={changeSelector}
        favoritedCount={favoritedDogs.length}
        unfavoritedCount={unfavoritedDogs.length}
      >
        {selector !== "create-dog" && (
          <Dogs
            label={"All Dogs"}
            dogs={dogsToDisplay}
            error={dogsError}
            toggleDogFavorited={toggleDogFavorited}
            deleteDog={deleteDog}
          />
        )}
        {selector === "create-dog" && <CreateDogForm addDog={addDog} />}
      </Section>
    </div>
  );
}

export default App;
