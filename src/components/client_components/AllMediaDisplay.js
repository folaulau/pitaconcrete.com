'use client'

import { useState , useEffect} from "react";
import {FileType} from './FileType'
import ProjectApi from '../../api/ProjectApi'


export default function AllMediaDisplay() {

  const [mediaInfos, setMediaInfos] = useState([[]]);

  const [errorMsg, setErrorMsg] = useState("");

  const [showBusy, setShowBusy] = useState(false);

  const mediaDomin = process.env.NEXT_PUBLIC_MEDIA_CLOUDFRONT_URL

  useEffect(() => {

    loadMediaInfos()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMediaInfos = () => {
    console.log("loadMediaInfos")

    setShowBusy(true)

    ProjectApi.getAllMedia().then((response) => {
      console.log("get all media response: ", response.data);
      setMediaInfos(response.data)
    }).catch((error) => {
      console.error("Error: ", error);
      setErrorMsg(error.message)
      console.error("Error: ", errorMsg);
      setShowBusy(true)
    });

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
              <div className='col-sm-12'>
                <div className='row'>
                  {
                    mediaInfos.length > 0 &&
                    mediaInfos.map((mediaList)=>(
                      
                        mediaList.map((fileInfo) => (
                          <div key={fileInfo.aws_key} className='col-12 col-sm-4'>

                          <div className='row'>
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
