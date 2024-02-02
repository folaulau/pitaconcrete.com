import Image from 'next/image'

export default function AboutComp() {

  return (
    <>

        <section className="about">
            <div data-aos="fade-up">

                <div className="row position-relative">

                    <div className="col-12 col-sm-3">
                        <div className="row">
                            <div className="col-12">
                                <Image
                                src='/pita_profile.jpg'
                                alt="Picture of the author"
                                className="img-fluid rounded border"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-9">
                        <div className="card">
                            <div className="card-body">
                                <h5>My Story</h5>
                                <p className="card-text">

                                    <div className="row mt-2">
                                        <div className="col-12">
                                            My name is Peter Fotu. I have over 18 years of experience in concrete with a focus on providing top quality service.
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-12">
                                            As a dedicated contractor, there&apos;s a unique joy I experience in witnessing our clients&apos; reactions during the final reveal of their project. My top priority is ensuring that the final result not only meets but exceeds our initial agreement, guaranteeing complete satisfaction and happiness for our clients.
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-12">
                                            The transformation of a space from start to finish is always remarkable, but what truly motivates me is seeing our clients&apos; faces light up in approval of the work we&apos;ve done for them. This is the true measure of success for me and my team.
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-12">
                                            Our expertise spans a wide range of services, including comprehensive landscaping designs, efficient sprinkler system installations, meticulous tree trimming and removal, as well as skilled demolition, precise framing, and seamless drywall services. We take pride in our versatility and are eager to assist you in bringing your vision to life.
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-12">
                                            I take great pride in the quality of our work, and it&apos;s my personal mission to ensure that you feel confident and reassured in choosing us for your project needs. Let&apos;s work together to create something truly remarkable.
                                        </div>
                                    </div>

                                    <h5 className="mt-4">My Credentials</h5>
                                
                                    <div className="row mt-1">
                                        <div className="col-12">
                                            License Number: 13609914-5501, verify <a href="https://secure.utah.gov/llv/search/index.html#" target="_blank">here</a>
                                        </div>
                                    </div>
                                    <div className="row mt-1">
                                        <div className="col-12">
                                            Insured by <a href="https://www.auto-owners.com/" target="_blank">Insurance Company</a> 
                                        </div>
                                    </div>
                        
                                </p>
                    
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>

    </>
  )
}
