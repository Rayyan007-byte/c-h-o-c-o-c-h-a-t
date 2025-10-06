import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Chat from "./pages/Chat";
import NewContact from "./pages/NewContact";
import Group from "./pages/Group";
import MyProfile from "./pages/MyProfile";
import { SocketProvider } from "./components/context/SocketContext";

const App = () => {
  return (
    <>
      <Toaster position="top-center" />

      <SocketProvider>
        <Routes>
          <Route path="/chat/:id" element={<Chat />} />
          <Route path="/newcontact" element={<NewContact />} />
          <Route path="/group" element={<Group />} />
          <Route path="/app" element={<AppLayout />} />
          <Route path="/main" element={<Main />} />

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/me" element={<MyProfile />} />

          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </SocketProvider>
    </>
  );
};

export default App;
