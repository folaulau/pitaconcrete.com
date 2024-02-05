import type { Metadata } from 'next'
import '../globals.css'
import '../main.css'
import "bootstrap/dist/css/bootstrap.min.css";

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
    <>
      <div>
        <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
          <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
            <span className="fs-4"></span>
          </a>

          <ul className="nav nav-pills">
            <li className="nav-item"><a href="/admin/project-create-update" className="nav-link">Project</a></li>
            <li className="nav-item"><a href="/admin/projects" className="nav-link">Projects</a></li>
            <li className="nav-item"><a href="/admin/contact-messages" className="nav-link">Contact Messages</a></li>

          </ul>
        </header>
        
        {children}
      </div>
    </>
  )
}
