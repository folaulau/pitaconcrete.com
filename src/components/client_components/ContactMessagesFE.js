'use client'

import { useState , useEffect} from "react";
import {FileType} from './FileType'
import ProjectApi from '../../api/ProjectApi'
import ContactApi from '@/api/ContactApi'
import FilterPool from './FilterPool';
import { AllTagList } from './ProjectTag'
import './AllMediaDisplay.css'


export default function ContactMessagesFE() {

  const [contactMessages, setContactMessages] = useState([])

  const [errorMsg, setErrorMsg] = useState("");

  const mediaDomin = process.env.NEXT_PUBLIC_MEDIA_CLOUDFRONT_URL

  useEffect(() => {

    loadContactMessages()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadContactMessages = () => {
    console.log("loadContactMessages")

    ContactApi.getAllMessages().then((response) => {
      console.log("get all contact messages response: ", response.data);
      setContactMessages(response.data)
    }).catch((error) => {
      console.error("Error: ", error);
      setErrorMsg(error.message)
      console.error("Error: ", errorMsg);
    });

  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-12">

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
              <div className='col-12 col-sm-12'>
                <div className='row'>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Message</th>
                      </tr>
                    </thead>
                    <tbody>

                      {
                        contactMessages && contactMessages.length>0
                        && contactMessages.map((contactMessage, index)=>(
                        
                          <tr key={contactMessage.id}>
                            <td>  {contactMessage.id}</td>
                            <td>  {contactMessage.name}</td>
                            <td>  {contactMessage.email}</td>
                            <td>  {contactMessage.phone}</td>
                            <td>  {contactMessage.message}</td>
                          </tr>
                          
                        ))
                      
                      }
                      
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
    
          </div>
        </div>
      </div>
    </>
  )
}
