import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom'
import Footer from "../../Footer";
import Header from "../Home/Header";
import MetaData from "../../more/Metadata";
import Loading from "../../more/Loader";
import "./Profile.css";
import BottomTab from "../../more/BottomTab";
import { logout } from "../../actions/userAction";
import { toast } from 'react-toastify';

const Profile = ({history }) => {

const { user, loading, isAuthenticated } = useSelector((state) => state.user);

useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);

  const dispatch = useDispatch();

  function logoutUser() {
    dispatch(logout());
    toast.success("Logout Successfully");
  }
  

    return (
        <>
       {loading ? (<Loading />):(
        <>
        <Header />
        <div>
            <MetaData title={`${user.name}'s profile`} />
            <div className="profileContainer" >
                <div style={{
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"center",
                    flexDirection:"column"
                }}>
                    <h1 style={{
                        fontFamily: "Poppins,sans-serif",opacity:"1",
                        fontSize:"2vmax"
                    }}>My Profile</h1>
                    {/* <img src={user.avatar.url} alt={user.name} className="profile__img" /> */}
                    <img className="profile__img" src={user.avatar.url}
                alt={user.name}/>
                    <Link to="/me/update/info" className="edit__profile" style={{margin:"0 0 0 -70px", color:"teal"}}>Edit Profile</Link>
                </div>
            </div>
            <div className="information">
                <div className="middle">
            <div className="info">
                <h4 style={{
                    padding:"0px 5px"
                }}>Full Name:</h4>
                <p>{user.name}</p>
            </div>
            <div className="info">
                <h4 style={{
                    padding:"0px 5px"
                }}>Email:</h4>
                <p>{user.email}</p>
            </div>
            <div className="info">
                <h4 style={{
                    padding:"0px 5px"
                }}>Contact:</h4>
                <p>{user.mobile}</p>
            </div>
            <div className="info">
            <h4 style={{
                    padding:"0px 5px"
                }}>Joined On:</h4>
            <p>{String(user.createdAt).substr(0,10)}</p>
            </div> 
            
               
              <div className="change__info">
                  <Link to="/orders" className="settings">My Orders</Link>
                  <Link to="/me/update" className="settings">Change Password</Link>
                  <button onClick={logoutUser} className="buttonlg">LOGOUT</button>
              </div>
        </div>  
        </div>
        </div>
        <Footer />
        <BottomTab />
        </>
       )}
       </>
    )
}

export default Profile
