import React, { Component } from "react";
import AuthActions from "../../Store/Actions/AuthActions";
import { connect } from "react-redux";
import NavBar from "../../Component/NavBar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { openDrawer: false };
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.user) {
      this.props.history.replace("/");
    }
  }
  toggleDrawer = open => {
    this.setState({ openDrawer: open });
  };
  listHandler = text => {
    if (text == "Home") {
      this.props.history.replace("/home");
    } else if (text == "Donate Blood") {
      this.props.history.replace("/donor");
    } else {
      console.log("from" + text);
      this.props.history.replace("/needer");
    }
  };
  render() {
    return (
      <div>
        <NavBar
          openDrawer={this.state.openDrawer}
          toggleDrawer={this.toggleDrawer}
          listHandler={this.listHandler}
          userName={this.props.user?this.props.user.displayName:""}
          signOut={this.props.signOutUser}
        />

       
        <Grid
          container
          direction="row"
          justify="center"
          style={{ padding:50,  }} 
        >
          <Grid item xs={1}  >
            <Button
              variant="contained"
              size="large"
              color="primary"
              style={{ backgroundColor: "#EF5350" ,fontWeight:"bold"}}
              onClick={() => {
                this.props.history.replace("/donor");
              }}
            >
              Donate Blood
            </Button>
          </Grid>




        </Grid>




        <Grid
          container
          direction="row"
          justify="center"
          style={{padding:50, }}
        >
          <Grid item xs={1}>
            <Button
              variant="contained"
              size="large"
              color="primary"
              style={{ backgroundColor: "#E040FB",fontWeight:"bold" }}
              onClick={() => {
                this.props.history.replace("/needer");
              }}
            >
              Find Donor
            </Button>
          </Grid>
        </Grid>

        
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log(state);
  return {
    user: state.AuthReducer.user,
    isLoading: state.AuthReducer.isLoading,
    isError: state.AuthReducer.isError,
    errorMsg: state.AuthReducer.errorMsg
  };
};
const mapDispatchToProps = dispatch => {
  return {
    signOutUser: () => {
      return dispatch(AuthActions.SignOutUser());
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
