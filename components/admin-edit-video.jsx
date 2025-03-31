import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// This React component allows the admin to edit a video within an admin dashboard. The form fetches the details of a specific video using its ID, displays the current values, allows the admin to modify them, and then updates the video on the backend when the form is submitted.

export function AdminEditVideo() {
  // categories to track in formick to be collect and want to modify
  const [categories, setCategories] = useState([]);

  // details video we want to edite that video details we get from (video-Router-API) as ARRAY Details. on loading that fetch the data from api and store in this useState() hook
  const [videoDetails, setVideoDetails] = useState([
    {
      videoid: 0,
      title: "",
      url: "",
      description: "",
      likes: 0,
      dislike: 0,
      views: 0,
      comments: "",
      categoryid: 0,
    },
  ]);

  // specifice video data collected of it id by useParams() from the edit-button , when it click. its crate a url in this to fetch the data when on loading.
  let params = useParams();

  const navigate = useNavigate();

  // in this edite-video form to be edite by useformik() that collect the form data by url-api and want to modify
  const formik = useFormik({
    initialValues: {
      videoid: videoDetails.videoid,
      title: videoDetails.title,
      url: videoDetails.url,
      description: videoDetails.description,
      likes: videoDetails.likes,
      dislike: videoDetails.dislike,
      views: videoDetails.views,
      comments: videoDetails.comments,
      categoryid: videoDetails.categoryid,
    },
    //for fatch data of get-video data are reinitialized current data in the form  , that data we will be edite.
    enableReinitialize: true,

    //this on sumit that from api based of parameter of id.
    onSubmit: (value) => {
      axios
        .put(`http://127.0.0.1:3040/edit-video/${params.id}`, value)
        .then(() => {
          alert(" edited video");
          navigate("/admin-dashboard");
        });
    },

    validate: () => {},
  });

  //when function trigger then data load
  function loadCategories() {
    axios.get("http://127.0.0.1:3040/get-categories").then((response) => {
      response.data.unshift({
        categoryid: 0,
        categoryname: "select category",
      });

      setCategories(response.data);
    });
  }

  // loading mounting data when function trigger
  useEffect(() => {
    loadCategories();

    //loading data from api by fetch by getting as url of video. so we get method we used to get details of data.by use of useParams() hook
    axios
      .get(`http://127.0.0.1:3040/get-video/${params.id}`)
      .then((response) => {
        console.log(response.data);
        setVideoDetails(response.data);
      });
  }, [params.id]);
  function handleSaveVideo() {
    console.log();
  }
  return (
    <div className="bg-light p-2">
      <h3>Edite video</h3>
      <form onSubmit={formik.handleSubmit}>
        <dl>
          <dt>Video Id</dt>
          <dd>
            <input
              type="number"
              onChange={formik.handleChange}
              value={formik.values.videoid}
              name="videoid"
              className="form-control"
            />
          </dd>

          <dt>title</dt>
          <dd>
            <input
              type="text"
              onChange={formik.handleChange}
              value={formik.values.title}
              name="title"
              className="form-control"
            />
          </dd>

          <dt>Url</dt>
          <dd>
            <input
              type="text"
              onChange={formik.handleChange}
              name="url"
              value={formik.values.url}
              className="form-control"
            />
          </dd>

          <dt>Description</dt>
          <textarea
            onChange={formik.handleChange}
            name="description"
            value={formik.values.description}
            className="form-control"
          ></textarea>

          <dt>Likes</dt>
          <dd>
            <input
              type="number"
              onChange={formik.handleChange}
              value={formik.values.likes}
              name="likes"
              className="form-control"
            />
          </dd>

          <dt>Dislikes</dt>
          <dd>
            <input
              type="number"
              onChange={formik.handleChange}
              value={formik.values.dislike}
              name="dislike"
              className="form-control"
            />
          </dd>

          <dt>Views</dt>
          <dd>
            <input
              type="number"
              onChange={formik.handleChange}
              name="views"
              value={formik.values.views}
              className="form-control"
            />
          </dd>

          <dt>Comments</dt>
          <dd>
            <input
              type="text"
              onChange={formik.handleChange}
              value={formik.values.comments}
              className="form-control"
              name="comments"
            />
          </dd>

          <dt> Category</dt>
          <dd>
            <select
              name="category"
              onChange={formik.handleChange}
              value={formik.values.categoryid}
              className="form-control"
            >
              {/* maping method used to dynamically display */}

              {categories.map((category) => (
                <option value={category.categoryid} key={category.categoryid}>
                  {category.categoryname}
                </option>
              ))}
            </select>
          </dd>
        </dl>
        <button type="submit" className="btn btn-success me-4" onClick={handleSaveVideo}>
          Save Video
        </button>
        <Link  className="btn btn-danger" to="/add-video">Cancle</Link>
      </form>
    </div>
  );
}
