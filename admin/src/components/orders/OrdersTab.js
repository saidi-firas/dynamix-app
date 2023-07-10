import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Visibility } from "@mui/icons-material";
import { format } from "timeago.js";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const OrdersTab = (props) => {
  const { orders } = props;

  const columns = [
    { field: "_id", headerName: "ID", width: 180 },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 140,
      valueFormatter: (params) => {
        return format(params.value);
      },
    },
    {
      field: "user",
      headerName: "Client",
      sortable: false,
      width: 100,
      valueGetter: (params) => params.row.user?.name,
    },
    {
      field: "email",
      headerName: "Email",
      sortable: true,
      width: 190,
      valueGetter: (params) => params.row.user?.email,
    },

    {
      field: "isPaid",
      headerName: "Paid",
      width: 120,
      renderCell: (params) => {
        const isPaid = params.value;
        const paidDate = params.row.paidAt;

        if (isPaid) {
          const formattedDate = new Date(paidDate).toLocaleDateString("en-US");
          return (
            <div>
              <span style={{ color: "green" }}>Yes</span>
              <br />
              <span>{formattedDate}</span>
            </div>
          );
        } else {
          return (
            <div>
              <span style={{ color: "red" }}>No</span>
            </div>
          );
        }
      },
    },
    {
      field: "totalPrice",
      headerName: "Total",
      sortable: true,
      width: 140,
      valueFormatter: (params) => {
        return `${params.value}$`;
      },
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
            <Link
              to={`/order/${params.row._id}`}
              className="btn btn-primary btn-sm"
            >
              <Visibility /> Display
            </Link>
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
          ORDERS LIST{" "}
        </h1>

        {orders && (
          <DataGrid
            sx={{ bgcolor: "white ", height: "80vh" }}
            rows={orders}
            getRowId={(row) => row._id}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        )}
      </Box>
    </Box>
  );
};

export default OrdersTab;
