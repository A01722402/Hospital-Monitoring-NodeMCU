import Image from 'next/image';
import Link from 'next/link';

const SideBar = () => {
  return (
    <div className="bg-red-700 min-h-screen w-80">
      <div className="flex flex-col items-center">
        <div className="mt-5">
          <Link href="/">
            <div className="flex items-center justify-center">
              <div>
                <Image
                  src="/HospitAI_logo.png"
                  alt="HospitAI Logo"
                  width={200}
                  height={200}
                  style={{ width: '6rem', height: '6rem' }}
                />
              </div>
              <div className='text-white text-3xl ml-4'>
                Hosp-Intelligent
              </div>
            </div>
          </Link>
        </div>
        <hr className='w-72 border-t border-gray-300 mt-4 mb-4' />
        <div className='flex flex-col items-center gap-2 flex-grow'>
          <div>
            <Link href="/Dashboard">
              <button className='bg-red-900 rounded-2xl flex items-center justify-left w-72 py-3'>
                <div className='ml-6'>
                  <Image
                    src="/homeIcon.svg"
                    alt='Back Icon'
                    width={20}
                    height={20}
                    style={{ width: '2rem', height: '2rem' }}
                  />
                </div>
                <div className='text-white font-bold text-2xl ml-4'>
                  Pedidos
                </div>
              </button>
            </Link>
          </div>
          <div>
            <Link href="/Dashboard/Patients">
              <button className='bg-red-900 rounded-2xl flex items-center justify-left w-72 py-3'>
                <div className='ml-6'>
                  <Image
                    src="/personIcon.png"
                    alt='Patient Icon'
                    width={20}
                    height={20}
                    style={{ width: '2rem', height: '2rem' }}
                  />
                </div>
                <div className='text-white font-bold text-2xl ml-4'>
                  Pacientes
                </div>
              </button>
            </Link>
          </div>
          <hr className='w-72 border-t border-gray-300 py-2' />
          <div>
            <Link href="/Dashboard/Settings">
              <button className='bg-red-900 rounded-2xl flex items-center justify-left w-72 py-3'>
                <div className='ml-6'>
                  <Image
                    src="/settingIcon.png"
                    alt='Settings Icon'
                    width={20}
                    height={20}
                    style={{ width: '2rem', height: '2rem' }}
                  />
                </div>
                <div className='text-white font-bold text-2xl ml-4'>
                  Settings
                </div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;