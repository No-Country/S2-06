import "./SearchBar.css"
import {ReactComponent as SearchIcon} from "../../assets/search.svg"
import { useRef } from "react"
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const searchRef = useRef();
  const navigate = useNavigate();

  function handleSearchClick() {
    navigate(`/games?search=${searchRef.current.value}`);
  }

/*   function handleAllGamesClick () {
         `https://www.cheapshark.com/api/1.0/deals?storeID=1&sortBy=title`
  } */



    return (
        <div className="SearchBar--background">
            <div className="SearchBar">
                <div className="SearchBar--input--container">
                    <SearchIcon className="SearchBar--SearchIcon" onClick={()=>handleSearchClick()}/>
                    <input placeholder="Search a game" id="search" name="search" ref={searchRef} 
                    onKeyPress={(e) => {if (e.key === "Enter") {handleSearchClick()}}}/>
                </div>
                <h3 className="SearchBar--button">All Games</h3>
                <h3 className="SearchBar--button">News</h3>
                <h3 className="SearchBar--button">Shop</h3>
                <h3 className="SearchBar--button">Categories</h3>
            </div>
        </div>

      );
}

export default SearchBar;