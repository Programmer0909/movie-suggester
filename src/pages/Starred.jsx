import React, { useState, useEffect } from "react";
import { getShowsByIds } from "../api/tvmaze";
import ShowGrid from "../components/shows/ShowGrid";
import { TextCenter } from "../components/common/TextCenter";
import { useStarredShows } from "../lib/useStarredShows";
const Starred = () => {
  const [starredShowIds] = useStarredShows();
  const [starredShows, setStarredShows] = useState([]);
  const [starredShowsError, setStarredShowsError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getShowsByIds(starredShowIds)
      .then((result) => {
        const shows = result.map((show) => ({ show }));
        setStarredShows(shows);
        setIsLoading(false);
      })
      .catch((error) => {
        setStarredShowsError(error);
        setIsLoading(false);
      });
  }, [starredShowIds]);

  if (isLoading) {
    return <TextCenter>Shows are loading...</TextCenter>;
  }

  if (starredShows.length === 0) {
    return <TextCenter>No shows were starred</TextCenter>;
  }

  if (starredShowsError) {
    return (
      <TextCenter>Error occurred: {starredShowsError.message}</TextCenter>
    );
  }

  return <ShowGrid shows={starredShows} />;
};

export default Starred;
