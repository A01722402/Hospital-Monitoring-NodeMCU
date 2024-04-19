import Image from 'next/image';
import Link from 'next/link';
import TopBar from '../components/TopBar/TopBar';

const Page = () => {
  return (
    <div className="bg-gray-800 h-screen">
      <TopBar />
      <div className="flex flex-col justify-center items-center h-full">
        <div className="flex flex-row items-center mt-10">
          <div className="mr-4">
            <Image 
              src="/HospitAI_logo.png"
              alt="HospitAI Logo"
              width={200}
              height={200}
              style={{ width: '6rem', height: '6rem' }}
            />
          </div>
          <div className='text-white text-3xl'>
            Hosp-Intelligent
          </div>
        </div>
        <div className='flex flex-col items-center gap-5 flex-grow'>
          <div className="text-center">
            <input type="text" placeholder="Email" className="border-2 border-gray-300 px-15 p-2 rounded-md" />
          </div>
          <div className="text-center">
            <input type="password" placeholder="Password" className="border-2 border-gray-300 px-15 p-2 rounded-md" />
          </div>
          <div className="text-center">
            <Link href="/Dashboard">
              <button className="bg-red-700 px-20 py-5 text-white font-bold border-none rounded-md text-2xl">
                Iniciar Sesión
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
