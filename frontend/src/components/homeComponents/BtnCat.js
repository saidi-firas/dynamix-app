import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";

function BtnCat() {
  const [allCat, setAllCat] = useState([]);

  useEffect(() => {
    const fetchTopCat = async () => {
      try {
        const { data } = await axios.get(
          "https://backend-pfe.onrender.com/allcategories"
        );
        setAllCat(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTopCat();
  }, []);

  return (
    <>
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-bookmarks"
            viewBox="0 0 16 16"
          >
            <path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5V4zm2-1a1 1 0 0 0-1 1v10.566l3.723-2.482a.5.5 0 0 1 .554 0L11 14.566V4a1 1 0 0 0-1-1H4z" />
            <path d="M4.268 1H12a1 1 0 0 1 1 1v11.768l.223.148A.5.5 0 0 0 14 13.5V2a2 2 0 0 0-2-2H6a2 2 0 0 0-1.732 1z" />
          </svg>{" "}
          All Categories{" "}
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {allCat?.map((cat) => (
            <Link key={cat} className="dropdown-item" to={`/fill/${cat}`}>
              {cat.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default BtnCat;
