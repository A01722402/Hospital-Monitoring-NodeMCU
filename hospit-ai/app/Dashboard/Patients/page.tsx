import SideBar from "@/app/components/SideBar/SideBar"
import TablaPacientes from "@/app/components/TablaPacientes/TablaPacientes"

interface Patient{
  userId: number;
  id: number;
  title: string;
  // completed: boolean;
  // pulse: number;
}

const page = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/albums');
  const patients: Patient[] = await res.json();
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

          <TablaPacientes
            data = {patients}
          />
        </div>

    </div>
  )
}

export default page