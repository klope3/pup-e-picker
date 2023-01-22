import { useState } from "react";
import { dogPictures } from "../assets/dog-pictures";

const defaultData = {
  image: dogPictures.BlueHeeler,
  isFavorite: false,
};

export const CreateDogForm = ({ addDog }) => {
  const [dog, setDog] = useState(defaultData);

  function changeDogInfo(event) {
    const { name: sender, value } = event.target;
    setDog((prevState) => ({
      ...prevState,
      [sender]: value,
    }));
  }

  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        setDog(defaultData);
        addDog(dog);
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        name="name"
        type="text"
        value={dog.name || ""}
        onChange={changeDogInfo}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name="description"
        id="description"
        cols="80"
        rows="10"
        value={dog.description || ""}
        onChange={changeDogInfo}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        name="image"
        id="picture"
        value={dog.image}
        onChange={changeDogInfo}
      >
        {Object.entries(dogPictures).map(([label, pictureValue], index) => {
          return <option key={index} value={pictureValue}>{label}</option>;
        })}
      </select>
      <input type="submit" value="submit" />
    </form>
  );
};
