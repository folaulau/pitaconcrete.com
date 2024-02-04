'use client'
 
import { usePathname } from 'next/navigation'
import { useState , useEffect} from "react"
import styles from './CustomHeader.module.css'

export default function CustomHeader() {
    
    const routePathname = usePathname()

    const isActive = (pathname: string) => routePathname === pathname;

    useEffect(() => {

        console.log("routePathname, ", routePathname)
        console.log("isActive, ", isActive)
    
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
            <span className="fs-4">PitaConcrete</span>
            </a>

            <ul className="nav nav-pills">
                <li className="nav-item">
                    <a href="/" className={`nav-link ${isActive('/') ? styles.headerActiveLink : styles.headerNavLink}`} aria-current="page">Home</a>
                </li>
                <li className="nav-item">
                    <a href="/about" className={`nav-link ${isActive('/about/') ? styles.headerActiveLink : styles.headerNavLink}`}>About Us</a>
                </li>
                <li className="nav-item">
                    <a href="/services" className={`nav-link ${isActive('/services/') ? styles.headerActiveLink : styles.headerNavLink}`}>Services</a>
                </li>
                {/* <li className="nav-item">
                    <a href="/projects" className={`nav-link ${isActive('/projects/') ? styles.headerActiveLink : styles.headerNavLink}`}>Projects</a>
                </li> */}
                <li className="nav-item">
                    <a href="/galleries" className={`nav-link ${isActive('/galleries/') ? styles.headerActiveLink : styles.headerNavLink}`}>Gallery</a>
                </li>
                <li className="nav-item">
                    <a href="/contact" className={`nav-link ${isActive('/contact/') ? styles.headerActiveLink : styles.headerNavLink}`}>Contact</a>
                </li>
            </ul>
        </header>
    );
}
