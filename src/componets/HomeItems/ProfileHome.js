import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { setChangedPicture } from "../Security/ProfileSlice";
import { Satellite } from "@material-ui/icons";
import { setJWTToken, setUserAccount } from "../Security/JWTSlice";

const useStyles = makeStyles((theme) => ({
  profilePic: {
    width: theme.spacing(40),
    height: theme.spacing(40),
  },
  input: {
    display: "none",
  },
}));

const temp = "https://source.unsplash.com/random";
function ProfileHome() {
  const [image, setImage] = useState(temp);
  const classes = useStyles();
  const dispatch = useDispatch();
  //want to add profile pic portion to user model
  const profilePic = useSelector((state) => state.profile.profilePic);
  const user = useSelector((state) => state.token.userAccount);
  const handleProfileChange = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    // triggers when reader finishes reading selected file
    reader.onloadend = () => {
      setImage(reader.result);
      dispatch(
        setChangedPicture(reader.result)
        //save to database for reload
      );
      //we want to save this for when logging out?????
      storeProfilePicture(reader.result);
    };
    if (file !== undefined) {
      reader.readAsDataURL(file);
    }
  };

  const storeProfilePicture = (data) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
      },
      body: JSON.stringify({
        profilePicture: data,
        user: user,
      }),
    };
    fetch("http://localhost:8080/customer/updateProfilePicture", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        dispatch(setJWTToken(result));
        dispatch(setUserAccount(data.email));
      });
  };

  return (
    <div>
      <input
        accept="image/*"
        className={classes.input}
        id="icon-button-file"
        type="file"
        onChange={(e) => handleProfileChange(e)}
      />
      <label htmlFor="icon-button-file">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <Avatar alt={temp} src={profilePic} className={classes.profilePic} />
        </IconButton>
      </label>

      <div></div>
    </div>
  );
}

export default ProfileHome;
