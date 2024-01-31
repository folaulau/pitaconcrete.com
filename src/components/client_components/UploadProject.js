'use client'

import { useState , useEffect} from "react";
import axios from 'axios';
import {FileType} from './FileType'
import FileApi from '../../api/FileApi'
import ProjectApi from '../../api/ProjectApi'


export default function UploadProject() {

  // Create a URLSearchParams instance from the query string
  const urlParams = new URLSearchParams(window.location.search); 

  let id = urlParams.get('id')

  const [project, setProject] = useState({
    id: id,
    name: "",
    createdAt: "",
    description: "",
    fileInfos: []
  });

  const [errorMsg, setErrorMsg] = useState("");

  const [disableSaveBtn, setDisableSaveBtn] = useState(true);

  const [showBusy, setShowBusy] = useState(false);

  const mediaDomin = process.env.NEXT_PUBLIC_MEDIA_CLOUDFRONT_URL

  useEffect(() => {

    console.log('id ', id)

    if(id !==null && id !== undefined && id>0){
      loadProject()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e) => {
    setProject(project => ({
      ...project,
      [e.target.name]: e.target.value,
    }))
  }

  const loadProject = () => {

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

  const addMediaFile = (fileInfo) => {
    setProject(project => ({
      ...project,
      fileInfos: [...project.fileInfos, fileInfo]
    }));
  }

  const removeMediaFile = (aws_key) => {
    setProject(project => ({
      ...project,
      fileInfos: project.fileInfos.filter(file => file.aws_key !== aws_key)
    }));
  }

  const handleFileLoads = (e) => {

    // setDisableSaveBtn(false)

    console.log("handleFileLoads")
    let files = e.target.files

    // setSelectedFiles(files);

    if(files.length>0){

      // setDisableSaveBtn(true)

      // setShowBusy(true)

      FileApi.getPresignedUrlsToUploadFiles(files).then((response) => {
        console.log("files uploaded response: ", response.data);

        let fileInfos = response.data

        for (let i = 0; i < files.length; i++) {
          let file = files[i];
          let fileInfo = fileInfos[i]

          FileApi.uploadFileToS3(file, fileInfo['url']).then((response) => {

            console.log("file uploaded to s3")

            addMediaFile(fileInfo)
            

          }).catch((error) => {
            console.error("Error: ", error);
            setErrorMsg(error.message)
            console.error("Error: ", errorMsg);
    
            setDisableSaveBtn(false)
            setShowBusy(false)
          });
        }

        
      }).catch((error) => {
        console.error("Error: ", error);
        setErrorMsg(error.message)
        console.error("Error: ", errorMsg);

        setDisableSaveBtn(false)
        setShowBusy(false)
      });

    }
  };

  const createUpdate = () => {
    console.log("createUpdate")
    console.log(JSON.stringify(project))

    setShowBusy(true)

    ProjectApi.createUpdate(project).then((response) => {
      console.log("project add/update entry response: ", response.data);
      setProject(response.data)
      populateIdParameter(response.data.id)
    }).catch((error) => {
      console.error("Error: ", error);
      setErrorMsg(error.message)
      console.error("Error: ", errorMsg);
      setShowBusy(true)
    });

  }

  const populateIdParameter = (id) => {
    // Get the current URL
    const url = new URL(window.location.href);

    // Set the query parameter
    url.searchParams.set('id', id);

    // Use history.pushState to change the URL without reloading the page
    window.history.pushState({}, '', url);
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-6 col-sm-6">

            <h4>Create/Update Project</h4>
          
          </div>
          <div className='col-12 col-sm-6'>
            <div className='row'>
              <div className='col-12 col-sm-12 text-end'>
                <button 
                onClick={()=>createUpdate()}
                // disabled={disableSaveBtn}
                type="button" className="btn btn-outline-primary">Save</button>

                <button 
                onClick={()=>cancel()}
                type="button" 
                className="btn btn-outline-danger ms-2">Cancel</button>


              </div>
            </div>
          </div>
        </div>
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
                      project.fileInfos.length > 0 &&
                      project.fileInfos.map((fileInfo)=>(
                        
                          <div key={fileInfo.aws_key} className='col-12 col-sm-4 text-center'>

                            <div className='row'>
                              <div className='col-12'>
                                {fileInfo.file_name}
                              </div>
                            </div>

                            <div className='row'>
                              <div className='col-12 border'>
                                {
                                  fileInfo.file_ui_type === FileType.IMAGE &&
                                  <img src={mediaDomin + `/`+ fileInfo.aws_key} className="img-fluid" alt="..."/>
                                }
                                {
                                  fileInfo.file_ui_type === FileType.VIDEO &&
                                  <video className="img-fluid" controls>
                                    <source src={mediaDomin + `/`+ fileInfo.aws_key} type={fileInfo.content_type}></source>
                                    Your browser does not support the video tag.
                                  </video>
                                }
                                {
                                  fileInfo.file_ui_type === FileType.PDF &&
                                  <iframe 
                                  src={mediaDomin + `/`+ fileInfo.aws_key} 
                                  className="img-fluid"
                                  title={fileInfo.file_name}>
                                  </iframe>
                                }
                              </div>
                            </div>

                            <div className='row mb-1'>
                              <div className='col-12'>
                                <button 
                                  onClick={(e)=>removeMediaFile(fileInfo.aws_key)}
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
