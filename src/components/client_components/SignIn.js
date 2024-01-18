'use client'
import { useState , useEffect} from "react";
import UserApi from '../../api/UserApi'
import axios from 'axios';

var instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
});

const AUTH = "auth"

export default function SignIn() {

  console.log("NEXT_PUBLIC_ENV: ", process.env.NEXT_PUBLIC_ENV)
  console.log("NEXT_PUBLIC_API_URL: ", process.env.NEXT_PUBLIC_API_URL)

  const [userInfo, setUserInfo] = useState({
    email: "folaukaveinga@gmail.com",
    password: "folaulisa1"
  });

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // signUpWithEmailAndPassword()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e) => {
    setUserInfo(userInfo => ({
      ...userInfo,
      [e.target.name]: e.target.value,
    }))
  }

  const signInWithEmailAndPassword = () => {
    console.log(userInfo)

    const options = {
      headers: {
          'Content-Type': 'application/json'
      }
    };
    instance.post('/pitaconcrete/signin', JSON.stringify(userInfo), options).then((response) => {
      console.log("response: ", response);

      // Auth.signIn(response.data);
      if (typeof window !== 'undefined') {
        // Code that uses localStorage
        localStorage.setItem(AUTH, JSON.stringify(response.data));
        localStorage.setItem("token", response.data);

        window.location.href = "/";
      }

     
      
    }).catch((error) => {
      console.error("Error msg: ", error.message);
      console.error("Error: ", error);
      if(error.response.data){
        setErrorMsg(error.response.data.message)
      }else{
        setErrorMsg(error.message+". Server may be down")
      }
      
    });

  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      signInWithEmailAndPassword()
    }
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4 offset-md-4 mt-5">
            <form>
              <h1 className="h3 mb-3 fw-normal">Sign In</h1>
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
                <div className="col-md-12 mb-2">
                  <div className="form-floating">
                    <input 
                    type="email" 
                    className="form-control"
                    autoComplete="email"
                    name="email"
                    value={userInfo.email}
                    onChange={handleInputChange}
                    required
                    placeholder="johndoe@gmail.com"
                    onKeyDown={(e)=>handleKeyDown(e)} 
                    />
                    <label>Email address</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 mb-2">
                  <div className="form-floating">
                    <input 
                    type="password" 
                    className="form-control" 
                    value={userInfo.password}
                    onChange={handleInputChange}
                    required
                    name="password"
                    placeholder="Password"
                    onKeyDown={(e)=>handleKeyDown(e)} 
                    />
                    <label>Password</label>
                  </div>
                </div>
              </div>
              <button onClick={()=>signInWithEmailAndPassword()} className="btn btn-primary w-100 py-2" type="button">Sign In</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
