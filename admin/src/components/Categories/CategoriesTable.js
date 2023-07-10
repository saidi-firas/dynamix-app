import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CategoriesTable = () => {
  const [cat, setCat] = useState([]);
  useEffect(() => {
    const fetchCat = async () => {
      try {
        const res = await axios.get(
          "https://backend-pfe.onrender.com/allcategories"
        );
        setCat(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCat();
  }, []);
  return (
    <div className="col-md-12 col-lg-8">
      <table className="table">
        <thead>
          <tr>
            <th>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" />
              </div>
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th className="text-end">Action</th>
          </tr>
        </thead>
        {/* Table Data */}
        <tbody>
          {cat.map((item, index) => (
            <tr key={item}>
              <td>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                  />
                </div>
              </td>
              <td>{index + 1}</td>
              <td>
                <b>{item.toUpperCase()} </b>
              </td>
              <td> {item + " clothes"}</td>
              <td className="text-end">
                <div className="dropdown">
                  <Link
                    to="#"
                    data-bs-toggle="dropdown"
                    className="btn btn-light"
                  >
                    <i className="fas fa-ellipsis-h"></i>
                  </Link>
                  <div className="dropdown-menu">
                    <Link className="dropdown-item" to="#">
                      Edit info
                    </Link>
                    <Link className="dropdown-item text-danger" to="#">
                      Delete
                    </Link>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesTable;
