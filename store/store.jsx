import { configureStore } from "@reduxjs/toolkit";
//globally we store the data by configureStore

//videoSlicer is managing a part of the global state related to videos (for example, adding videos to a "Watch Later" list, as seen earlier).
import videoSlicer from "../slicers/video-slicers";

//The configureStore function is a utility provided by Redux Toolkit to easily set up the Redux store.It automatically includes some best practices and defaults, like enabling Redux DevTools, and helps in reducing boilerplate code compared to the traditional createStore method.
export default configureStore({ 
  // it is comprise the what action like watch later , that to store .
  reducer:{store:videoSlicer}
})