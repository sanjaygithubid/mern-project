import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export function UserLogin() {
  const navigate = useNavigate();
  
  // Initialize cookies for the username.
  const [cookies, setCookies, removeCookies] = useCookies(['username']);

  // Formik for handling form validation and submission.
  const formik = useFormik({
    initialValues: {
      userid: "",
      password: "",
    },
    
    // Handle form submission.
    onSubmit: (user) => {
      axios
        .get("http://127.0.0.1:3040/get-users")
        .then((response) => {
          const result = response.data.find(item => item.userid === user.userid);
          
          if (result) {
            if (result.password === user.password) {
              // Set username cookie if login is successful.
              setCookies('username', result.username.toUpperCase());
              navigate("/user-dashboard");
            } else {
              alert("Invalid password");
            }
          } else {
            alert("Invalid Userid");
          }
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
          alert("There was an error with the login request.");
        });
    },

    // Form validation logic.
    validate: (formData) => {
      const errors = {};
      if (formData.userid.length === 0) {
        errors.userid = "UserId required";
      }
      if (formData.password.length === 0) {
        errors.password = "Password required";
      } else if (formData.password.length <= 4) {
        errors.password = "Password is too short";
      } else if (formData.password.length >= 15) {
        errors.password = "Password is too long";
      }
      return errors;
    },
  });

  return (
    <div className="bg-light m-1 p-3 w-50">
      <h3>User Login Page</h3>
      <form onSubmit={formik.handleSubmit}>
        <dl>
          <dt>User Id</dt>
          <dd>
            <input
              type="text"
              name="userid"
              onChange={formik.handleChange}
              value={formik.values.userid}
            />
          </dd>
          <dd className="text-danger">
            {formik.touched.userid && formik.errors.userid}
          </dd>

          <dt>Password</dt>
          <dd>
            <input
              type="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </dd>
          <dd className="text-danger">
            {formik.touched.password && formik.errors.password}
          </dd>
        </dl>
        <button type="submit" className="btn btn-success me-4">
          Login
        </button>
        <Link to="/user-register">New User Register</Link>
      </form>
    </div>
  );
}
