import { useStarredShows } from "../../lib/useStarredShows";
import ShowCard from "./ShowCard";
import { FlexGrid } from "../common/FlexGrid";



const ShowGrid = ({ shows }) => {
  const [starredShows, dispatchStarred] = useStarredShows();
  const onStarMeClick = (showId) => {
    const isStarred = starredShows.includes(showId);
    if (isStarred) {
      dispatchStarred({ type: "Unstar", showId });
    } else {
      dispatchStarred({ type: "Star", showId });
    }
  };
  console.log({ starredShows });
  return (
    <FlexGrid>
      {shows.map((data) => (
        <ShowCard
          key={data.show.id}
          id={data.show.id}
          name={data.show.name}
          image={data.show.image ? data.show.image.medium : "/notfound.png"}
          summary={data.show.summary}
          onStarMeClick={onStarMeClick}
          isStarred={starredShows.includes(data.show.id)}
        />
      ))}
    </FlexGrid>
  );
};

export default ShowGrid;

// C:\Users\LENOVO\OneDrive\Desktop\New folder (4)\Box-office-app\box-office\public\notfound.png
