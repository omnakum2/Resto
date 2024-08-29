import React, { useState } from "react";
import AdminProfile from "./Profile";
import EditProfile from "./EditProfile";
import { Link } from "react-router-dom";

function Setting() {
  const [profile, setProfile] = useState(true);
  const [password, setPassword] = useState();
  const [editProfile, setEditProfile] = useState();

  const handleEdit = () => {
    setProfile(false);
    setPassword(false);
    setEditProfile(true);
  };

  const handlePasswordClick = () => {
    setProfile(false);
    setEditProfile(false);
    setPassword(true);
  };
  
  return (
    <div>
      <main id="main" className="main">
        <div className="pagetitle">
          Settings
          <Link
            className="adminbtn text-decoration-none adminbtn-dark adminbtn-sm float-end"
            to="/admin"
          >
            <span>Back</span>
          </Link>
        </div>
        <hr />
        <div className="navbar navbar-expand-lg navbar-light">
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <p className="nav-link" onClick={handleEdit}>
                  Edit Profile
                </p>
              </li>
              <li className="nav-item">
                <p className="nav-link" onClick={handlePasswordClick}>
                  Change Password
                </p>
              </li>
            </ul>
          </div>
        </div>
        {profile && <AdminProfile />}
        {editProfile && <EditProfile />}
        {password && <div>Change Password....</div>}
      </main>
    </div>
  );
}

export default Setting;
