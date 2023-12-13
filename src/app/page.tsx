import Image from 'next/image'

export default function Home() {

  console.log("NEXT_PUBLIC_ENV: ", process.env.NEXT_PUBLIC_ENV)

  return (
    <main className='container'>
      <h2>I am Peter Fotu. I eat sima work like ice cream on a hot sunny day!!! Hit me up!</h2>

    </main>
  )
}
