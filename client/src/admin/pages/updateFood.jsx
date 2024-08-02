import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { Link, useParams } from "react-router-dom";

const UpdateFood = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // fetch all category data
  useEffect(() => {
    const fetchdata = async (res, req) => {
      await axios
        .get("http://localhost:3001/api/category")
        .then((res) => setCategory(res.data))
        .catch((err) => alert(err));
    };
    fetchdata();
  }, []);

  // fetch all food data
  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/food/${id}`
        );
        const { name, category_id, price, description, image } = response.data;
        setName(name);
        setSelectedCategory(category_id);
        setPrice(price);
        setDescription(description);
        setImage(image);
        // console.log(response.data);
      } catch (err) {
        setError("Failed to fetch food data.");
      }
    };
    fetchFood();
  }, [id]);

  const handleForm = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setError("");

    let form = e.target;
    let formData = new FormData(form);

    try {
      const response = await axios.put(
        `http://localhost:3001/api/food/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setSuccess("Food Updated successfully");
        setTimeout(() => {
          window.location.href = "/food";
        }, 2000);
      } else {
        alert(response.statusText);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.msg);
      } else {
        setError("server error...");
      }
    }
  };

  return (
    <>
      <Header />
      <main id="main" className="main">
        <div className="pagetitle">
          Edit Food
          <Link className="btn btn-dark btn-sm float-end" to="/food">
            <span>Back</span>
          </Link>
        </div>
        <hr />
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleForm}>
              {error && <div className="mt-3 alert alert-danger">{error}</div>}
              {success && (
                <div className="mt-3 alert alert-success">{success}</div>
              )}

              <div className="row">
                <div className="col-md-6">
                  <label className="form-label mt-3">Food Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter Food Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label mt-3">Food Category</label>
                  <select
                    name="category_id"
                    id=""
                    className="form-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {category.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <label className="form-label mt-3">Food Price</label>
                  <input
                    type="text"
                    name="price"
                    className="form-control"
                    placeholder="Enter Food Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label mt-3">Food Description</label>
                  <input
                    type="text"
                    name="description"
                    className="form-control"
                    placeholder="Enter Food Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col">
                  <label className="form-label mt-3">Food Image</label>
                  <img
                    src={`http://localhost:3001/uploads/${image}`}
                    alt={name}
                    style={{ width: "100px", height: "100px" }}
                    className="mx-3"
                  />
                  <input
                    type="file"
                    name="image"
                    id=""
                    className="mt-4 form-control"
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col">
                  <button type="submit" className="btn btn-dark">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default UpdateFood;
