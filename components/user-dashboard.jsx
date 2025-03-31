import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToViewLater } from "../slicers/video-slicers";
import store from "../store/store";

export function UserDashboard() {
  const [cookies, setCookies, removeCookies] = useCookies(["username"]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState([]);
  // const [filteredVideos, setFilteredVideos] = useState([]); // New state for filtered videos
  const [videos, setVideos] = useState([
    {
      videoid: 0,
      title: "",
      url: "",
      description: "",
      likes: 0,
      dislikes: 0,
      views: 0,
      comments: "",
      categoryid: 0,
    },
  ]);

  const navigate = useNavigate();

  //Returns the dispatch function from the Redux store.
  // and The dispatch function from the Redux store.
  let dispatch = useDispatch();

  function handleClickSaveToAddWatchLater(video) {
    alert("video add successfully....");
    dispatch(addToViewLater(video));
  }

  // we have to fetch the video details, and want to display as card form , when login click and load by useEffect()
  useEffect(() => {
    axios.get("http://127.0.0.1:3040/get-videos").then((response) => {
      // console.log(response.data)

      let filterVideo = response.data.filter(({ title }) => {
        return title.indexOf(searchTerm) >= 0;
      });
      setVideos(filterVideo);
    });
    axios.get("http://127.0.0.1:3040/get-categories").then((response) => {
      setCategory(response.data);
    });
  }, [videos, searchTerm]);

  function handleSearch(e) {
    setSearchTerm(e.target.value);
  }

  function handleChange(e) {
    axios
      .get(`http://127.0.0.1:3040/filter-videos/${e.target.value}`)
      .then((response) => {
        // setVideos(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        alert("cant not fetch data");
      });
  }

  return (
    <div className="bg-light p-2 m-1">
      {/* this cookies is collected user-login  details that saved in cookies is  to display in user-dashboard in the dashboard , which user have login it name.  */}
      <div>
        <div className="d-flex justify-content-between">
          <h3>
            <span className="text-success">{cookies["username"]}</span>{" "}
            <span>Login Dash-Board</span>
          </h3>

          <div>
            <button className="bi bi-download me-4 btn btn-warning">
              {/* (method) Store<{ store: { videos: never[]; videosCount: number; }; },
               UnknownAction, unknown>.getState(): {
                store: {
                  videos: never[];
                  videosCount: number;
                  };
                 }
                Reads the state tree managed by the store. */}
              {store.getState().store.videosCount}
              
            </button>
            <button className="btn btn-danger">Sign Out</button>
          </div>
        </div>

        {/* here we display video as card form that data will be collected from get-videos router/ api to display as map() */}
        <div className="row">
          <div className="col-2">
            <label name="name" className="form-lable fw-bold">
              Search Video
            </label>
            <div className="input-group mt-2 mb-4">
              <input
                type="text"
                name="name"
                onChange={handleSearch}
                className="form-control"
              />
              <button className="bi bi-search btn btn-warning"></button>
            </div>

            <label name="name" className="form-lable fw-bold mb-4">
              Select Category
            </label>
            <div>
              <select onChange={handleChange}>
                {category.map((item) => {
                  return (
                    <option key={item.categoryid} value={item.categoryid}>
                      {item.categoryname}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="col-10 ">
            <section
              className="mt-4 d-flex flex-wrap gap-3"
              style={{ width: "250px" }}
            >
              {videos.map((video) => (
                <div className="card m-2 p-2">
                  <div className="card-title">
                    <h4 className="text-center">{video.title}</h4>
                  </div>

                  <div className="card-body">
                    <iframe
                      src={video.url}
                      title={video.title}
                      frameborder="0"
                      width="200"
                      height="200"
                    ></iframe>
                  </div>

                  <div className="card-footer d-flex justify-content-between">
                    <span className="bi bi-eye-fill">{video.views}</span>
                    <span className="bi bi-heart-fill">{video.likes}</span>
                    <span className="bi bi-hand-thumbs-down">
                      {video.dislikes}
                    </span>
                  </div>
                  <div className="text-center ">
                    <button
                      onClick={handleClickSaveToAddWatchLater}
                      className="bi bi-download btn btn-danger"
                    ></button>
                  </div>
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

//   axios.get("http://127.0.0.1:3040/get-videos")
// .then(response => {
//   // setVideos(response.data)
//   let filtervideo = response.data.filter(({title}) => {
//     return title.indexOf(search) >= 0;
//   });
//   setVideos(filtervideo);
// });

// axios.get("http://127.0.0.1:3040/get-categories")
// .then(response=>{
//  setCategory([{categoryid:"",categoryname:"all category"},...response.data])
// })

// if(search===""){
//   setFilteredVideos(videos)
// }else{
//   const filtered = videos.filter(video=>video.title.toLocaleLowerCase.includes(search.toLocaleLowerCase())|| video.description.toLocaleLowerCase.includes(search.toLocaleLowerCase()));
//   setFilteredVideos(filtered)
// }

// // Filter videos based on both search and category
// useEffect(() => {
//   let filtered = videos;

//   // Filter by search term
//   if (searchTerm) {
//     filtered = filtered.filter(
//       (video) =>
//         video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         video.description.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }
// },[searchTerm, videos]

//   let x = parseInt(e.target.value);
//   if (x === 0) {
//     axios.get(`http://127.0.0.1:3040/get-videos`)
//       .then(response => {
//         setVideos(response.data);
//       });
//   } else {
//     axios.get(`http://127.0.0.1:3040/filter-video/${x}`)
//       .then(response => {
//         setVideos(response.data);
//       });
//   }
// // function for signout button to , then cookies to be remove and redirect to login page
// function handleClick() {
//   removeCookies("username");
//   navigate("/user-login");
