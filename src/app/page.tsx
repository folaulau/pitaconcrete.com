import Image from 'next/image'
import { Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import HeroCarousel from '../components/client_components/HeroCarousel'
import HomeCarousel from '@/components/client_components/HomeCarousel';
import AboutComp from '@/components/server_components/AboutUs';

export default function Home() {

  console.log("NEXT_PUBLIC_ENV: ", process.env.NEXT_PUBLIC_ENV)

  

  return (
    <div className='row'>
      <div className='col-12'>
          <HomeCarousel />

          <div className="p-3 text-center rounded-3">
            <h1 className="text-body-emphasis">Welcome to Pita Concrete.</h1>
            <p className="col-sm-8 mx-auto fs-4 text-muted">
            Set in Concrete, Steadfast in Service
            </p>
          </div>

          {/* why choose us? */}
          <div className='row'>
            <div className='col-12'>

              <div className="row">
                <div className="col-12 text-center">
                    <div className="d-inline-block text-center">
                        <h4>Why Choose Us?</h4>
                        <hr/>
                    </div>
                </div>
              </div>

              <div className="row fs-5">
                <div className="col-12">

                  <div className='row mb-2'>
                    <div className='col-12'>
                      At Pita Concrete, we believe that excellence in concrete craftsmanship speaks volumes. Our portfolio, showcased on this website and evident in our numerous in-person projects, 
                      stands as a testament to our unwavering commitment to quality and meticulous attention to detail. Our team is dedicated to not just meeting, 
                      but exceeding client expectations from the very first interaction to the completion of the project.
                    </div>
                  </div>

                  <div className='row mb-2'>
                    <div className='col-12'>
                    Understanding that knowledge is key, we dedicate substantial time to educating our clients about our processes even before a project begins. 
                    This approach ensures that our clients are well-informed and comfortable throughout the entire journey with us.
                    </div>
                  </div>

                  <div className='row mb-2'>
                    <div className='col-12'>
                    The heart of our operations lies in our skilled crews.  
                    Their expertise and dedication are the cornerstones of our ability to consistently deliver superior results. 
                    By maintaining all aspects of our work, we ensure an unparalleled level of quality control and a seamless process for our clients.
                    </div>
                  </div>

                  <div className='row mb-2'>
                    <div className='col-12'>
                    Choose Pita Concrete, where exceptional craftsmanship meets unparalleled client service in the realm of concrete solutions.
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>
    </div>
  )
}
