import { useEffect, useState } from "react";
import axios from "axios";
import Cards from "../Card";
import "./RatingCard.css";

const DealsCard = () => {
  const [gameRating, setGameRating] = useState([]);
  const [page, setPage] = useState(1);

  const nextPageHandler = () => {
    setPage((prevState) => prevState + 1);
  };

  const prevPageHandler = () => {
    if (page >= 1) {
      setPage((prevState) => prevState - 1);
    }
  };

  useEffect(() => {
    const consultarApi = async () => {
      const url = `https://www.cheapshark.com/api/1.0/deals?storeID=1&pageSize=5&pageNumber=${page}&sortBy=metacritic`;
      setGameRating("loading")
      const { data } = await axios(url);
      setGameRating(data);
    };
    consultarApi();
  }, [page]);


  if(gameRating === "loading"){return( 
    <div className="loadingContainer">
        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>)}
  return (
    <>
      <div className="container-rating">
        <div className="container-arrowHeader">
          <p className="text-RatingCard">Most Popular</p>
          <div className="container-arrow">
            <button className="arrow" onClick={prevPageHandler}>
              {"<"}
            </button>
            <button className="arrow" onClick={nextPageHandler}>
              {">"}
            </button>
          </div>
        </div>

        <div className="container-RatingCard">
          {gameRating.map((item) => (
            <Cards
              steam={item.steamAppID}
              name={item.title}
              key={item.dealID}
              salePrice={item.salePrice}
              normalPrice={item.normalPrice}
              savings={item.savings}
              steamAppID={item.steamAppID}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DealsCard;
