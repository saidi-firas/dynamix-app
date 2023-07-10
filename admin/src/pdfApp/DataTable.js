import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Visibility, GetApp, DeleteForever } from "@mui/icons-material";
import { format } from "timeago.js";
import AddPdfUser from "./AddPdfUser";
import axios from "axios";
const DataTable = () => {
  const [users, setUsers] = useState([]);

  const handleDeletePdf = async (id) => {
    try {
      const response = await fetch(
        `https://backend-pfe.onrender.com/api/pdfuser/del/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        window.confirm("Do you want remove pdf ?");
        //  remove the deleted user from the state
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "https://backend-pfe.onrender.com/api/pdfuser"
        );
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  const handleDownload = (pdfUrl, filename) => {
    fetch(pdfUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(
          new Blob([blob], { type: "application/pdf" })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
      });
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 100,
      valueFormatter: (params) => {
        return format(params.value);
      },
    },
    {
      field: "avatar",
      headerName: "PDf",
      width: 20,
      // height :10,
      renderCell: (params) => {
        return (
          <div>
            <img className="productListImg" src={params.row.avatar} alt="" />
          </div>
        );
      },
    },
    { field: "name", headerName: "Name", width: 100 },

    {
      field: "client",
      headerName: "Client",
      width: 70,
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 100,
    },
    {
      field: "work",
      headerName: "Description",
      width: 100,
    },
    {
      field: "display",
      headerName: "Display",
      sortable: false,
      filterable: false,
      width: 120,
      renderCell: (params) => {
        return (
          <div>
            <a
              href={params.row.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
            >
              {" "}
              <Visibility /> Display
            </a>
          </div>
        );
      },
    },
    {
      field: "download",
      headerName: "Download",
      sortable: false,
      filterable: false,
      width: 140,
      renderCell: (params) => {
        return (
          <div>
            <button
              onClick={() => handleDownload(params.row.pdf, params.row.name)}
              className="btn btn-success"
            >
              <GetApp /> Download
            </button>
          </div>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      filterable: false,
      width: 120,
      renderCell: (params) => {
        return (
          <div>
            <button
              onClick={() => handleDeletePdf(params.row._id)}
              className="btn btn-danger"
            >
              <DeleteForever /> Delete
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box m="40px 0 0 0" className="datatable">
        <h1
          style={{
            textAlign: "center",
            paddingBottom: "5px",
            fontSize: "40px",
          }}
        >
          Add New pdf{" "}
        </h1>
        <hr style={{ color: "black" }}></hr>
        <AddPdfUser />
        <hr style={{ color: "black" }}></hr>
        <h1
          style={{
            textAlign: "center",
            paddingBottom: "5px",
            fontSize: "40px",
          }}
        >
          PDF LIST{" "}
        </h1>

        {users && (
          <DataGrid
            sx={{ bgcolor: "white ", height: "80vh" }}
            rows={users}
            getRowId={(row) => row._id}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        )}
      </Box>
    </Box>
  );
};

export default DataTable;
