import { Publish } from "@mui/icons-material";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const AddPdfUser = () => {
  const [name, setName] = useState("");
  const [pdf, setPdf] = useState([]);
  const [client, setClient] = useState("");
  const [work, setWork] = useState("");
  const [brand, setBrand] = useState("");
  const history = useHistory();

  const upload = async (e) => {
    try {
      e.preventDefault();

      const data = new FormData();
      data.append("name", name);
      data.append("pdf", pdf[0]);
      data.append("client", client);
      data.append("work", work);
      data.append("brand", brand);

      const res = await fetch(`https://backend-pfe.onrender.com/api/pdfuser`, {
        method: "POST",
        body: data,
      });
      if (res.ok) {
        setName("");
        setPdf([]);
        setClient("");
        setWork("");
        setBrand("");
        window.alert("File uploaded successfully!");
        history.push("/pdfs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
        }}
        onSubmit={upload}
        encType="multipart/form-data"
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Client"
            value={client}
            onChange={(e) => {
              setClient(e.target.value);
            }}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Description"
            value={work}
            onChange={(e) => {
              setWork(e.target.value);
            }}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Brand"
            value={brand}
            onChange={(e) => {
              setBrand(e.target.value);
            }}
            className="form-control"
          />
        </div>
        <label htmlFor="pdffile">
          <Publish
            style={{
              width: "40px",
              height: "40px",
              cursor: "pointer",
              marginTop: "-38px",
            }}
          />
        </label>

        <div className="form-group">
          <input
            id="pdffile"
            type="file"
            filename="pdf"
            style={{ display: "none" }}
            className="form-control-file"
            onChange={(e) => {
              setPdf(e.target.files);
            }}
          />
        </div>

        <button
          style={{ marginTop: "-27px" }}
          className=" btn btn-info"
          type="submit"
          variant="primary"
        >
          Upload
        </button>
      </form>
    </>
  );
};

export default AddPdfUser;
