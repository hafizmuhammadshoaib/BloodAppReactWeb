import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/Inbox";
import Person from "@material-ui/icons/Person";
import Divider from "@material-ui/core/Divider";

export default class NavBar extends Component {
  
  render() {
    return (
      <div>
        <AppBar position="static" style={{ backgroundColor: "#E53935" }}>
          <Toolbar>
            <IconButton
              onClick={()=>this.props.toggleDrawer(true)}
              style={{
                marginLeft: -12,
                marginRight: 20
              }}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" style={{ flex: 1 }}>
              Blood App
            </Typography>
            <Button
              style={{ float: "right" }}
              color="inherit"
              onClick={this.props.signOut}
            >
              SignOut
            </Button>
          </Toolbar>
        </AppBar>

        <Drawer open={this.props.openDrawer} onClose={()=>this.props.toggleDrawer(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={()=>this.props.toggleDrawer(false)}
            onKeyDown={()=>this.props.toggleDrawer(false)}
          >
            <List component="nav">
              <ListItem>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <Typography variant="title" gutterBottom>
                  {this.props.userName}
                </Typography>
              </ListItem>
            </List>
            <Divider />
            {["Home", "Donate Blood", "Need Donor"].map(value => {
              return (
                <ListItem
                  onClick={() => {
                    this.props.listHandler(value);
                  }}
                >
                  <ListItemText primary={value} />
                </ListItem>
              );
            })}
          </div>
        </Drawer>
      </div>
    );
  }
}
