import SideBar from "@/app/components/SideBar/SideBar"
import TablaPacientes from "@/app/components/TablaPacientes/TablaPacientes"

const page = async () => {
  return (
    <div className="flex flex-row">
        <SideBar />
        <div className="flex flex-col flex-grow">
          <div className='text-5xl py-9 pl-12 bg-red-800 text-white'>
            Patients
          </div>

          <div className="pt-16">
            <TablaPacientes />
          </div>
        </div>

    </div>
  )
}

export default page