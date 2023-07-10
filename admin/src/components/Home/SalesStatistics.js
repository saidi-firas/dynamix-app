import React from "react";

const SaleStatistics = () => {
  return (
    <div className="col-xl col-lg-12">
      <iframe
        title="sales"
        style={{
          background: "#FFFFFF",
          border: "none",
          borderRadius: "2px",
          boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2);",
          width: "100%",
          height: "550px",
        }}
        src="https://charts.mongodb.com/charts-project-0-lvhiy/embed/dashboards?id=6472b9b6-0e58-4f09-8a29-e4e109865cdb&theme=light&autoRefresh=true&maxDataAge=60showTitleAndDesc=false&scalingWidth=scale"
      ></iframe>
    </div>
  );
};

export default SaleStatistics;
