import "./ListLibraryCards.css";
import Cards from "../Card";
import icon from "../../assets/icons/tagsUnder.svg";
import {ReactComponent as SearchIcon} from "../../assets/search.svg"
import {ReactComponent as Cross} from "../../assets/icons/cross.svg"
import { useRef, useState } from "react";

function ListLibraryCards(props) {
  const [searchedGames, setSearchedGames] = useState("noSearch")
  const { games } = props;
  const searchRef = useRef();
  console.log(searchedGames)
  function handleSearchClick(){
    console.log(searchRef.current.value)
    console.log(searchedGames)
    console.log(!games[0].gameName.includes(searchRef.current.value))
    games.map((game)=>{
     
      if(!searchRef.current.value) {setSearchedGames("noSearch")}
      else
   {   let arr = []
      if(!game.gameName.includes(searchRef.current.value)){
      arr.push(game)}
      setSearchedGames(arr)}
    }
    )
  }
  if(searchedGames === "noSearch" && games === []){return <div className="NoGames">You have no games! Go buy some!!</div>}
  return (
    <>
      <div className="container-library">
        {/* <div className="container-sort">
          <h3 className="sort">Sort By: Alphabetical</h3>
          <img className="" src={icon} alt="icon" />
        </div> */}
        <div className="Library--search">
          <SearchIcon className="SearchBar--SearchIcon" onClick={()=>handleSearchClick()}/>
          <input className="Library--search__input" placeholder="Search a game" id="search" name="search" ref={searchRef} 
          onKeyPress={(e) => {if (e.key === "Enter") {handleSearchClick()}}}/>
          <Cross className="Private--Cross" onClick={()=>{setSearchedGames("noSearch")}}/>
        </div>

        <div className="library">
          {(searchedGames==="noSearch")?games?.map((item) => (
            <Cards
              steam={item.gameID}
              name={item.gameName}
              key={item.gameID}
              steamAppID={item.gameID}
              isOwned={true}
              inLibrary={true}
            />
          )):
          (searchedGames.length===0)?<div className="NoGames">No game matches your search. Go buy some more!!</div>:
          searchedGames?.map((item) => (
            <Cards
              steam={item.gameID}
              name={item.gameName}
              key={item.gameID}
              steamAppID={item.gameID}
              isOwned={true}
              inLibrary={true}
            />
          ))
          }
        </div>
      </div>
    </>
  );
}

export default ListLibraryCards;
