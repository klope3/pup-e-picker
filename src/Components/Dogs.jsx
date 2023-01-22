import { DogCard } from "./DogCard";
export const Dogs = (props) => {
  const { dogs, error, toggleDogFavorited, deleteDog } = props;
  return (
    //  the "<> </>"" are called react fragments, it's like adding all the html inside
    // without adding an actual html element
    <>
      {error && <div>{error}</div>}
      {dogs &&
        dogs.map((dog) => (
          <DogCard
            dog={dog}
            key={dog.id}
            toggleDogFavorited={toggleDogFavorited}
            deleteDog={deleteDog}
          />
        ))}
    </>
  );
};
