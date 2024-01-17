import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import './main.css'
import "bootstrap/dist/css/bootstrap.min.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pita Concrete',
  description: 'Pita Concrete Construction',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {



  return (
    <html lang="en">
      
      {/* <body className={inter.className}> */}
      <body className='container'>

      <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
          <span className="fs-4">PitaConcrete</span>
        </a>

        <ul className="nav nav-pills">
          <li className="nav-item"><a href="/" className="nav-link" aria-current="page">Home</a></li>
          <li className="nav-item"><a href="/about" className="nav-link">About</a></li>
          <li className="nav-item"><a href="/services" className="nav-link">Services</a></li>
          <li className="nav-item"><a href="/projects" className="nav-link">Projects</a></li>
          <li className="nav-item"><a href="/contact" className="nav-link">Contact</a></li>

        </ul>
      </header>
        
        {children}
        
      </body>
    </html>
  )
}
