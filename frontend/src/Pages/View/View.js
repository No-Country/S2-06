import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Carousel from "../../components/Carousel/Carousel";
import { useAddGame } from "../../hooks/useAddGame";
import { axiosDB } from "../../services";
import { useSelector } from "react-redux";
import "./View.css"
import Swal from "sweetalert2"

function View() {
    const [gameData, setGameData] = useState();
    const {steamAppId} = useParams();
    const {addGame, alert} = useAddGame();
    const userGames = useSelector((state) => state.gamesArray);
    const navigate = useNavigate()
    const isGame = !!userGames.find(item => item.gameID === Number(steamAppId));
    function succesfulAlert (){
      Swal.fire({
        icon: 'success',
        title: "Game added succesfully",
        showClass: {
          popup: 'swal2-show',
          backdrop: 'swal2-backdrop-show',
          icon: 'swal2-icon-show'
        },
        hideClass:{
          popup: 'swal2-hide',
          backdrop: 'swal2-backdrop-hide',
          icon: 'swal2-icon-hide'
        },

      })
    } 

    function buyGame (){
      addGame(Number(steamAppId), gameData.name);
      succesfulAlert();

    }


    const getGameData = async () => {
        setGameData("loading")
        try {
          const { data } = await axiosDB(
            `/games/${steamAppId}`
          );
          setGameData(data[steamAppId].data)
        } catch (error) {
            console.log(error)
         /*  setAlert({ msg: error.response.data.msg, error: true }); */
        }
      };
      useEffect(() => {
        getGameData()
      }, [])  


      if(gameData === "loading"){return( 
        <div className="loadingContainer">
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>)}
      if(!gameData){return <div> No hay juego</div>}
      const description = gameData.detailed_description.replace(/<br>/gi,"").replace(/<p>.*<\/p>/, "")
    return ( 
        <div className="View">
            <div className="View--titleSection">
              <h1>{gameData.name}</h1>
            </div>
            <div className="View--carouselcontainer">
                <Carousel imgArray={gameData.screenshots} movieArray={gameData.movies}/>
                <div className="absolute">
                  <div className="View--carouselcontainer--column">
                    <div>
                    <h3>Developer: {gameData.developers[0]}</h3>
                    <h3>Publisher: {gameData.publishers[0]}</h3>
                    {gameData.release_date.coming_soon?<h3>Coming soon: {gameData.release_date.date}</h3>:
                    <h3>Release date: {gameData.release_date.date}</h3> }
                      
                      <div className="View--pricecontainer">
                      {gameData.price_overview.discount_percent?
                        <>
                          <p className="View--discount">-{gameData.price_overview.discount_percent}%</p>
                          <p className="View--initialprice">{gameData.price_overview.initial_formatted}</p>
                          <p className="View--finalprice">{gameData.price_overview.final_formatted}</p>
                        </>
                        : <p className="View--finalprice">{gameData.price_overview.final_formatted}</p>
                      }
                      </div>
                    </div>
                    {isGame? <button className="View--buyButton" onClick={()=> navigate("/private/")}>In Library</button>
                      :<button className="View--buyButton" onClick={()=>buyGame()}>Buy</button>}
                  </div>
                </div>
            </div>
            <div className="dangerouslyFather" dangerouslySetInnerHTML={{__html: description}}></div>
        
        </div> 
     );
}

export default View;