import Image from 'next/image'
import Link from 'next/link'

const SideBar = () => {
  return (
    <div className="w-80 bg-red-700 h-screen">
        <div className="flex flex-col items-center">
            <div>
                <Image 
                src = "/HospitAI_logo.png"
                alt = "HospitAI Logo"
                width = {200}
                height = {200}
                style={{width: '20rem', height: '20rem'}}
                />
            </div>
            <div className='flex flex-col items-center gap-10 mt-10'>
                <div>
                    <Link href="/Dashboard">
                        <button className='bg-red-900 px-4 py-6 rounded-2xl flex items-center justify-center'>
                            <div className='ml-6'>
                                <Image 
                                src="/homeIcon.svg"
                                alt='Back Icon'
                                width={20}
                                height={20}
                                style={{width: '3rem', height: '3rem'}}
                                />
                            </div>
                            <div className='text-white font-bold text-3xl ml-12 mr-10'>
                                Home
                            </div>
                        </button>
                    </Link>
                </div>

                <div>
                    <Link href="/Dashboard/Patients">
                        <button className='bg-red-900 px-4 py-6 rounded-2xl flex items-center justify-center'>
                            <div className='ml-6'>
                                <Image 
                                src="/personIcon.png"
                                alt='Patient Icon'
                                width={20}
                                height={20}
                                style={{width: '3rem', height: '3rem'}}
                                />
                            </div>
                            <div className='text-white font-bold text-3xl ml-12 mr-2'>
                                Patients
                            </div>
                        </button>
                    </Link>
                </div>

                <div>
                    <Link href="/">
                        <button className='bg-red-900 px-4 py-6 rounded-2xl flex items-center justify-center'>
                            <div className='ml-6'>
                                <Image 
                                src="/backIcon.png"
                                alt='Back Icon'
                                width={20}
                                height={20}
                                style={{width: '3rem', height: '3rem'}}
                                />
                            </div>
                            <div className='text-white font-bold text-3xl ml-12 mr-14'>
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