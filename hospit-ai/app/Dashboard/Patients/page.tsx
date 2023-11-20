import SideBar from "@/app/components/SideBar/SideBar"

const page = () => {
  return (
    <div className="flex flex-row">
        <SideBar />
        <div>Patients</div>
    </div>
  )
}

export default page