import { React, useState } from "react";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddToQueueIcon from "@material-ui/icons/AddToQueue";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import ListIcon from "@material-ui/icons/List";
import { ListItemIcon, ListItemText, MenuItem } from "@material-ui/core";
import Profile from "./Profile";
import CalendarPage from "./CalendarPage";
import CreateNewProject from "./CreateNewProject";
import MyProjects from "./MyProjects";
import { fire, db } from "../helpers/db";
import firebase from "firebase";

function MainListItems(props) {
  const user = fire.auth().currentUser;
  //State used to set different pages (components) when buttons on left bar are clicked
  const [selected, setSelected] = useState(2);

  //Passed down as props to CreateNewProject, to store title in firestore
  const handleProjTitle = (title) => {
    db.collection("users")
      .doc(user.uid)
      .collection("projects")
      .doc(user.uid)
      .update({
        proj: firebase.firestore.FieldValue.arrayUnion({ description: title }),
      });
  };

  return (
    <div>
      <MenuItem
        button
        onClick={() => {
          setSelected(1);
          props.setPages(<Profile />);
          props.setTitles("Profile");
        }}
        selected={selected === 1}
      >
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </MenuItem>

      <MenuItem
        button
        onClick={() => {
          setSelected(2);
          props.setPages(<CalendarPage />);
          props.setTitles("My Calendar");
        }}
        selected={selected === 2}
      >
        <ListItemIcon>
          <CalendarTodayIcon />
        </ListItemIcon>
        <ListItemText primary="My Calendar" />
      </MenuItem>

      <MenuItem
        button
        onClick={() => {
          setSelected(3);
          props.setPages(<CreateNewProject setProjTitle={handleProjTitle} />);
          props.setTitles("Create New Project");
        }}
        selected={selected === 3}
      >
        <ListItemIcon>
          <AddToQueueIcon />
        </ListItemIcon>
        <ListItemText primary="Create New Project" />
      </MenuItem>

      <MenuItem
        button
        onClick={() => {
          setSelected(4);
          props.setPages(<MyProjects />);
          props.setTitles("My Projects");
        }}
        selected={selected === 4}
      >
        <ListItemIcon>
          <ListIcon />
        </ListItemIcon>
        <ListItemText primary="My Projects" />
      </MenuItem>
    </div>
  );
}

export default MainListItems;
