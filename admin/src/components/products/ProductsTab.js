import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Visibility, DeleteForever } from "@mui/icons-material";
import { format } from "timeago.js";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../Redux/Actions/ProductActions";

const ProductsTab = ({ products }) => {
  const dispatch = useDispatch();

  const handleDelete = (productId) => {
    if (window.confirm("Are you sure??")) {
      dispatch(deleteProduct(productId));
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "image",
      headerName: "Image", // Rename the header to something more generic
      width: 20,
      renderCell: (params) => {
        return (
          <div>
            <img className="productListImg" src={params.row.image} alt="" />
          </div>
        );
      },
    },
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
      field: "price",
      headerName: "Price",
      sortable: true,
      width: 70,
    },
    {
      field: "color",
      headerName: "Color",
      sortable: true,
      width: 140,
    },
    {
      field: "categories",
      headerName: "Categories",
      sortable: true,
      width: 140,
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
              to={`/product/${params.row._id}/edit`}
              className="btn btn-primary btn-sm"
            >
              <Visibility /> Display
            </Link>
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
          Products List{" "}
        </h1>

        {products && (
          <DataGrid
            sx={{ bgcolor: "white ", height: "80vh" }}
            rows={products}
            getRowId={(row) => row._id}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        )}
      </Box>
    </Box>
  );
};

export default ProductsTab;
