import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import './main.css'
import "bootstrap/dist/css/bootstrap.min.css";
import CustomHeader from '@/components/server_components/CustomHeader';

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

        <CustomHeader />
        
        {children}
        
      </body>
    </html>
  )
}
