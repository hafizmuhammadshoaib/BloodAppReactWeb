import React, { Component } from "react";
import { connect } from "react-redux";
import DatabaseActions from "../../Store/Actions/DatabaseActions";
import NavBar from "../../Component/NavBar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import Icon from '@material-ui/icons/Send';
import Selector from '../../Component/Selector';
import AuthActions from "../../Store/Actions/AuthActions";
class Donor extends Component {
  constructor(props) {
    super(props);
    this.state = { numbInput: "", bloodGroupInput: "" };
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.user) {
      this.props.history.replace("/");
    }
  }
  inputHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
    
  };

  buttonHandler = () => {
    let donorInfo = {
      uid: this.props.user.uid,
      name: this.props.user.displayName,
      email: this.props.user.email,
      phoneNumber: this.state.numbInput,
      bloodGroup: this.state.bloodGroupInput
    };
    this.props.pushDonor(donorInfo);
    this.setState({ numbInput: "", bloodGroupInput: "", openDrawer: false });
  };
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
    console.log(this.state.bloodGroupInput);
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
          style={{ padding: 10 }}
        >
          <Grid item xs={8}>
            <TextField
              required
              fullWidth
              id="name"
              label="Name"
              className="nameInput"
              disabled={true}
              name="nameInput"
              margin="normal"
              value={this.props.user?this.props.user.displayName:""}
            />
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          style={{ padding: 10 }}
        >
          <Grid item xs={8}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email"
              className="emailInput"
              disabled={true}
              name="emailInput"
              margin="normal"
              value={this.props.user?this.props.user.email:""}
            />
          </Grid>
        </Grid>

        <Grid
          container
          direction="row"
          justify="center"
          style={{ padding: 10 }}
        >
          <Grid item xs={8}>
            <TextField
              required
              fullWidth
              id="numb"
              label="Enter phone number"
              className="emailInput"
              disabled={false}
              name="numbInput"
              margin="normal"
              onChange={this.inputHandler}
              value={this.state.numbInput}
            />
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          style={{ padding: 10 }}
        >
          <Grid item xs={8} >
          <Selector valueInput={this.state.bloodGroupInput} name={"bloodGroupInput"} changeHandler={this.inputHandler} />
        </Grid>
        </Grid>
        

       
        <Grid
          container
          direction="row"
          justify="center"
          style={{ padding:10,  }} 
        >
          <Grid item xs={8}  >
            <Button
              variant="contained"
              size="large"
              color="primary"
              style={{ backgroundColor: "#EF5350" }}
              onClick={this.buttonHandler}
            >
            Donate Blood
             <Icon ></Icon>
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
    donorList: state.DatabaseReducer.donorList,
    isLoading: state.DatabaseReducer.isLoading,
    isError: state.DatabaseReducer.isError,
    errorMsg: state.DatabaseReducer.errorMsg
  };
};
const mapDispatchToProps = dispatch => {
  return {
    pushDonor: donorPayload => {
      return dispatch(DatabaseActions.addDonor(donorPayload));
    },
    signOutUser: () => {
      return dispatch(AuthActions.SignOutUser());
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Donor);
