import Image from 'next/image'
import { Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import HeroCarousel from '../components/client_components/HeroCarousel'
import HomeCarousel from '@/components/client_components/HomeCarousel';
import CacheTrigger from '@/components/client_components/CacheTrigger';

export default function Home() {

  console.log("NEXT_PUBLIC_ENV: ", process.env.NEXT_PUBLIC_ENV)

  return (
    <div className='row mt-4'>
      <div className='col-12'>
          <HomeCarousel />

          <div className="p-3 text-center rounded-3">
            <h1 className="text-body-emphasis">Welcome to Pita Concrete.</h1>
            <p className="col-sm-8 mx-auto fs-6 text-muted">
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

              <div className="row fs-6">
                <div className="col-12">

                  <div className='row mb-2'>
                    <div className='col-12'>
                      At Pita Concrete, customer satisfaction is our top priority. 
                      Our dedicated team works closely with you to understand and fulfill your unique construction needs. 
                      We ensure every project, from initial consultation to final execution, exceeds your expectations, delivering personalized service with unparalleled professionalism.
                    </div>
                  </div>

                  <div className='row mb-2'>
                    <div className='col-12'>
                      Excellence in craftsmanship is our hallmark. 
                      Our skilled professionals utilize advanced techniques and materials to ensure precision in every project. 
                      Whether it is architectural hardscaping or decorative concrete, we are committed to delivering top-tier quality, meeting strict timelines and budget requirements seamlessly.
                    </div>
                  </div>

                  <div className='row mb-2'>
                    <div className='col-12'>
                    Our reputation in the construction industry speaks volumes. 
                    Pita Concrete is renowned for reliability and quality, earning trust and respect from clients who often return for future projects. 
                    Our portfolio demonstrates our diverse capabilities, and our client testimonials reflect our unwavering dedication to excellence and service.
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
      <CacheTrigger />
    </div>
  )
}
