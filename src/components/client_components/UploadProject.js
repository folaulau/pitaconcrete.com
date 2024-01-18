'use client'

import { useState , useEffect} from "react";
import axios from 'axios';
import {FileType} from './FileType'
import FileApi from '../../api/FileApi'

var instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
});

export default function UploadProject() {

  const [project, setProject] = useState({
    name: "",
    createdAt: "",
    description: "",
    files: []
  });

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e) => {
    setProject(project => ({
      ...project,
      [e.target.name]: e.target.value,
    }))
  }

  const handleFileLoads = (e) => {

    // setDisableSaveBtn(false)

    console.log("handleFileLoads")
    let files = e.target.files

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      console.log(file.name)

      formData.append('files', file);
    }

    // setSelectedFiles(files);

    if(files.length>0){

      // setDisableSaveBtn(true)

      // setShowBusy(true)

      FileApi.uploadFiles("project", formData).then((response) => {
        console.log("files uploaded response: ", response.data);

        let newProject = JSON.parse(JSON.stringify(entry));

        newProject['files'] = newProject.files.concat(response.data)

        setProject(newProject)
        // setEntry(newEntry);

        // setDisableSaveBtn(false)
        // setShowBusy(false)
        
      }).catch((error) => {
        console.error("Error: ", error);
        setErrorMsg(error.message)
        console.error("Error: ", errorMsg);

        setDisableSaveBtn(false)
        setShowBusy(false)
      });

    }
  };

  // const signInWithEmailAndPassword = () => {
  //   console.log(userInfo)

  //   const options = {
  //     headers: {
  //         'Content-Type': 'application/json'
  //     }
  //   };
  //   instance.post('/pitaconcrete/signin', JSON.stringify(userInfo), options).then((response) => {
  //     console.log("response: ", response);

  //     // Auth.signIn(response.data);
  //     if (typeof window !== 'undefined') {
  //       // Code that uses localStorage
  //       localStorage.setItem(AUTH, JSON.stringify(response.data));
  //       localStorage.setItem("token", response.data);

  //       window.location.href = "/";
  //     }

     
      
  //   }).catch((error) => {
  //     console.error("Error msg: ", error.message);
  //     console.error("Error: ", error);
  //     if(error.response.data){
  //       setErrorMsg(error.response.data.message)
  //     }else{
  //       setErrorMsg(error.message+". Server may be down")
  //     }
      
  //   });

  // };

  // const handleKeyDown = (event) => {
  //   if (event.keyCode === 13) {
  //     signInWithEmailAndPassword()
  //   }
  // }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-12">
            <form>
              <h1 className="h3 mb-3 fw-normal"></h1>
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
              <div className="row">
                <div className="col-12 col-sm-6">
                <label className="form-label">Name</label>
                    <input 
                    type="text" 
                    className="form-control"
                    name="name"
                    value={project.name}
                    onChange={handleInputChange}
                    required
                    placeholder=""
                    onKeyDown={(e)=>handleKeyDown(e)} 
                    />
                </div>
                <div className="col-12 col-sm-6">
                  <label className="form-label"><b>Date</b></label>
                  <input 
                    name="createdAt"
                    onChange={handleInputChange}
                    value={project.createdAt} 
                    type="date" 
                    className="form-control"/>
             
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-sm-12">
                    <label className="form-label">Description</label>
                    <textarea 
                      name="description"
                      onChange={handleInputChange}
                      value={project.description}
                      className="form-control" 
                      rows="3">

                    </textarea>
             
                </div>
              </div>
              <div className='row'>
                <div className='col-md-12'>
                  <div className="mb-3">
                    <label className="form-label">Media</label>
                    <input 
                      onChange={handleFileLoads} 
                      className="form-control" type="file" multiple />
                  </div>
                </div>
              </div>

            <div className='row'>
            <div className='col-sm-12'>
              <div className='row'>
                {
                  project.files.length > 0 &&
                  project.files.map((file)=>(
                    
                      <div key={file.id} className='col-12 col-sm-4 text-center'>

                        <div className='row'>
                          <div className='col-12'>
                            {file.fileName}
                          </div>
                        </div>

                        <div className='row'>
                          <div className='col-12 border'>
                            {
                              file.fileUIType === FileType.IMAGE &&
                              <img src={file.s3GeneratedUrl} className="img-fluid" alt="..."/>
                            }
                            {
                              file.fileUIType === FileType.VIDEO &&
                              <video width="500" height="350" controls>
                                 <source src={file.s3GeneratedUrl} type={file.contentType}></source>
                                 Your browser does not support the video tag.
                              </video>
                            }
                            {
                              file.fileUIType === FileType.PDF &&
                              <iframe 
                              src={file.s3GeneratedUrl} 
                              width="500" 
                              height="350" 
                              title={file.fileName}>
                              </iframe>
                            }
                          </div>
                        </div>

                        <div className='row mb-1'>
                          <div className='col-12'>
                            <button 
                              onClick={(e)=>removeFile(file.id)}
                              type="button" className="btn btn-outline-danger btn-sm">remove</button>
                          </div>
                        </div>

                      </div>
                    
                  ))
                }
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
