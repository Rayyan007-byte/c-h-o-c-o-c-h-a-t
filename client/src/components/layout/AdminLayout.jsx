import { Navigate } from "react-router-dom";
import Sidebar from "../../pages/admin/Sidebar";
import MobileSidebar from "../navbar/MobileSidebar";

const isAdmin = true;
const AdminLayout = ({ children }) => {
  if (!isAdmin) return <Navigate to="/admin" />;
  return (
    <>
      <MobileSidebar />

      <div className="border grid grid-cols-12 min-h-screen bg-gray-500">
        <aside className="border-r hidden md:col-span-3 md:block bg-white/15 backdrop-blur-xl">
          <Sidebar />
        </aside>

        <main className="col-span-12 md:col-span-9">{children}</main>
      </div>
    </>
  );
};

export default AdminLayout;
