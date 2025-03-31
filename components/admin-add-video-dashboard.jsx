import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function AdminAddVideoDashboard() {
  const [categories, setCategories] = useState([
    { categoryid: 0, categoryname: "" }
  ]);

  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      videoid: 0,
      title: "",
      url: "",
      description: "",
      likes: 0,
      dislikes: 0,
      views: 0,
      comments: [],
      categoryid: 0
    },

    onSubmit: (video) => {
      axios.post("http://127.0.0.1:3040/add-video", video).then(() => {
        alert("Video added successfully...");
        navigate("/admin-dashboard");
      });
    },

    validate: (formData) => {
      const errors = {};
      // Video ID validation
      if (formData.videoid <= 0) {
        errors.videoid = "Video ID must be greater than 0.";
      }
      // Title validation
      if (formData.title.length === 0) {
        errors.title = "Title is required.";
      }
      // URL validation
      if (formData.url.length === 0) {
        errors.url = "URL is required.";
      }
      // Description validation
      if (formData.description.length > 500) {
        errors.description = "Description must not exceed 500 characters.";
      }
      // Likes, Dislikes, Views validation
      if (formData.likes < 0) {
        errors.likes = "Likes cannot be negative.";
      }
      if (formData.dislikes < 0) {
        errors.dislikes = "Dislikes cannot be negative.";
      }
      if (formData.views < 0) {
        errors.views = "Views cannot be negative.";
      }
      // Category validation
      if (formData.categoryid === 0) {
        errors.categoryid = "Please select a category.";
      }
      // Comments validation
      if (formData.comments.length === 0) {
        errors.comments = "At least one comment is required.";
      }

      return errors;
    },
  });

  useEffect(() => {
    axios.get("http://127.0.0.1:3040/get-categories").then((response) => {
      response.data.unshift({
        categoryid: 0,
        categoryname: "Select Category",
      });
      setCategories(response.data);
    });
  }, []);

  return (
    <div>
      <h3 className="bg-light p-2">
        Admin Add New Video to Dashboard by Form-Fill
      </h3>

      <form
        className="bg-light w-25 p-3 overflow-auto"
        style={{ height: "400px" }}
        onSubmit={formik.handleSubmit}
      >
        <h5> Add New Video Details</h5>
        <dl>
          <dt>Video Id</dt>
          <dd>
            <input
              type="number"
              className="form-control"
              name="videoid"
              onChange={formik.handleChange}
              value={formik.values.videoid}
            />
          </dd>
          <dd className="text-danger">{formik.errors.videoid}</dd>

          <dt>Title</dt>
          <dd>
            <input
              type="text"
              name="title"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.title}
            />
          </dd>
          <dd className="text-danger">{formik.errors.title}</dd>

          <dt>URL</dt>
          <dd>
            <input
              type="text"
              className="form-control"
              name="url"
              onChange={formik.handleChange}
              value={formik.values.url}
            />
          </dd>
          <dd className="text-danger">{formik.errors.url}</dd>

          <dt>Description</dt>
          <dd>
            <textarea
              name="description"
              className="form-control"
              cols="40"
              rows="4"
              onChange={formik.handleChange}
              value={formik.values.description}
            ></textarea>
          </dd>
          <dd className="text-danger">{formik.errors.description}</dd>

          <dt>Likes</dt>
          <dd>
            <input
              type="number"
              className="form-control"
              name="likes"
              onChange={formik.handleChange}
              value={formik.values.likes}
            />
          </dd>
          <dd className="text-danger">{formik.errors.likes}</dd>

          <dt>Dislikes</dt>
          <dd>
            <input
              type="number"
              className="form-control"
              name="dislikes"
              onChange={formik.handleChange}
              value={formik.values.dislikes}
            />
          </dd>
          <dd className="text-danger">{formik.errors.dislikes}</dd>

          <dt>Views</dt>
          <dd>
            <input
              type="number"
              className="form-control"
              name="views"
              onChange={formik.handleChange}
              value={formik.values.views}
            />
          </dd>
          <dd className="text-danger">{formik.errors.views}</dd>

          <dt>Comments</dt>
          <dd>
            <input
              type="text"
              className="form-control"
              name="comments"
              onChange={formik.handleChange}
              value={formik.values.comments}
            />
          </dd>
          <dd className="text-danger">{formik.errors.comments}</dd>

          <dt>Categories</dt>
          <dd>
            <select
              name="categoryid"
              className="form-select"
              onChange={formik.handleChange}
              value={formik.values.categoryid}
            >
              {categories.map((category) => (
                <option key={category.categoryid} value={category.categoryid}>
                  {category.categoryname}
                </option>
              ))}
            </select>
          </dd>
          <dd className="text-danger">{formik.errors.categoryid}</dd>
        </dl>

        <div className="d-flex justify-content-between mt-4">
          <button type="submit" className="btn btn-success ms-4">
            Add Video
          </button>
          <Link className="btn btn-danger me-4" to="/admin-dashboard">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
