import Image from 'next/image'

export default function Home() {

  console.log("NEXT_PUBLIC_ENV: ", process.env.NEXT_PUBLIC_ENV)

  return (
    <main className='container'>
      <h2>Hello</h2>

    </main>
  )
}
