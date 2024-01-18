'use client'

import dynamic from 'next/dynamic';
import React from 'react';
import { useState , useEffect} from "react";
import Carousel from 'react-bootstrap/Carousel';

// Use dynamic import with ssr set to false
// const BootstrapCarousel = dynamic(() => import('react-bootstrap/Carousel'), {
//   ssr: false
// });

export default function HeroCarousel() {

  const [index, setIndex] = useState(0);

  useEffect(() => {
    // signUpWithEmailAndPassword()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <>
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </>
  )
}
