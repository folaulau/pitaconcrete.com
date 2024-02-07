'use client'

import { useState , useEffect} from "react";
import ContactApi from '@/api/ContactApi'

import './ContactUsForm.module.css'


export default function ContactUsForm() {

  const [errorMsg, setErrorMsg] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  let formFields = {
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

  const validate = () => {
    let contactUsForm = JSON.parse(JSON.stringify(contactUsMessage))

    let errrorMessages = []

    if(contactUsForm.name === null || contactUsForm.name.trim().length<=0){
      errrorMessages.push("Name is required")
    }

    if(contactUsForm.phone === null || contactUsForm.phone.trim().length<=0){
      errrorMessages.push("Phone is required")
    }else if(!isValidUSPhoneNumber(contactUsForm.phone)){
      errrorMessages.push("Phone is invalid")
    }

    if(contactUsForm.email === null || contactUsForm.email.trim().length<=0){
      errrorMessages.push("Email is required")
    }else if(!isValidEmail(contactUsForm.email)){
      errrorMessages.push("Email is invalid")
    }

    if(contactUsForm.message === null || contactUsForm.message.trim().length<=0){
      errrorMessages.push("Message is required")
    }

    let errrorMessage = ""

    if(errrorMessages.length>0){
      errrorMessages.unshift("These fields are invalid\n")
      errrorMessage = errrorMessages.join("\n")
    }

    return errrorMessage

  }

  const isValidUSPhoneNumber = (phoneNumber) => {
    // This regex matches the following phone number formats:
    // 123-456-7890, (123) 456-7890, 123 456 7890, 123.456.7890, 1234567890, +1 123-456-7890
    const regex = /^(?:\+1\s?)?\(?(?:\d{3})\)?[\s.-]?(?:\d{3})[\s.-]?(?:\d{4})$/;
    return regex.test(phoneNumber);
  }

  const isValidEmail = (email) => {
    // Simple regex for basic email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  const sendMessage = () => {
    console.log('sendMessage...', contactUsMessage)

    let errrorMessage = validate()

    setErrorMsg(errrorMessage)

    if(errrorMessage.length>0){
      return;
    }

    ContactApi.create(contactUsMessage).then((response) => {
      console.log("project add/update entry response: ", response.data);
      setContactUsMessage(formFields)
      setAlertMsg("Message sent! We will contact you shortly.")
      setErrorMsg("")

    }).catch((error) => {
      console.error("Error: ", error);
      setErrorMsg(error.message)
      console.error("Error: ", errorMsg);
    });


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
                  {/* {errorMsg} */}
                  {errorMsg.split("\n").map((message, index) => (
                    <div key={index}>
                      {message}
                      <br/>
                    </div>
                  ))}
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
              <label className="form-label">Phone *</label>
              <input
                name="phone"
                value={contactUsMessage.phone}
                onChange={handleInputChange}
                type="text" 
                className="form-control" />


            </div>
          </div>

          <div className="row">
            <div className="col-12 col-sm-6">
              <label className="form-label">Email *</label>
              <input 
                 name="email"
                 value={contactUsMessage.email}
                 onChange={handleInputChange}
                 type="text" 
              className="form-control" />


            </div>
            <div className="col-12 col-sm-6">
              <label className="form-label">How did you hear about us?</label>
              <input 
                name="hearAboutUs"
                value={contactUsMessage.hearAboutUs}
                onChange={handleInputChange}
                type="text" 
                className="form-control" />


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
