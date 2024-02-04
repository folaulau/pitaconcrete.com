
export default function Contact() {

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

            <div className="row mt-4">
              <div className="col-12">

                <div className="row">
                  <div className="col-12 col-sm-6">
                    <label className="form-label">Your Name</label>
                    <input type="text" className="form-control" />


                  </div>
                  <div className="col-12 col-sm-6">
                    <label className="form-label">Phone</label>
                    <input type="text" className="form-control" />


                  </div>
                </div>

                <div className="row">
                  <div className="col-12 col-sm-6">
                    <label className="form-label">Email</label>
                    <input type="text" className="form-control" />


                  </div>
                  <div className="col-12 col-sm-6">
                    <label className="form-label">How did you hear about us?</label>
                    <input type="text" className="form-control" />


                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <label className="form-label">Message</label>

                    <textarea 
                    rows={7}
                    className="form-control"></textarea>

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
