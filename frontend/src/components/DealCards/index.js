import { useEffect, useState } from "react";
import axios from "axios";
import Cards from "../Card";
import "./DealCards.css";

const DealsCard = () => {
  const [gameDeals, setGameDeals] = useState([]);
  const [page, setPage] = useState(0);

  const nextPageHandler = () => {
    setPage((prevState) => prevState + 1);
    console.log(page);
  };

  const prevPageHandler = () => {
    if (page >= 1) {
      setPage((prevState) => prevState - 1);
    }

    console.log(page);
  };
  useEffect(() => {
    const consultarApi = async () => {
      const url = `https://www.cheapshark.com/api/1.0/deals?storeID=1&pageSize=5&pageNumber=${page}&onSale=1`;

      const { data } = await axios(url);

      setGameDeals(data);
      console.log(gameDeals);
    };
    consultarApi();
  }, [page]);

  return (
    <>
      <div className="container-deals">
        <div className="container-arrowHeader">
          <p className="text-DealsCard">Deals</p>
          <div className="container-arrow">
            <button className="arrow" onClick={prevPageHandler}>
              {"<"}
            </button>
            <button className="arrow" onClick={nextPageHandler}>
              {">"}
            </button>
          </div>
        </div>
        <div className="container-dealsCard">
          {gameDeals.map((item) => (
            <Cards
              steam={item.steamAppID}
              name={item.title}
              key={item.id}
              salePrice={item.salePrice}
              normalPrice={item.normalPrice}
              savings={item.savings}
              steamApiId={item.steamApiId}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DealsCard;