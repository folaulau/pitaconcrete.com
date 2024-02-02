'use client'

import { useState , useEffect} from "react";
import {FileType} from './FileType'
import ProjectApi from '../../api/ProjectApi'
import FilterPool from './FilterPool';
import { Tags } from './ProjectTag'


export default function AllMediaDisplay() {

  const [mediaInfos, setMediaInfos] = useState([{aws_key: "", file_name:'', projectId:0, services:[{name:'',selected:false}]}]);

  const [serviceFilters, setServiceFilters] = useState([{name:'',selected: false}]);

  const [errorMsg, setErrorMsg] = useState("");

  const mediaDomin = process.env.NEXT_PUBLIC_MEDIA_CLOUDFRONT_URL

  useEffect(() => {

    setServiceFilters(Tags.map((tag, index) => ({ name: tag, selected: index === 0 })));

    loadMediaInfos()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMediaInfos = () => {
    console.log("loadMediaInfos")

    ProjectApi.getAllMedia().then((response) => {
      console.log("get all media response: ", response.data);
      setMediaInfos(response.data)
    }).catch((error) => {
      console.error("Error: ", error);
      setErrorMsg(error.message)
      console.error("Error: ", errorMsg);
    });

  }

  const clickFilter = (clickedFilter) => {
    console.log("clickFilter")
    
    let all = Tags[0]
    let newFilters = []
    if (clickedFilter.name === all) {
      newFilters = serviceFilters.map(filter => ({
        ...filter,
        selected: filter.name === all ? !clickedFilter.selected : false
      }));
    } else {
      newFilters= serviceFilters.map(filter => {
        if (filter.name === clickedFilter.name) {
          return { ...filter, selected: !filter.selected };
        }
        if (filter.name === all) {
          return { ...filter, selected: false };
        }
        return filter;
      });
    }

    // Check if no filter is selected and set 'All' to true
    const isAnyFilterSelected = newFilters.some(filter => filter.selected);
    if (!isAnyFilterSelected) {
      newFilters = newFilters.map(filter => ({
        ...filter,
        selected: filter.name === all
      }));
    }

    setServiceFilters(newFilters)



  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-12">

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

            <div className='row'>
              <div className='col-12 col-sm-12'>
                <div className='row mb-2'>
                  <div className='col-12 col-sm-12'>
                    {
                      serviceFilters.map((filter, index) => (
                        <button 
                            key={index}
                            className={`btn btn-outline-primary me-1 btn-sm ${filter.selected ? 'active' : ''}`}
                            type="button"
                            onClick={() => clickFilter(filter)}
                        >
                          {filter.name}
                        </button>
                      ))
                    }
                  </div>
                </div>

                <div className='row'>
                  {
                    mediaInfos.length > 0 &&
                    mediaInfos.map((fileInfo)=>(
                          (fileInfo.aws_key && fileInfo.aws_key !== '') &&
                          <div key={fileInfo.aws_key} className='col-12 col-sm-4'>

                          <div className='row border'>
                            <div className='col-12 px-2'>
                              {
                                fileInfo.file_ui_type === FileType.IMAGE &&
                                <img src={mediaDomin + `/`+ fileInfo.aws_key} className="img-thumbnail" alt="..."/>
                              }
                              {
                                fileInfo.file_ui_type === FileType.VIDEO &&
                                <video className="img-thumbnail" controls>
                                  <source src={mediaDomin + `/`+ fileInfo.aws_key} type={fileInfo.content_type}></source>
                                  Your browser does not support the video tag.
                                </video>
                              }
                              {
                                fileInfo.file_ui_type === FileType.PDF &&
                                <iframe 
                                src={mediaDomin + `/`+ fileInfo.aws_key} 
                                className="img-thumbnail"
                                title={fileInfo.file_name}>
                                </iframe>
                              }
                            </div>
                          </div>

                        </div>
                        
                      
                    ))
                  }
                </div>
              </div>
            </div>
    
          </div>
        </div>
      </div>
    </>
  )
}
