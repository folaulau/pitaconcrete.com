import AboutComp from '@/components/server_components/AboutUs';
import { AllTagList, CommercialTagList, ResidentialTagList} from '@/components/client_components/ProjectTag'
import './page.css'
import CacheTrigger from '@/components/client_components/CacheTrigger';

export default function Services() {

  return (
    <>

      <section className="our-services mb-5">
        <div className="row">
            <div className="col-12">

                <div className="row">
                    <div className="col-12">

                      <div className="row">
                        <div className="col-12 text-center">
                            <div className="d-inline-block text-center">
                                <h4>Our Services</h4>
                                <hr/>
                            </div>
                        </div>
                      </div>

                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-sm-4">

                      <div className="row">
                        <div className="col-12">
                          <h5>What We Can Help You Achieve</h5>
                          <div className="services-word-spacing">
                            Your dream has been waiting to take shape, and as seasoned concrete professionals, we are dedicated to making that happen. We will guide you from the initial design right through to the final installation, ensuring every step resonates with your vision. With us, your idea is not just a plan, it is a journey we embark on together.
                          </div>
                        </div>
                      </div>

                    </div>

                    <div className="col-12 col-sm-8">

                    <div className="row">
                            <div className="col-12">
                              <div className="row">
                                  <div className="col-12 col-sm-4 offset-sm-2">

                                    <h5>Residential</h5>

                                    <ul>
                                        {
                                          ResidentialTagList.map((tag, index)=>(
                                            <li key={tag}>
                                              {tag}
                                            </li>
                                          ))
                                        }

                                    </ul>
                                        
                                  </div>
                                  <div className="col-12 col-sm-4 offset-sm-2">
                                    <h5>Commercial</h5>

                                    <ul>
                                        {
                                          CommercialTagList.map((tag, index)=>(
                                            <li key={tag}>
                                              {tag}
                                            </li>
                                          ))
                                        }

                                    </ul>
                                  </div>
                              </div>
                            </div>
                        </div>
                      
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-12">

                      <div className="row">
                        <div className="col-12 text-center">
                            <div className="d-inline-block text-center">
                                <h4>Customer Reviews</h4>
                                <hr/>
                            </div>
                        </div>
                      </div>

                      

                      <div className="row mt-3">
                          <div className="col-12">
                           
                          </div>
                      </div>
                    </div>
                </div>


            </div>
        </div>
      </section>
      <CacheTrigger />
    </>
  )
}
