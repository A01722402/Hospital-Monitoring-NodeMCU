import Image from 'next/image'
import Link from 'next/link'

const SideBar = () => {
  return (
    <div className="w-65 bg-red-700 h-screen">
        <div className="flex flex-col items-left">
            <div className="flex flex-row items-center py-3">
                <div>
                    <Image 
                    src = "/HospitAI_logo.png"
                    alt = "HospitAI Logo"
                    width = {200}
                    height = {200}
                    style={{width: '6rem', height: '6rem'}}
                    />
                </div>
                <div className='text-white text-3xl'>
                    HospitAI
                </div>
            </div>
            <hr className='w-72 border-t border-gray-300 ml-4 py-2' />
            <div className='flex flex-col items-center gap-5'>
                <div>
                    <Link href="/Dashboard">
                        <button className='bg-red-900 rounded-2xl flex items-center justify-left w-72 py-3'>
                            <div className='ml-6'>
                                <Image 
                                src="/homeIcon.svg"
                                alt='Back Icon'
                                width={20}
                                height={20}
                                style={{width: '2rem', height: '2rem'}}
                                />
                            </div>
                            <div className='text-white font-bold text-2xl ml-4'>
                                Home
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
                                style={{width: '2rem', height: '2rem'}}
                                />
                            </div>
                            <div className='text-white font-bold text-2xl ml-4'>
                                Patients
                            </div>
                        </button>
                    </Link>
                </div>

                
                <div>
                    <hr className='w-72 border-t border-gray-300 py-2' />
                    <Link href="/">
                        <button className='bg-red-900 rounded-2xl flex items-center justify-left w-72 py-3'>
                            <div className='ml-6'>
                                <Image 
                                src="/backIcon.png"
                                alt='Back Icon'
                                width={20}
                                height={20}
                                style={{width: '2rem', height: '2rem'}}
                                />
                            </div>
                            <div className='text-white font-bold text-2xl ml-4'>
                                Back
                            </div>
                        </button>
                    </Link>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default SideBar