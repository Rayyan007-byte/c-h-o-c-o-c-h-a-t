import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { SocketProvider } from "./components/context/SocketContext";
import AppLayout from "./components/layout/AppLayout";
import Chat from "./pages/Chat";
import Group from "./pages/Group";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Main from "./pages/Main";
import MyProfile from "./pages/MyProfile";
import NewContact from "./pages/NewContact";

import AdminLogin01 from "./pages/admin/AdminLogin01";
import ChatManagement from "./pages/admin/ChatManagement";
import Dashboard from "./pages/admin/Dashboard";
import MessageManagement from "./pages/admin/MessageManagement";
import UserManagement from "./pages/admin/UserManagement";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const user = true;
const App = () => {
  return (
    <>
      <Toaster position="top-center" />

      <SocketProvider>
        <Routes>
          <Route element={<ProtectedRoute user={user} />}>
          <Route path="/chat/:id" element={<Chat />} />
          <Route path="/newcontact" element={<NewContact />} />
          <Route path="/group" element={<Group />} />
          <Route path="/app" element={<AppLayout />} />
          <Route path="/main" element={<Main />} />          
          <Route path="/me" element={<MyProfile />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          
        </Routes>
      </SocketProvider>

      <Routes>
        {/* <Route path="adminlogin" element={<AdminLogin />} /> */}
        <Route path="admin" element={<AdminLogin01 />} />
        <Route path="admin/dashboard" element={<Dashboard />} />
        <Route path="admin/users" element={<UserManagement />} />
        <Route path="admin/chats" element={<ChatManagement />} />
        <Route path="admin/messages" element={<MessageManagement />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  );
};

export default App;
