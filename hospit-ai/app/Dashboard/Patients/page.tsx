import SideBar from "@/app/components/SideBar/SideBar"
import TablaPacientes from "@/app/components/TablaPacientes/TablaPacientes"

const page = async () => {
  return (
    <div className="flex flex-row">
        <SideBar />
        <div className="flex flex-col flex-grow p-11">
          <div className="text-5xl font-bold pb-11">
            Patients
          </div>
          <div className="text-2xl font-bold pb-11">
            Register:
          </div>

          <TablaPacientes />
        </div>

    </div>
  )
}

export default page