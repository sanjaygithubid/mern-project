import axios from "axios"
import { useEffect, useState } from "react"
import { data, useNavigate, useParams } from "react-router-dom"


export function AdminDeleteVideo(){

  const[videoData , setVideoData] = useState([]);

  // no the basics of parameter to access data fron dashboard to for delete 
  let params = useParams();

  // naviget to dashbord after delete 
  const navigate = useNavigate();


  // geting video by fetch method to get data load on page and store in useState() hook 

  useEffect(()=>{
      axios.get(`http://127.0.0.1:3040/get-video/${params.id}`).then(response=>{
        setVideoData(response.data)
        console.log(response.data)
      })
  },[params.id])


  // now i will write function of handel click of button to be delete. 
    function handelDeleteClick(){
      axios.delete(`http://127.0.0.1:3040/delete-video/${params.id}`).then(response=>{
          navigate("/admin-dashboard")
          alert("Are you sure to delete video?")
      })
    }

// delete cancel click 
function handelCancelClick(){
  navigate("/admin-dashboar")
}


  return(
    <div className="w-50 bg-light m-1 p-3">
      <h3 className="text-warning">Are you sure to Delete Video?</h3>
      
        <div>
          <p>Video Title : {}</p>
          <p>Video Id:{}</p>
        </div>

          <button className="btn btn-success me-4 ps-3 pe-3" onClick={handelDeleteClick}>Yes</button>
          <button className="btn btn-danger ps-3 pe-3" onClick={() => window.history.back()}>No</button>

    </div>
  )
}