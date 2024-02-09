
import ContactUsForm from '@/components/client_components/ContactUsForm'
import CacheTrigger from '@/components/client_components/CacheTrigger'
import OperatingAreas from '@/components/client_components/OperatingAreas'

export default function Contact() {

  const sendMessage = () => {

  }

  return (
    <>
      <section>
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-12">
                <div className="row">
                  <div className="col-12 text-center">
                    <div className="d-inline-block text-center">
                        <h4>Contact Us</h4>
                        <hr/>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="row">
                  <div className="col-12 text-center">
                    Phone: <a href="tel:7609917359">(760) 991-7359</a>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 text-center">
                    Email: <a href="mailto:pitaconcrete@gmail.com">pitaconcrete@gmail.com</a>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 text-center">
                    Hours of Operation
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 text-center">
                    Monday – Friday   :   8 AM – 5 PM
                  </div>
                </div>
              </div>
            </div>


            <ContactUsForm />

            <div className="row">
              <div className="col-12">
                <OperatingAreas />
              </div>
            </div>

          </div>
        </div>
      </section>
      <CacheTrigger />
    </>
  )
}
