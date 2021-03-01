import { useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectCameraImage, resetCameraImage } from "../features/cameraSlice";
import { selectUser } from "../features/appSlice";
import CloseIcon from "@material-ui/icons/Close";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import CreateIcon from "@material-ui/icons/Create";
import NoteIcon from "@material-ui/icons/Note";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import CropIcon from "@material-ui/icons/Crop";
import TimerIcon from "@material-ui/icons/Timer";
import SendIcon from "@material-ui/icons/Send";
import "./Styles/webcamCapture.module.css";
import { v4 as uuid } from "uuid";
import { db, storage } from "../firebase/firebase";

const WebcamCapture = () => {
  const [loading, setLoading] = useState(false);
  const user = useSelector(selectUser);
  const history = useHistory();
  var w = window.innerWidth;
  var h = window.innerHeight;
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const sendPost = () => {
    setLoading(true);
    const id = uuid();
    const uploadTask = storage.ref(`posts/${id}`).putString(image, "data_url");
    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.log(error);
        setLoading(false);
      },
      () => {
        //complete function
        storage
          .ref("posts")
          .child(id)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              image: url,
              username: user.username,
              read: false,
              profilePic: user.profilePic,
              readBy: null,
              timestamp: Date.now(),
            });
            setLoading(false);
            history.replace("/chats");
          });
      }
    );
  };
  const videoConstraint = {
    width: 250,
    height: 420,
    facingMode: "user",
  };
  const webcamRef = useRef(null);
  const capture = useCallback(() => {
    const imgsrc = webcamRef.current.getScreenshot();
    console.log("image yen", imgsrc);
    dispatch(selectCameraImage(imgsrc.data));
    setImage(imgsrc);
  }, [webcamRef]);
  //delete image from interface
  const deleteImage = () => {
    dispatch(resetCameraImage());
    setImage(null);
  };
  const CancelSnappingAction = () => {
    history.replace("/chats");
  };

  return (
    <div className="webcapture_box">
      {image && (
        <div className="img-boxes">
          <CloseIcon onClick={deleteImage} className="delete-icon" />
          <div className="preview_tools">
            <TextFieldsIcon />
            <CreateIcon />
            <CropIcon />
            <TimerIcon />
          </div>
          <img
            src={image}
            alt=""
            className={loading ? "loading" : "not-loading"}
            style={{ maxHeight: 400, maxWidth: 250 }}
          />
          <SendIcon
            fontSize="large"
            className="preview_send"
            onClick={sendPost}
          />
        </div>
      )}

      {image == null && (
        <div className="snapper">
          <CloseIcon
            onClick={CancelSnappingAction}
            className="cancel_photo_icon"
          />
          <Webcam
            audio={false}
            height={videoConstraint.height}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={videoConstraint.width}
            videoConstraints={videoConstraint}
            onClick={capture}
            className="Image-snapper"
          />
          <AddAPhotoIcon
            className="webCapture__button"
            onClick={capture}
            className="snapper-logo"
          />
        </div>
      )}
    </div>
  );
};

export default WebcamCapture;
