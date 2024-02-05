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
                        projects && projects.length>0
                        && projects.map((project, index)=>(
                        
                          <tr key={project.id}>
                            <td>  {project.id}</td>
                            <td>  {project.name}</td>
                            <td>  {project.email}</td>
                            <td>  {project.phone}</td>
                            <td>  {project.message}</td>
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
