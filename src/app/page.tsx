import Image from 'next/image'
import { Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import HeroCarousel from '../components/client_components/HeroCarousel'

import AboutComp from '@/components/server_components/AboutUs';

export default function Home() {

  console.log("NEXT_PUBLIC_ENV: ", process.env.NEXT_PUBLIC_ENV)

  return (
    <>

      <div className="p-5 text-center bg-body-tertiary rounded-3">
        <h1 className="text-body-emphasis">Welcome to Pita Concrete.</h1>
        <p className="col-lg-8 mx-auto fs-5 text-muted">
          We are here for your construction needs!
        </p>
      </div>

      <AboutComp />

    </>
  )
}
