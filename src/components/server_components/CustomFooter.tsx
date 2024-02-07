'use client'
 
import { usePathname } from 'next/navigation'
import { useState , useEffect} from "react"
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import styles from './CustomHeader.module.css'

export default function CustomFooter() {
    
    const routePathname = usePathname()

    const isActive = (pathname: string) => routePathname === pathname;

    const [expanded, setExpanded] = useState(false);

    useEffect(() => {

        console.log("routePathname, ", routePathname)
        console.log("isActive, ", isActive)
    
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [routePathname]);

    return (
        <footer>
            <div className='row mt-5'>
                <div className='col-12'>

                    <div className='row'>
                        <div className='col-12 col-sm-3'>
                            <h5>Our Mission</h5>
                            <div className="row">
                                <div className="col-12 fs-6">
                                    <ul className="">
                                        <li className="about-us-check-list about-us-list-group-item-check p-1">Empower our clients by bringing their visions and needs to fruition with precision and care.</li>
                                        <li className="about-us-check-list about-us-list-group-item-check p-1">Guide every project to its successful completion, tackling challenges head-on with innovative solutions.</li>
                                        <li className="about-us-check-list about-us-list-group-item-check p-1">We believe in doing what is right for our clients and our community, regardless of the cost.</li>
                                        <li className="about-us-check-list about-us-list-group-item-check p-1">Ensure that every interaction and service positively impacts lives.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-sm-3'>
                            <h5>Contact Us</h5>
                            <div className='row'>
                                <div className='col-12 fs-6'>
                                    PHONE: (760) 991-7359
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-12 fs-6'>
                                    EMAIL: pitaconcrete@gmail.com
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-sm-3'>
                            <h5>Operational Hours</h5>
                            <div className='row'>
                                <div className='col-12 fs-6'>
                                    Monday – Friday   :   9 AM – 5 PM
                                </div>
                            </div>
                            
                        </div>
                        <div className='col-12 col-sm-3'>
                            <h5>Follow Us</h5>
                        </div>
                    </div>

                </div>
            </div>  
        </footer>
    );
}
