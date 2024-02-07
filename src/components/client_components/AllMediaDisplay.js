'use client'

import { useState , useEffect} from "react";
import {FileType} from './FileType'
import ProjectApi from '../../api/ProjectApi'
import { AllTagList } from './ProjectTag'
import './AllMediaDisplay.css'


export default function AllMediaDisplay() {

  const [mediaInfos, setMediaInfos] = useState([{awsKey: "", fileName:'', projectId:0, services:[{name:'',selected:false}]}]);

  const [originalMediaInfos, setOriginalMediaInfos] = useState();

  const [serviceFilters, setServiceFilters] = useState([{name:'',selected: false}]);

  const [errorMsg, setErrorMsg] = useState("");

  const mediaDomin = process.env.NEXT_PUBLIC_MEDIA_CLOUDFRONT_URL

  useEffect(() => {


    console.log("AllTagList, ", AllTagList)
    // setServiceFilters(AllTagList.map((tag, index) => ({ name: tag, selected: index === 0 })));

    setServiceFilters([{ name: 'All', selected: true }, ...AllTagList.map(tag => ({ name: tag, selected: false }))]);

    loadMediaInfos()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMediaInfos = () => {
    console.log("loadMediaInfos")

    ProjectApi.getMediaFirst12().then((response) => {
      console.log("get first 12 media response: ", response.data);
      setMediaInfos(response.data)
      setOriginalMediaInfos(response.data)

      ProjectApi.getAllMedia().then((response) => {
        console.log("get all media response: ", response.data);
        setMediaInfos(response.data)
        setOriginalMediaInfos(response.data)
      }).catch((error) => {
        console.error("Error: ", error);
        setErrorMsg(error.message)
        console.error("Error: ", errorMsg);
      });


    }).catch((error) => {
      console.error("Error: ", error);
      setErrorMsg(error.message)
      console.error("Error: ", errorMsg);
    });

  }

  const clickFilter = (clickedFilter) => {
    console.log("clickFilter")
    
    let all = serviceFilters[0]['name']
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


    const selectedFilters = newFilters.filter(f => f.selected).map(f => f.name);
  
    let filteredMediaInfos = []

    if (selectedFilters.includes(all)) {
      filteredMediaInfos = JSON.parse(JSON.stringify(originalMediaInfos))
    }else{
      filteredMediaInfos = mediaInfos.filter(mediaInfo =>
        mediaInfo.services &&
        mediaInfo.services.length>0 &&
        
        mediaInfo.services.some(service => 
          service.name === all ||
          selectedFilters.includes(service.name) && service.selected
        )
      );
    }
    
    setMediaInfos(filteredMediaInfos);

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
                            className={`btn btn-outline-primary me-1 btn-sm ${filter.selected ? 'active' : ''} mb-1`}
                            type="button"
                            onClick={() => clickFilter(filter)}
                        >
                          {filter.name}
                        </button>
                      ))
                    }
                  </div>
                </div>
                <div>
                </div>
                <div className='row'>
                  {
                    mediaInfos && 
                    mediaInfos.length > 0 &&
                    mediaInfos.map((fileInfo, index)=>(
                          (fileInfo.awsKey && fileInfo.awsKey !== '') &&
                          <div key={index} className='col-12 col-sm-4'>

                          <div className='row'>
                            <div className='col-12 px-2'>
                              <div className="aspect-ratio-box">
                              {
                                fileInfo.fileUIType === FileType.IMAGE &&
                                <img src={mediaDomin + `/`+ fileInfo.awsKey} className="img-thumbnail image-centered" alt="..."/>
                              }
                              {
                                fileInfo.fileUIType === FileType.VIDEO &&
                                <video className="img-thumbnail" controls>
                                  <source src={mediaDomin + `/`+ fileInfo.awsKey} type={fileInfo.content_type}></source>
                                  Your browser does not support the video tag.
                                </video>
                              }
                              {
                                fileInfo.fileUIType === FileType.PDF &&
                                <iframe 
                                src={mediaDomin + `/`+ fileInfo.awsKey} 
                                className="img-thumbnail"
                                title={fileInfo.fileName}>
                                </iframe>
                              }
                              </div>
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
