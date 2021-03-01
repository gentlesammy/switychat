import { Avatar } from "@material-ui/core";
import StopRoundedIcon from "@material-ui/icons/StopRounded";
import ReactTimeago from "react-timeago";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setSelectedImageSrc } from "../features/appSlice";
import { db } from "../firebase/firebase";
import "./Styles/Chats.css";
import { useHistory } from "react-router-dom";
const Chat = ({ image, username, read, timestamp, profilePic, id, readBy }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();
  const openChat = () => {
    if (!read) {
      dispatch(setSelectedImageSrc(image));
      db.collection("posts").doc(id).set(
        {
          read: true,
          readBy: user.username,
        },
        { merge: true }
      );
      history.replace("/chat/detail");
    }
  };
  return (
    <div
      className={!read ? "single_chat clickable" : "single_chat  not_clickable"}
      onClick={openChat}
    >
      <Avatar src={profilePic} className="chat_avatar" />
      <div className="chat_detail">
        <h4>{username}</h4>
        <p>
          {!read ? "Tap to View" : `Read By ${readBy}`}- {"        "}
          <ReactTimeago date={new Date(timestamp).toUTCString()} />
        </p>
      </div>
      {!read && <StopRoundedIcon className="chat_unread_icon" />}
    </div>
  );
};

export default Chat;
