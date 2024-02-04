'use client'

import { useState , useEffect} from "react";

import './ContactUsForm.module.css'


export default function ContactUsForm() {

  const [errorMsg, setErrorMsg] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  const formFields = {
    name: "",
    phone: "",
    email: "",
    hearAboutUs: "",
    message: ""
  }


  const [contactUsMessage, setContactUsMessage] = useState(formFields);

  useEffect(() => {

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e) => {
    setContactUsMessage(contactUsMessage => ({
      ...contactUsMessage,
      [e.target.name]: e.target.value,
    }))
  }

  const sendMessage = () => {
    console.log('sendMessage...', contactUsMessage)

    setAlertMsg("Message sent! We will contact you shortly.")

    setContactUsMessage(formFields)
  }


  return (
    <>
       <div className="row mt-4">
        <div className="col-12">

          <div className='row'>
            <div className="col-12 col-md-12">
              {
                errorMsg && 
                <div className="alert alert-danger">
                  {errorMsg}
                </div>
              }
            </div>
          </div>
          <div className='row'>
            <div className="col-12 col-md-12">
              {
                alertMsg && 
                <div className="alert alert-success">
                  {alertMsg}
                </div>
              }
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-sm-6">
              <label className="form-label">Your Name *</label>
              <input 
                name="name"
                value={contactUsMessage.name}
                onChange={handleInputChange}
                type="text" 
                className="form-control" />


            </div>
            <div className="col-12 col-sm-6">
              <label 
                name="phone"
                value={contactUsMessage.phone}
                onChange={handleInputChange}
                className="form-label">Phone *</label>
              <input type="text" className="form-control" />


            </div>
          </div>

          <div className="row">
            <div className="col-12 col-sm-6">
              <label 
                name="email"
                value={contactUsMessage.email}
                onChange={handleInputChange}
                className="form-label">Email *</label>
              <input type="text" className="form-control" />


            </div>
            <div className="col-12 col-sm-6">
              <label className="form-label">How did you hear about us?</label>
              <input 
                name="hearAboutUs"
                value={contactUsMessage.hearAboutUs}
                onChange={handleInputChange}
              type="text" className="form-control" />


            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <label className="form-label">Message *</label>

              <textarea 
                name="message"
                value={contactUsMessage.message}
                onChange={handleInputChange}
              rows={7}
              className="form-control"></textarea>

            </div>
          </div>

          <div className="row mt-3">
            <div className="col-12">

            <button 
              type="button" 
              onClick={()=>sendMessage()}
              className="btn btn-outline-primary">
              
              Send

            </button>

            </div>
          </div>

        </div>
      </div>
    </>
  )
}
