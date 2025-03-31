import { Link } from "react-router-dom";

export function HomePageVideo(){
  return(
    <div className="d-flex justify-content-center align-items-center" style={{height:'100vh'}}>
       
      {/* in home page we create two button link when we click , it redirect that adminlogin and userlogin page */}

      <Link className="btn btn-primary m-2" to="/admin-login">Admin Login</Link>

      <Link className="btn btn-warning m-2" to="/user-login">User Login</Link>
    </div>
  )
}