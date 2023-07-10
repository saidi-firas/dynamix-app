import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";

function StatisticsScreen() {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />

        <iframe
          title="stat"
          style={{
            background: "#FFFFFF",
            border: "none",
            borderRadius: "2px",
            boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2);",
            width: "100%",
            height: "100vh",
          }}
          src="https://charts.mongodb.com/charts-project-0-lvhiy/embed/dashboards?id=64736199-0e58-47d6-8b8b-e4e109d1f9e3&theme=light&autoRefresh=true&maxDataAge=60&scalingWidth=scale&scalingHeight=scale"
        ></iframe>
      </main>
    </>
  );
}

export default StatisticsScreen;
