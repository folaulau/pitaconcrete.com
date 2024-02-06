'use client'

import { useState , useEffect} from "react";
// import carousel1 from "/carousel1.svg";
import './HomeCarousel.css'
import Carousel from 'react-bootstrap/Carousel';

export default function HomeCarousel() {

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    console.log("HomeCarousel")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <>
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        {/* <ExampleCarouselImage text="First slide" /> */}
        
        <div className="row">
          <div className="col-12">
            <img src={"/fire_pit.jpeg"} className="img-fluid home-carousel-img" />
          </div>
        </div>
        <Carousel.Caption>
          <h3 className="home-carousel-desc">Fire Place</h3>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        {/* <ExampleCarouselImage text="Second slide" /> */}
        <div className="row">
          <div className="col-12">
            <img src={"/driveway.png"} className="img-fluid home-carousel-img" />
          </div>
        </div>
        <Carousel.Caption>
          <h3 className="home-carousel-desc">Driveway</h3>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className="row">
          <div className="col-12">
            <img src={"/block_wall1.jpeg"} className="img-fluid home-carousel-img" />
          </div>
        </div>
        <Carousel.Caption>
          <h3 className="home-carousel-desc">Block Wall</h3>
          <p>
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </>
  )
}
