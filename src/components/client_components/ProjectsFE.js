'use client'

import { useState , useEffect} from "react";
import ProjectApi from '@/api/ProjectApi'
import './AllMediaDisplay.css'


export default function ProjectsFE() {

  const [projects, setProjects] = useState([])

  const [errorMsg, setErrorMsg] = useState("");

  const mediaDomin = process.env.NEXT_PUBLIC_MEDIA_CLOUDFRONT_URL

  useEffect(() => {

    loadProjects()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadProjects = () => {
    console.log("loadContactMessages")

    ProjectApi.getAllProjects().then((response) => {
      console.log("get all contact messages response: ", response.data);
      setProjects(response.data)
    }).catch((error) => {
      console.error("Error: ", error);
      setErrorMsg(error.message)
      console.error("Error: ", errorMsg);
    });

  }

  const startProject = () => {
    
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
              <div className='col-12 col-sm-4'>
                <a 
                href="/admin/project"
                className="btn btn-outline-primary">Start</a>
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
                        <th scope="col">Address</th>
                        <th scope="col">Date</th>
                      </tr>
                    </thead>
                    <tbody>

                      {
                        projects && projects.length>0
                        && projects.map((project, index)=>(
                        
                          <tr key={project.id}>
                            <td>  <a href={"/admin/project/?id="+project.id}>{project.id}</a></td>
                            <td>  {project.name}</td>
                            <td>  {project.address}</td>
                            <td>  {project.createdAt}</td>
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
