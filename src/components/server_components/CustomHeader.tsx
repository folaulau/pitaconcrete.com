'use client'
 
import { usePathname } from 'next/navigation'
import { useState , useEffect} from "react"
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import styles from './CustomHeader.module.css'

export default function CustomHeader() {
    
    const routePathname = usePathname()

    const isActive = (pathname: string) => routePathname === pathname;

    const [expanded, setExpanded] = useState(false);

    useEffect(() => {

        console.log("routePathname, ", routePathname)
        console.log("isActive, ", isActive)
    
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [routePathname]);

    return (
        <Navbar expanded={expanded} expand="lg" bg="light" variant="light">
            <Container>
                <Navbar.Brand href="/">PitaConcrete</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(expanded ? false : true)} />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">  {/* Updated this line */}
                        <Nav.Link href="/" onClick={() => setExpanded(false)} className={isActive('/') ? styles.headerActiveLink : styles.headerNavLink}>Home</Nav.Link>
                        <Nav.Link href="/about" onClick={() => setExpanded(false)} className={isActive('/about/') ? styles.headerActiveLink : styles.headerNavLink}>About Us</Nav.Link>
                        <Nav.Link href="/services" onClick={() => setExpanded(false)} className={isActive('/services/') ? styles.headerActiveLink : styles.headerNavLink}>Services</Nav.Link>
                        <Nav.Link href="/galleries" onClick={() => setExpanded(false)} className={isActive('/galleries/') ? styles.headerActiveLink : styles.headerNavLink}>Gallery</Nav.Link>
                        <Nav.Link href="/contact" onClick={() => setExpanded(false)} className={isActive('/contact/') ? styles.headerActiveLink : styles.headerNavLink}>Contact</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
