import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";

function addCategory() {
  return (
    <div>
      <Header />
      <main id="main" className="main">
        <div className="pagetitle">
          Add Categories
          <Link className="btn btn-dark btn-sm float-end" to="/admin/category">
            <span>Back</span>
          </Link>
        </div>
        <hr />
      </main>
    </div>
  );
}

export default addCategory;
