import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
import Calendar from "../calendar/Calendar";

function InvoiceScreen() {
  const [layout, setLayout] = useState(true);

  const handleLayoutSwitch = () => {
    setLayout(!layout);
  };

  return (
    <>
      {layout ? (
        <>
          <Sidebar />

          <main className="main-wrap">
            <Header />
            <button
              style={{ marginTop: "7px" }}
              className="bg-green-500 ml-5 text-white font-bold py-2 px-8 rounded hover:bg-blue-600 hover:text-white transition-all duration-150 hover:ring-4 hover:ring-blue-400"
              onClick={handleLayoutSwitch}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                {layout && <div>Full-Screen</div>}
                <AiOutlineFullscreen
                  style={{ fontSize: "1.2rem", marginLeft: "5px" }}
                />
              </div>
            </button>

            <Calendar />
          </main>
        </>
      ) : (
        <>
          <button
            style={{ marginTop: "7px" }}
            className="bg-blue-500 ml-5 text-white font-bold py-2 px-8 rounded hover:bg-green-600 hover:text-white transition-all duration-150 hover:ring-4 hover:ring-blue-400"
            onClick={handleLayoutSwitch}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              {!layout && <div>Windowed</div>}
              <AiOutlineFullscreenExit
                style={{ fontSize: "1.2rem", marginLeft: "5px" }}
              />
            </div>
          </button>

          <Calendar />
        </>
      )}
    </>
  );
}

export default InvoiceScreen;
