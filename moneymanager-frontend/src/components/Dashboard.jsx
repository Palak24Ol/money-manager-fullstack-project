import Menubar from "./Menubar.jsx";
import Sidebar from "./Sidebar.jsx";
import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";

const Dashboard = ({ children, activeMenu }) => {
  const { user } = useContext(AppContext);
  return (
    <div style={{ minHeight: "100vh", background: "#F7F2EB" }}>
      <Menubar activeMenu={activeMenu} />
      {user && (
        <div className="flex">
          <div className="max-[1080px]:hidden">
            <Sidebar activeMenu={activeMenu} />
          </div>
          <div className="grow mx-5 py-2">{children}</div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;