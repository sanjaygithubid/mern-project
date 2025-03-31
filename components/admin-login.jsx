import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";

export function AdminLogin() {
  let navigate = useNavigate();

  //we ues FORMIK hook to this form data case
  const formik = useFormik({
    initialValues: {
      userid: "",
      password: "",
    },

    onSubmit: (admin) => {
      //the admin details of above from FORM body is match or not , to  the database data. that database data will be collected by Fetch()/Axios()  from  url-router(http://127.0.0.1:3040/get-admin), if this data is in the database and checked/test by postman.

      axios
        .get("http://127.0.0.1:3040/get-admin")
        .then((response) => {
          //here multiple user of all in Array[],so we need specific user are to filter/find method to get specific user data. its return to the user if matching and else
          var user = response.data.find((item) => item.userid === admin.userid);
          console.log(user);
          if (user) {
            if (admin.password === user.password) {
              window.confirm("successfully login");
              navigate("/admin-dashboard");
            } else {
              alert("invalid password");
            }
          } else {
            alert("invalid userid");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //hre in validation variablr(formdata) collect all data from form-body and store it. if other/not there ,then through error we display  in below .
    validate: (formdata) => {
      // in this error we store all error data 
      const errors = {};
      if (formdata.userid.length === 0) {
        errors.userid = "userid requird";
      }

      if (formdata.password.length === 0) {
        errors.password = "password requird";
      }
      return errors;
    },
  });

  return (
    <div className=" bg-light p-4 m-4 w-25">
      <h2 className="mb-4">Admin Login</h2>

      {/* go to admin login page and formik react logic to be create by collect data from FORM body and match it with data base  , so write logice */}

      {/* in admin page , admin user is login this data of form-body will be match with same tbladmin collection data in mongodb must be equal , then only login success to open a new admin-dashbord page*/}

      {/* through API of "/get-admin" API-router, we can access the data from database to verify and matching the data , then we goto dashboard  */}

      {/* so onloginclick event , collect the adminid and password and verify it, if match it ,then login success and enter to new page dashbord */}
      <form onSubmit={formik.handleSubmit}>
        <dl>
          <dt>Admin Id</dt>
          <dd>
            <input
              type="text"
              className="form-control"
              onChange={formik.handleChange}
              name="userid"
            />
          </dd>
          {/* this is errors validate */}
          <dd className="text-danger">{formik.errors.userid}</dd>

          <dt>Password</dt>
          <dd>
            <input
              type="text"
              className="form-control"
              name="password"
              onChange={formik.handleChange}
            />
          </dd>
          {/* this is formik errors of validate */}
          <dd className="text-danger">{formik.errors.password}</dd>
        </dl>
        <button type="submit" className="btn btn-warning w-100">
          Login
        </button>
        <Link to="/" className="mt-4">
          Back to Home
        </Link>
      </form>
    </div>
  );
}
