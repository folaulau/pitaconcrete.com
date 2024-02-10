'use client'

import { useState , useEffect} from "react";
import axios from 'axios';
import {FileType} from './FileType'
import FileApi from '../../api/FileApi'
import ProjectApi from '../../api/ProjectApi'
import {  AllTagList } from '@/components/client_components/ProjectTag'
import TagPool from './TagPool'

export default function CustomerReviewFE() {

  // Create a URLSearchParams instance from the query string

  let initialReviewState = {
    name: "",
    imageUrl: "",
    rating: 0,
    comment: "",
    phone:"",
    email:"",
    recommending: ""
  }


  const [newReview, setNewReview] = useState(initialReviewState);

  const [errorMsg, setErrorMsg] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  const [showBusy, setShowBusy] = useState(false);

  const mediaDomin = process.env.NEXT_PUBLIC_MEDIA_CLOUDFRONT_URL

  useEffect(() => {

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e) => {
    setNewReview(newReview => ({
      ...newReview,
      [e.target.name]: e.target.value,
    }))
  }

  const loadProject = (id) => {

    ProjectApi.getById(id).then((response) => {
      console.log("project add/update entry response: ", response.data);
      setProject(response.data)
    }).catch((error) => {
      console.error("Error: ", error);
      setErrorMsg(error.message)
      console.error("Error: ", errorMsg);
      setShowBusy(true)
    });
  }

  // const addMediaFile = (fileInfo) => {
  //   setProject(project => ({
  //     ...project,
  //     fileInfos: [...project.fileInfos, fileInfo]
  //   }));
  // }

  // const removeMediaFile = (awsKey) => {
  //   setProject(project => ({
  //     ...project,
  //     fileInfos: project.fileInfos.filter(file => file.awsKey !== awsKey)
  //   }));
  // }

  const handleFileLoads = (e) => {

    // setDisableSaveBtn(false)

    console.log("handleFileLoads")
    let fileList = e.target.files; // This is a FileList object

    // Convert FileList to Array
    let files = Array.from(fileList);

    // setSelectedFiles(files);

    if(files.length>0){

      // setDisableSaveBtn(true)

      // setShowBusy(true)

      FileApi.getPresignedUrlsToUploadFiles(files).then((response) => {
        console.log("files uploaded response: ", response.data);

        let fileInfos = response.data

        setAlertMsg("Media uploading to Cloud...")

        let uploadPromises = files.map((file, index) => {
          let fileInfo = fileInfos[index];
          return FileApi.uploadFileToS3(file, fileInfo['url']);
        });

        Promise.all(uploadPromises).then((responses) => {
            // All files are uploaded successfully
            responses.forEach((response, index) => {
                console.log("File uploaded to S3:", files[index].name);
                addMediaFile(fileInfos[index]);
            });
            
            setAlertMsg("Media uploaded.")
      
        }).catch((error) => {
            // Handle the error if any of the file uploads failed
            console.error("Error in uploading files: ", error);
            setErrorMsg(error.message);
            setDisableSaveBtn(false);
            setShowBusy(false);
            setAlertMsg("");
        });

        
      }).catch((error) => {
        console.error("Error: ", error);
        setErrorMsg(error.message)
        console.error("Error: ", errorMsg);

        setDisableSaveBtn(false)
        setShowBusy(false)

        setAlertMsg("")
      });

    }
  };

  const validate = () => {
    let form = JSON.parse(JSON.stringify(project))

    let errrorMessages = []

    if(form.name === null || form.name.trim().length<=0){
      errrorMessages.push("Name is required")
    }

    if(form.createdAt === null || form.createdAt.trim().length<=0){
      errrorMessages.push("Date is required")
    }

    if(form.address === null || form.address.trim().length<=0){
      errrorMessages.push("Address is required")
    }

    let errrorMessage = ""

    if(errrorMessages.length>0){
      errrorMessages.unshift("These fields are invalid\n")
      errrorMessage = errrorMessages.join("\n")
    }

    return errrorMessage

  }

  const addNewReview = () => {
    console.log("addNewReview")
    console.log(JSON.stringify(newReview))


    let errrorMessage = validate()

    setErrorMsg(errrorMessage)

    if(errrorMessage.length>0){
      return;
    }

    setShowBusy(true)

    // ProjectApi.createUpdate(project).then((response) => {
    //   console.log("project add/update entry response: ", response.data);
    //   setProject(response.data)
    //   populateIdParameter(response.data.id)

    //   setAlertMsg("Project saved!")
    // }).catch((error) => {
    //   console.error("Error: ", error);
    //   setErrorMsg(error.message)
    //   console.error("Error: ", errorMsg);
    //   setShowBusy(true)
    // });

  }

  const populateIdParameter = (id) => {
    // Get the current URL
    const url = new URL(window.location.href);

    // Set the query parameter
    url.searchParams.set('id', id);

    // Use history.pushState to change the URL without reloading the page
    window.history.pushState({}, '', url);
  }

  const clickService = (clickedFilter, fileInfo) => {

    console.log("clickedFilter, ", clickedFilter);
    console.log("fileInfo, ", fileInfo);

    let updatedServices = [];

    if(fileInfo.services === null || fileInfo.services === undefined){
      fileInfo.services = serviceFilters
    }

    // Check if the clicked filter is 'All'
    if (clickedFilter.name === 'All') {
        // Set 'All' to selected and all others to not selected
        updatedServices = fileInfo.services.map(service => ({
            ...service,
            selected: service.name === 'All'
        }));
    } else {
        // For any other filter, toggle its selected state and set 'All' to false
        updatedServices = fileInfo.services.map(service => ({
            ...service,
            selected: service.name === clickedFilter.name ? !service.selected : (service.name === 'All' ? false : service.selected)
        }));
    }

    // Check if any service is selected, if not, set 'All' to true
    const isAnyServiceSelected = updatedServices.some(service => service.selected);
    if (!isAnyServiceSelected) {
      updatedServices = updatedServices.map(service => ({
        ...service,
        selected: service.name === 'All'
      }));
    }

    // Update the project.fileInfos array
    const updatedFileInfos = project.fileInfos.map(fi => {
        if (fi.aws_key === fileInfo.aws_key) {
            return { ...fi, services: updatedServices };
        }
        return fi;
    });

    setProject(prevProject => ({
        ...prevProject,
        fileInfos: updatedFileInfos
    }));

  }

  const handleRating = (rating) => {
    setNewReview(prevReview => ({
      ...prevReview,
      rating: rating,
    }));
  };

  const handleRecommending = (recommending) => {
    setNewReview(prevReview => ({
      ...prevReview,
      recommending: recommending,
    }));
  };

  return (
    <>
      <div className="container">
        <div className="row mb-1">
          <div className="col-6 col-sm-6">

            <h4>Review</h4>
          
          </div>
          <div className='col-12 col-sm-6'>
            <div className='row'>
              <div className='col-12 col-sm-12 text-end'>
                <button 
                onClick={()=>addNewReview()}
                // disabled={disableSaveBtn}
                type="button" className="btn btn-outline-primary">Submit</button>


              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-12">
            <form>
              <div className='row'>
                <div className="col-12 col-sm-12">
                  {/* {
                    errorMsg && 
                    <div className="alert alert-danger">
                      {errorMsg}
                    </div>
                  } */}
                  {/* {errorMsg} */}
                  
                  {
                    errorMsg && 
                    <div className="alert alert-danger">
                    {
                      errorMsg.split("\n").map((message, index) => (
                        <div key={index}>
                          {message}
                          <br/>
                        </div>
                      ))
                    }
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
                <div className="col-12 col-sm-5">

                  <div className='row'>
                    <div className='col-sm-5 offset-sm-2'>
      
                      <div className='row'>
                        <div className='col-12'>
                          <img src="/user_placeholder.jpeg" class="img-fluid" alt="..."/>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-12'>
                          <label className="form-label">Your Picture</label>
                          <input 
                            onChange={handleFileLoads} 
                            className="form-control form-control-sm" type="file" />
                      
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
                <div className="col-12 col-sm-7">

                  <div className="row">
                    <div className="col-12 col-sm-6">
                      <label className="form-label">Name</label>
                      <input 
                      type="text" 
                      className="form-control"
                      name="name"
                      value={newReview.name}
                      onChange={handleInputChange}
                      required
                      placeholder=""
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <label className="form-label">Phone</label>
                      <input 
                      type="text" 
                      className="form-control"
                      name="phone"
                      value={newReview.phone}
                      onChange={handleInputChange}
                      required
                      placeholder=""
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-sm-6">
                      <label className="form-label">Email</label>
                      <input 
                        type="text" 
                        className="form-control"
                        name="email"
                        value={newReview.email}
                        onChange={handleInputChange}
                        required
                        placeholder=""
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <label className="form-label">Quality of Service</label>
                      <br/>

                      <div className="btn-group" role="group">
                        {[...Array(5)].map((star, index) => {
                          index += 1;
                          return (
                            <button
                              key={index}
                              type="button"
                              className={`btn ${index <= newReview.rating ? 'btn-primary' : 'btn-outline-primary'}`}
                              onClick={() => handleRating(index)}
                            >
                              {index <= newReview.rating ? <i className="bi bi-star-fill"></i> : <i className="bi bi-star"></i>}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                  </div>
                  <div className="row">
                    <div className="col-12 col-sm-6">
                      <label className="form-label">Would you recommend us to a friend?</label>
                      <br/>
                      <div class="btn-group">
                        <button 
                          onClick={()=>handleRecommending("Yes")}
                          type="button" 
                          className={`btn ${newReview.recommending === "Yes" ? "btn-primary" : "btn-outline-primary"}`}>
                          Yes
                        </button>
                        <button 
                          onClick={()=>handleRecommending("No")}
                          type="button" 
                          className={`btn ${newReview.recommending === "No" ? "btn-primary" : "btn-outline-primary"}`}>
                          No
                        </button>
                      </div>
                    </div>
                    
                  </div>
                  <div className="row">
                    <div className="col-12 col-sm-12">
                        <label className="form-label">Comment</label>
                        <textarea 
                          name="comment"
                          value={newReview.comment}
                          onChange={handleInputChange}
                          className="form-control" 
                          rows="3">

                        </textarea>
                
                    </div>
                  </div>
                  
                </div>
              </div>

          
      
              {/* <button onClick={()=>signInWithEmailAndPassword()} className="btn btn-primary w-100 py-2" type="button">Sign In</button> */}
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
