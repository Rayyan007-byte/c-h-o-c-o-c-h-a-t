import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
// import { AuthProvider } from "./components/context/AuthContext.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import "./index.css";
import { store } from "./redux/store.js";
// import { SocketProvider } from "./components/context/SocketContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {/* <Navbar /> */}
      <Provider store={store}>
        {/* <AuthProvider>
          <SocketProvider> */}
        <App />
        {/* </SocketProvider>
        </AuthProvider> */}
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
