import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //we are store the videos which i want to watch later (this video is collected from UI and by reducer state to save into state of store and action to payload collected from UI)
  videos: [],
  videosCount: 0,
};

const videoSlicer = createSlice({
  name: "video",
  initialState,
  videos:[],
  //This is an object containing various action handler functions, known as reducer functions, that modify the st
  reducers: {
    //addToViewLater(action): This is the name of one particular reducer . It's used to define what happens when an action (likely dispatched elsewhere in your app) with the type addToViewLater is triggered.
    addToViewLater: (state, action) => {

      //state.videos.push(action.payload): This line updates the videos array inside the state by adding a new video to the array.
      //action.payload contains the video (or whatever data you're adding) that is being passed when the action is dispatched.
      state.videos.push(action.payload);


      //how many video is store that is show in the array , is definend here.
      state.videosCount = state.videos.length;
    },
  },
});


//addToViewLater action creator from the videoSlicer object and exports it for use elsewhere in your application.// Exporting the actions created by `createSlice`
export const {addToViewLater} = videoSlicer.actions;


// Exporting the reducer to be used in the store.
export default videoSlicer.reducer;

//How Redux Works???????????????
// Action Dispatch: Somewhere in your application, you dispatch an action to modify the state (e.g., when a user clicks "Add to Watch Later").
// Reducer: The dispatched action triggers the corresponding reducer. In this case, the addToViewLater reducer is invoked.
// State Update: The reducer updates the state based on the action's payload (the video to be added to the "Watch Later" list).
// React (or your front-end framework) will then re-render based on the new state, reflecting the updates in the UI.