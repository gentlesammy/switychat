import { useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./Styles/ChatDetail.css";
import { useSelector, useDispatch } from "react-redux";
import { selectedImages, resetSelectedImageSrc } from "../features/appSlice";
import { useHistory } from "react-router-dom";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { resetCameraImage } from "../features/cameraSlice";
const Detail = () => {
  const selectedImage = useSelector(selectedImages);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (!selectedImage) {
      exit();
    }
  }, [selectedImage]);
  const exit = () => {
    dispatch(resetCameraImage());
    history.push("/chats");
  };
  return (
    <div className="chat_detail_container">
      <div className="img_container">
        <CloseRoundedIcon className="close_icon" onClick={exit} />
        <img
          src={selectedImage}
          alt="switychat"
          style={{ maxHeight: "400px", maxWidth: "250px" }}
        />
        <div className="chat_detail_timer">
          <CountdownCircleTimer
            isPlaying
            duration={12}
            strokeWidth={6}
            size={30}
            colors={[
              ["rgb(9, 2, 34)", 0.4],
              ["#150550", 0.4],
              ["#f11f1f", 0.4],
            ]}
          >
            {({ remainingTime }) => {
              if (remainingTime === 0) {
                {
                  exit();
                }
              }
              return remainingTime;
            }}
          </CountdownCircleTimer>
        </div>
      </div>
    </div>
  );
};

export default Detail;
