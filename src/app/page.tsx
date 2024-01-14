import Image from 'next/image'

export default function Home() {

  console.log("NEXT_PUBLIC_ENV: ", process.env.NEXT_PUBLIC_ENV)

  return (
    <main className='container'>
      <h2>Coming soon!</h2>

    </main>
  )
}
