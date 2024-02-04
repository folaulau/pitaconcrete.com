
import ContactUsForm from '@/components/client_components/ContactUsForm'

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
                    PHONE: (760) 991-7359 | EMAIL: pitaconcrete@gmail.com
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 text-center">
                    HOURS OF OPERATION:   Monday – Friday   :   9 AM – 5 PM
                  </div>
                </div>
              </div>
            </div>


            <ContactUsForm />

          </div>
        </div>
      </section>
    </>
  )
}
