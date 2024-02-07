import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import "bootstrap/dist/css/bootstrap.min.css";
import './globals.css'
import './main.css'
import CustomHeader from '@/components/server_components/CustomHeader';
import CustomFooter from '@/components/server_components/CustomFooter';

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


      {/* <link
          rel="preload"
          href="https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700,800,900&display=swap"
          as="style"
      /> */}

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@100;200;300;400;500;600;700;800;900&amp;display=swap" rel="stylesheet" />

      <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css" rel="stylesheet" />
      
      {/* <body className={inter.className}> */}
      <body className='container'>

        <CustomHeader />
        
        {children}

        <CustomFooter />
        
      </body>
    </html>
  )
}
