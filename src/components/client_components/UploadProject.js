'use client'

import { useState , useEffect} from "react";
import axios from 'axios';
import {FileType} from './FileType'
import FileApi from '../../api/FileApi'
import ProjectApi from '../../api/ProjectApi'
import {  AllTagList } from '@/components/client_components/ProjectTag'
import TagPool from './TagPool'

export default function UploadProject() {

  // Create a URLSearchParams instance from the query string


  const [project, setProject] = useState({
    id: 0,
    name: "",
    address:"",
    createdAt: "",
    description: "",
    fileInfos: [{aws_key:'', content_type:'', file_name:'', projectId:0, services:[{name:'',selected:false}]}]
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  const [disableSaveBtn, setDisableSaveBtn] = useState(true);

  const [showBusy, setShowBusy] = useState(false);

  const [serviceFilters, setServiceFilters] = useState([{name:'',selected: false}]);

  const mediaDomin = process.env.NEXT_PUBLIC_MEDIA_CLOUDFRONT_URL

  useEffect(() => {

    // setServiceFilters(Tags.map((tag, index) => ({ name: tag, selected: index === 0 })));

    setServiceFilters([{ name: 'All', selected: true }, ...AllTagList.map(tag => ({ name: tag, selected: false }))]);

    const urlParams = new URLSearchParams(window.location.search); 

    let id = urlParams.get('id')

    console.log('id ', id)

    if(id !==null && id !== undefined && id>0){
      loadProject(id)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e) => {
    setProject(project => ({
      ...project,
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

  const createUpdate = () => {
    console.log("createUpdate")
    console.log(JSON.stringify(project))

    setShowBusy(true)

    ProjectApi.createUpdate(project).then((response) => {
      console.log("project add/update entry response: ", response.data);
      setProject(response.data)
      populateIdParameter(response.data.id)

      setAlertMsg("Project saved!")
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

  return (
    <>
      <div className="container">
        <div className="row mb-1">
          <div className="col-6 col-sm-6">

            <h4>Project</h4>
          
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
                <div className="col-12 col-sm-3">
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
   
                <div className="col-12 col-sm-3">
                  <label className="form-label"><b>Date</b></label>
                  <input 
                    name="createdAt"
                    onChange={handleInputChange}
                    value={project.createdAt} 
                    type="date" 
                    className="form-control"/>
             
                </div>
                <div className="col-12 col-sm-6">
                  <label className="form-label">Address</label>
                  <input 
                  type="text" 
                  className="form-control"
                  name="address"
                  value={project.address}
                  onChange={handleInputChange}
                  required
                  placeholder=""
                  />
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
                <div className='col-12 col-sm-12 mb-5'>
                  <div className='row'>
                    {
                      project.fileInfos.length > 0 &&
                      project.fileInfos.map((fileInfo)=>(
                          (fileInfo.aws_key && fileInfo.aws_key !== '') &&
                          <div key={fileInfo.aws_key} className='col-12 col-sm-4 text-center'>

                            
                            <div className='row'>
                              <div className='col-12'>
                                {/* <TagPool /> */}

                                {
                                  fileInfo.services !== undefined && fileInfo.services.length > 0 && 
                                  fileInfo.services.map((filter, index) => (
                                    <button 
                                        key={index}
                                        className={`btn btn-outline-primary me-1 btn-sm ${filter.selected ? 'active' : ''}`}
                                        style={{ padding: '1px', margin: '5px' }}
                                        type="button"
                                        onClick={() => clickService(filter, fileInfo)}
                                    >
                                      {filter.name}
                                    </button>
                                  ))
                                }

                                {
                                  (fileInfo.services === undefined || fileInfo.services.length <= 0) &&
                                  serviceFilters.map((filter, index) => (
                                    <button 
                                        key={index}
                                        className={`btn btn-outline-primary me-1 btn-sm ${filter.selected ? 'active' : ''}`}
                                        type="button"
                                        style={{ padding: '1px', margin: '5px' }}
                                        onClick={() => clickService(filter, fileInfo)}
                                    >
                                      {filter.name}
                                    </button>
                                  ))
                                }
                              </div>
                            </div>

                            <div className='row'>
                              <div className='col-12 border'>
                                {
                                  fileInfo.file_ui_type === FileType.IMAGE &&
                                  <img 
                                    src={mediaDomin + `/`+ fileInfo.aws_key} 
                                    className="img-fluid"
                                    alt="..."/>
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
                              <div className='col-6'>
                                {fileInfo.file_name}
                              </div>
                              <div className='col-6'>
                                <button 
                                  onClick={(e)=>removeMediaFile(fileInfo.aws_key)}
                                  type="button" 
                                  className="btn btn-outline-danger btn-sm"
                                  style={{ padding: '1px' }}
                                  >remove</button>
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
