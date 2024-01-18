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
                            
                            src='https://static.dc.com/sites/default/files/imce/2022/09-SEP/Batman%20Day%20Logo_6316c6ae307851.09653883.jpg'
                            alt="Picture of the author"
                            className="img-fluid"
                            // width={500} automatically provided
                            // height={500} automatically provided
                            // blurDataURL="data:..." automatically provided
                            // placeholder="blur" // Optional blur-up while loading
                            ></img>
                            {/* <img className="img-fluid" src="/assets/img/dad-profile.jpeg" alt="profile-image" /> */}
                        </div>
                    </div>
                </div>
                <div className="col-sm-9">
                    <div className="our-story">
                    <h3>My Story</h3>
                    <p>My name is Peter Fotu. I have been in the construction industry for more than 18 years. 
                        I am passionate about helping people and take pride in my work. I have worked with many clients and completed many projects. I value quality over speed.
                    </p>
                    </div>
                    <div className="our-story">
                    <h3>My Credentials</h3>
                    <p>
                        License Number: 13609914-5501, verify <a href="https://secure.utah.gov/llv/search/index.html#" target="_blank">here</a>
                    </p>
                    <p>
                        Insured by <a href="https://www.auto-owners.com/" target="_blank">Insurance Company</a> 
                    </p>
                    </div>
                </div>

                </div>

            </div>
        </section>

    </>
  )
}
