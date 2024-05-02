import Sidebar from "../components/Sidebar";

const DashboardPage = () => {
  return (
    <section className="bg-primary_gray flex  min-h-screen   ">
      <div
        className={`bg-primary_gray_light border-r  border-gray-600 w-60 flex flex-col justify-start py-8 px-4
        max-md:hidden
       max-h-screen sticky inset-0`}
      >
        <Sidebar />
      </div>
    </section>
  );
};

export default DashboardPage;
