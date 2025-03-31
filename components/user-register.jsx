import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { useState } from "react";
export function UserRegister() {
  const [msg, setMsg] = useState();
  let navigate = useNavigate();

  console.log(msg);

  const formik = useFormik({
    initialValues: {
      userid: "",
      username: "",
      password: "",
      email: "",
      mobile: "",
    },

    onSubmit: (user) => {
      axios.post(`http://127.0.0.1:3040/register-user`, user);
      alert("User register successfully");
      setMsg("User successfully Register");
      navigate("/user-login");
    },

    validate: (formData) => {
      const errors = {};
      if (formData.userid.length === 0) {
        errors.userid = "userid requird";
      }
      if (formData.username.length === 0) {
        errors.username = "username requird";
      }
      // Password validation
      if (formData.password.length === 0) {
        errors.password = "Password required";

      } else if (formData.password.length < 5) {
        errors.password =
          "Password is too short";
      } else if (formData.password.length > 15) {
        errors.password =
          "Password is too long";
      }

      if (formData.email.length === 0) {
        errors.email = "email requird";
      }
      if (formData.mobile.length === 0) {
        errors.mobile = "mobile requird";
      }
      return errors;
    },
  });

  return (
    <div className="bg-light m-1 p-4 w-50 overflow-auto" style={{height:400}}>
      <h3>User Register page</h3>

      <form onSubmit={formik.handleSubmit}>
        <dl>
          <dt>User Id</dt>
          <dd>
            <input type="text" name="userid" onChange={formik.handleChange} />
          </dd>
          <dd className="text-danger">{formik.errors.userid}</dd>

          <dt>User Name</dt>
          <dd>
            <input type="text" onChange={formik.handleChange} name="username" />
          </dd>
          <dd className="text-danger">{formik.errors.username}</dd>

          <dt>Password</dt>
          <dd>
            <input
              type="password"
              onChange={formik.handleChange}
              name="password"
            />
          </dd>
          <dd className="text-danger">{formik.errors.password}</dd>

          <dt>Email</dt>
          <dd>
            <input type="text" onChange={formik.handleChange} name="email" />
          </dd>
          <dd className="text-danger">{formik.errors.email}</dd>

          <dt>Mobile</dt>
          <dd>
            <input type="text" onChange={formik.handleChange} name="mobile" />
          </dd>
          <dd className="text-danger">{formik.errors.mobile}</dd>
        </dl>
        <button type="submit" className="btn btn-warning me-4">
          Register
        </button>
        <Link to="/user-login">Existing User Login</Link>
      </form>
    </div>
  );
}
