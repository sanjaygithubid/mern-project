import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function AdminDashboardPage() {
  let navigate = useNavigate();
  //so videos add track is by usestate() by admin user all details of video store in useState() hook and this is access my map method to display.
  const [videos, setVideos] = useState([
    {
      videoid: 0,
      title: "",
      url: "",
      description: "",
      likes: 0,
      dislikes: 0,
      views: 0,
      comments: [],
      categoryid: 0,
    },
  ]);

  // when loading the dasbord router its collect the video from database by fetching and render in useEffect() , and store to maintain in useState() hook. this video details used by <edite-video-compnent>  and  <add-video-component>
  useEffect(() => {
    axios.get("http://127.0.0.1:3040/get-videos").then((response) => {
      setVideos(response.data);
    });
  }, []);

 
  return (
    <div className="bg-light p-3 m-3 w-100">
      <h3>Admin Dashbord Page</h3>
      <div className="d-flex justify-content-between">
        {/* in dasboard we add a video , for this we use a FORM to fill it and collect the database as we add-video in dashboard  . here a button that naviget to the add form of video to be add*/}
        <Link to="/add-video" className="btn btn-success bi bi-camera-video">
          Add Video
        </Link>
        <Link className="btn btn-danger me-4" to="/">
          Sign Out
        </Link>
      </div>
      {/* here we add videos as tabular form by admin-user */}
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Title</th>
              <th>Preview</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody className="w-100">
            {videos.map((video) => (
              <tr key={video.videoid}>
                <td>{video.title}</td>

                <td>
                  {/* Embedded video */}
                  <iframe
                    src={video.url}
                    width="200px"
                    height="200px"
                    title={video.title} // Adding a title for accessibility
                  ></iframe>
                </td>

                {/* from this edit button of a specific video-id of current video details, when click this value of id will be get by useParams()  hook in edite component . this edite button link redirect to edit-componenet   {router path must equal to edite component path} */}
                <td>
                  <Link
                    to={`/edit-video/${video.videoid}`}
                    className="bi bi-pen-fill btn btn-warning me-3"
                  ></Link>
                  <Link
                   to={`/delete-video/${video.videoid}`}
                    className="bi bi-trash-fill btn btn-danger"
                  ></Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
