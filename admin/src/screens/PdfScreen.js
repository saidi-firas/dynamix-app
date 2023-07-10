import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import DataTable from "../pdfApp/DataTable";

const PdfScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <DataTable />
      </main>
    </>
  );
};

export default PdfScreen;
