import Image from 'next/image'
import profilePic from '../../profile1.jpg'

export default function AboutComp() {

  return (
    <>

        <section className="about">
            <div data-aos="fade-up">

                <div className="row position-relative">

                <div className="col-sm-3">
                    <div className="row">
                        <div className="col-12">
                            <img
                            src='/pita_profile.jpg'
                            alt="Picture of the author"
                            className="img-fluid"
                            />
                        </div>
                    </div>
                </div>
                <div className="col-sm-9">
                    <div className="container mt-5">
                        <div className="card">
                            <div className="card-body">
                            <h2 className="card-title">My Story</h2>
                            <p className="card-text">

                                <div className="row mt-2">
                                    <div className="col-12">
                                        My name is Peter Fotu. I have over 18 years of experience in concrete with a focus on providing top quality service.
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-12">
                                        As a dedicated contractor, there's a unique joy I experience in witnessing our clients' reactions during the final reveal of their project. My top priority is ensuring that the final result not only meets but exceeds our initial agreement, guaranteeing complete satisfaction and happiness for our clients.
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-12">
                                        The transformation of a space from start to finish is always remarkable, but what truly motivates me is seeing our clients' faces light up in approval of the work we've done for them. This is the true measure of success for me and my team.
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-12">
                                        Our expertise spans a wide range of services, including comprehensive landscaping designs, efficient sprinkler system installations, meticulous tree trimming and removal, as well as skilled demolition, precise framing, and seamless drywall services. We take pride in our versatility and are eager to assist you in bringing your vision to life.
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-12">
                                        I take great pride in the quality of our work, and it's my personal mission to ensure that you feel confident and reassured in choosing us for your project needs. Let's work together to create something truly remarkable.
                                    </div>
                                </div>
                    
                            </p>
                            <h3 className="mt-4">My Credentials</h3>
                            <p className="card-text">
                                License Number: 13609914-5501
                                <a href="#" className="btn btn-primary btn-sm">verify here</a>
                            </p>
                            <p className="card-text">
                                Insured by <a href="#" className="link-primary">Insurance Company</a>
                            </p>
                            </div>
                        </div>
                    </div>

                </div>

                </div>

            </div>
        </section>

    </>
  )
}
