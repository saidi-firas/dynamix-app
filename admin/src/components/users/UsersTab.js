import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DeleteForever } from "@mui/icons-material";
import { format } from "timeago.js";
import axios from "axios";

const UsersTab = ({ users }) => {
  const userInfoString = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(userInfoString);
  const token = userInfo.token;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: userInfo ? `Bearer ${token}` : undefined,
    },
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://backend-pfe.onrender.com/userdell/${id}`,
        config
      );
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 100,
      valueFormatter: (params) => {
        return format(params.value);
      },
    },
    {
      field: "name",
      headerName: "Name",
      sortable: true,
      width: 100,
    },
    {
      field: "email",
      headerName: "Email",
      sortable: true,
      width: 170,
    },
    {
      field: "isAdmin",
      headerName: "Type",
      sortable: false,
      filterable: false,
      width: 100,
      renderCell: (params) => {
        return (
          <div>
            {params.row.isAdmin === true ? (
              <p className="m-0">Admin</p>
            ) : (
              <p className="m-0">Customer</p>
            )}
          </div>
        );
      },
    },

    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      filterable: false,
      width: 100,
      renderCell: (params) => {
        return (
          <div>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(params.row._id)}
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
        width: "100%",
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
          Users LIST{" "}
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

export default UsersTab;
