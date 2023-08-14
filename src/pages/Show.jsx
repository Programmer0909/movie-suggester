import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getShowById } from "../api/tvmaze";
import ShowMainData from "../components/shows/ShowMainData";
import Details from "../components/shows/Details";
import Seasons from "../components/shows/Seasons";
import Cast from "../components/shows/Cast";
import { TextCenter } from "../components/common/TextCenter";
import styled from "styled-components";

const Show = () => {
  const { showId } = useParams();
  const [showData, setShowData] = useState(null);
  const [showError, setShowError] = useState(null);

  useEffect(() => {
    async function fetchdata() {
      try {
        const data = await getShowById(showId);
        setShowData(data);
      } catch (error) {
        setShowError(error);
      }
    }
    fetchdata();
  }, [showId]);

  if (showData) {
    return (
      <ShowPageWrapper>
        <BackHomeWrapper>
          <Link to={"/"}>&#8249;</Link>
        </BackHomeWrapper>
        <ShowMainData
          image={showData.image}
          name={showData.name}
          rating={showData.rating}
          summary={showData.summary}
          genres={showData.genres}
        />
        <InfoBlock>
          <Details
            status={showData.status}
            premiered={showData.premiered}
            network={showData.network}
          />
        </InfoBlock>
        <InfoBlock>
          <h2>Seasons</h2>
          <Seasons seasons={showData._embedded.seasons} />
        </InfoBlock>

        <InfoBlock>
          <h2>Cast</h2>
          <Cast cast={showData._embedded.cast} />
        </InfoBlock>
      </ShowPageWrapper>
    );
  }
  if (showError) {
    return <TextCenter>Error Occured : {showError}</TextCenter>;
  }

  return (
    <TextCenter>
      <p>Data Loading...</p>
    </TextCenter>
  );
};

export default Show;

const BackHomeWrapper = styled.div`
  
  margin-bottom: 30px;
  text-align: left;
  a {
    padding: 10px;
    padding-right : 15px;
    color: ${({ theme }) => theme.mainColors.purple};
    background-color: #FB5F5F;
  color: white;
  border-radius : 40%;
    text-decoration: ;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ShowPageWrapper = styled.div`
  margin: auto;
  @media only screen and (min-width: 768px) {
    max-width: 700px;
  }
  @media only screen and (min-width: 992px) {
    max-width: 900px;
  }
`;

const InfoBlock = styled.div`
  margin-bottom: 40px;
  h2 {
    margin: 0;
    margin-bottom: 30px;
    font-size: 22px;
  }
`;
