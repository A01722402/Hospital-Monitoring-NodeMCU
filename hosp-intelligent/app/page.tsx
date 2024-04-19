import Image from 'next/image'
import Link from 'next/link'
import TopBar from './components/TopBar/TopBar'

export default function Home() {
  return (
    <main>
      <Image 
        src={"/background-inicio.jpeg"}
        alt="background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className='-z-20'
      />
      <div className="absolute h-full w-full bg-black opacity-70 -z-20"></div>

      <TopBar />
      <div className="flex items-center justify-center h-full">
      <div className="max-w-5xl grid grid-cols-1 items-center">
        <div className="flex justify-center mt-10">
          <Image 
            src={"/HospitAI_logo.png"}
            alt="logo"
            width={300}
            height={300}
            quality={100}
          />
        </div>
        <div className="text-center">
          <p className="text-white text-7xl font-bold mb-10 inline-block">
            Bienvenido a Hosp
          </p>
          <p className='text-red-600 text-7xl font-bold inline-block'>
            Intelligent
          </p>
        </div>

        <div className="text-center">
          <p className="text-white text-3xl font-bold mb-10">
            La plataforma de monitoreo de pacientes integrada con Internet de las Cosas para dar el mejor cuidado a todos los pacientes
          </p>
        </div>
    
        <div className="flex justify-center">
          <Link href="/Login">
            <button className="bg-red-700 px-20 py-5 text-white font-bold border-none rounded-md text-2xl">
              Acceder
            </button>
          </Link>
        </div>

      </div>
      </div>
    </main>
  )
}
