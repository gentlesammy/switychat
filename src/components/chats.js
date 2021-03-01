import { useState, useEffect } from "react";
import { Avatar, Input } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import ChatIcon from "@material-ui/icons/Chat";
import SearchIcon from "@material-ui/icons/Search";
import Chat from "./chat";
import { auth, db } from "../firebase/firebase";
import "./Styles/Chats.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, logout } from "../features/appSlice";
import { RadioButtonUncheckedOutlined } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { resetCameraImage } from "../features/cameraSlice";
import { resetSelectedImageSrc } from "../features/appSlice";

const Chats = () => {
  const [chatsPost, setChatsPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setChatsPost(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    setLoading(false);
  }, []);
  return (
    <div className="chat-container">
      {/* chat header */}
      <div className="chat_header">
        <Avatar
          src={user.profilePic}
          className="chats_avatar"
          onClick={() => auth.signOut()}
        />
        <div className="chat_search">
          <SearchIcon className="chat_search_icon" />
          <TextField
            className="chat_search_input"
            variant="outlined"
            placeholder="Friends"
          />
        </div>
        <ChatIcon />
      </div>
      <div className="chat_body">
        {
          //chats loading
          loading && (
            <div className="loading_box">
              <h1>Loading Chats ....</h1>
            </div>
          )
        }
        {
          //chats loaded
          chatsPost && (
            <div className="chats_list">
              {chatsPost.length > 0 && (
                <div className="chatses">
                  {chatsPost.map(
                    ({
                      id,
                      data: {
                        image,
                        username,
                        read,
                        timestamp,
                        profilePic,
                        readBy,
                      },
                    }) => {
                      return (
                        <Chat
                          key={id}
                          id={id}
                          username={username}
                          read={read}
                          image={image}
                          timestamp={timestamp}
                          profilePic={profilePic}
                          readBy={readBy}
                        />
                      );
                    }
                  )}
                </div>
              )}
            </div>
          )
        }
      </div>
      <RadioButtonUncheckedOutlined
        className="takePik_Icon"
        onClick={() => {
          dispatch(resetSelectedImageSrc());
          history.replace("/");
        }}
      />
    </div>
  );
};

export default Chats;
