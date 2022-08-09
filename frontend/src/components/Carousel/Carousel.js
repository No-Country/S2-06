import "./Carousel.css"
import React from 'react';
import AliceCarousel from 'react-alice-carousel';


function Carousel(props) {
    const {imgArray, movieArray} = props
    const handleDragStart = (e) => e.preventDefault();


    const items =  []
    movieArray?.map(movie => items.push(<video src={movie.mp4.max} controls poster={movie.thumbnail}></video>))
    imgArray?.map(img => items.push(<img src={img.path_full} onDragStart={handleDragStart}  key={img.id} alt={img.id}/>)) ;
    if (items.length > 15) {items.length=15}

    return (
        <div className="carousel">
        <AliceCarousel mouseTracking items={items} />
        </div>
    );
}

export default Carousel;