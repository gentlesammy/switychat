// import {useEffect} from "react";
import { Button } from "@material-ui/core";
import "./Styles/Login.css";
// import { auth } from "../firebase/firebase";
import { useDispatch } from "react-redux";
import { auth, provider } from "../firebase/firebase";
import { login } from "../features/appSlice";
const Login = () => {
  const dispatch = useDispatch();
  const login = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch(
          login({
            username: result.user.displayName,
            profilePic: result.user.photoURL,
            id: result.user.uid,
          })
        );
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <div className="login_container">
      <div className="top">
        <h1>SwitYChat</h1>
        <p>Snapchat Clone from Sam-Odunlade</p>
      </div>
      <div className="middle">
        <Button variant="outlined" color="primary" onClick={login}>
          Login With Google
        </Button>
      </div>
      <footer>
        <p>(C) Sam With Yemi Chat</p>
      </footer>
    </div>
  );
};

export default Login;
