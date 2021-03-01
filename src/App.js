import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import WebcamCapture from "./components/webcamCapture";
import Chats from "./components/chats";
import Detail from "./components/detail";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/appSlice";
import Login from "./components/login";
import { auth } from "./firebase/firebase";
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            username: authUser.displayName,
            profilePic: authUser.photoURL,
            id: authUser.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);
  return (
    <div className="App">
      {!user ? (
        <Login />
      ) : (
        <Router>
          <div className="app_body">
            <Switch>
              <Route exact path="/">
                <WebcamCapture />
              </Route>
              <Route exact path="/chats">
                <Chats />
              </Route>
              <Route exact path="/chat/detail">
                <Detail />
              </Route>
            </Switch>
          </div>
        </Router>
      )}
    </div>
  );
}

export default App;
