import Image from 'next/image'
import { Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';

export default function Home() {

  console.log("NEXT_PUBLIC_ENV: ", process.env.NEXT_PUBLIC_ENV)

  return (
    <main className='container'>
      <h2>Coming soon!!</h2>

      <Button variant="primary">Primary</Button>

    </main>
  )
}
