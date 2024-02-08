import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@100;200;300;400;500;600;700;800;900&amp;display=swap" rel="stylesheet" />

        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css" rel="stylesheet" />


        <script>
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-TPXJV7HZ');
        </script>

      </head>
      {/* <body className={inter.className}> */}
      <body className='container'>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TPXJV7HZ"
        height="0" width="0" style={{display:"none",visibility:"hidden"}}></iframe></noscript>

        <CustomHeader />
        
        {children}

        <CustomFooter />
        
      </body>

      <GoogleAnalytics gaId="G-28E1NH1JMX" />
    </html>
  )
}
