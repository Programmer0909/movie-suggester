import React, { useState, useEffect } from "react";
import { searchForShows, searchForActors } from "../api/tvmaze";
import SearchForm from "../components/SearchForm";
import ShowGrid from "../components/shows/ShowGrid";
import ActorsGrid from "../components/actors/ActorsGrid";
import { TextCenter } from "../components/common/TextCenter";

const Home = () => {
  const [filter, setFilter] = useState(null);
  const [apiData, setApiData] = useState([]);
  const [apiDataError, setApiDataError] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(false);

  useEffect(() => {
    if (filter) {
      const fetchData = async () => {
        try {
          let data;
          if (filter.searchOption === "shows") {
            data = await searchForShows(filter.q);
          } else {
            data = await searchForActors(filter.q);
          }
          setApiData(data);
          setApiDataError(null);
          setSearchPerformed(true); // Set the searchPerformed flag when search is successful
        } catch (error) {
          setApiData([]);
          setApiDataError(error);
          setSearchPerformed(true); // Set the searchPerformed flag even if there's an error
        }
      };
      fetchData();
    }
  }, [filter]);

  const onSearch = ({ q, searchOption }) => {
    setFilter({ q, searchOption });
    setSearchPerformed(false); // Reset the searchPerformed flag when a new search is initiated
  };

  const renderApiData = () => {
    if (apiDataError) {
      return <TextCenter>Error occurred: {apiDataError.message}</TextCenter>;
    }

    if (searchPerformed && apiData?.length === 0) {
      return <TextCenter>No results</TextCenter>;
    }

    if (apiData[0]?.show) {
      return <ShowGrid shows={apiData} />;
    } else {
      return <ActorsGrid actors={apiData} />;
    }
  };

  return (
    <div>
      <SearchForm onSearch={onSearch} />

      <div>{renderApiData()}</div>
    </div>
  );
};

export default Home;
