import React, { Component } from "react";
import DatabaseActions from "../../Store/Actions/DatabaseActions";
import { connect } from "react-redux";
import NavBar from "../../Component/NavBar";
import Selector from '../../Component/Selector';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AuthActions from "../../Store/Actions/AuthActions";
import "./Needer.css";
class Needer extends Component {
  constructor(props) {
    super(props);
    this.state = { bloodInput: "", renderArray: [], openDrawer: false };
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.user) {
      this.props.history.replace("/");
    }
  }
  inputHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  componentDidMount() {
    this.props.getDonor();
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

  findAvailableUser(receipentArray) {
    let array = [];
    console.log("at start find ava user", this.state.renderArray);
    this.props.donorList.find(obj => {
      receipentArray.forEach(value => {
        value.forEach(val => {
          if (val == obj.bloodGroup) {
            array.push(obj);
          }
        });
      });
      this.setState({ renderArray: array });
    });
  }

  checkDonors = () => {
    let a = [];
    var b = this.state.bloodInput;
    switch (b) {
      case "A+":
        a.push(["A+", "O+", "A-", "O-"]);
        this.findAvailableUser(a);

        break;

      case "B+":
        a.push(["B+", "O+", "B-", "O-"]);
        this.findAvailableUser(a);
        break;

      case "AB+":
        a.push(["AB+", "AB-", "O+", "O-", "A+", "A-", "B+", "B-"]);
        this.findAvailableUser(a);
        break;

      case "O+":
        a.push(["O+", "O-"]);
        this.findAvailableUser(a);
        break;

      case "A-":
        a.push(["A-", "O-"]);
        this.findAvailableUser(a);
        break;

      case "B-":
        a.push(["B-", "O-"]);
        this.findAvailableUser(a);
        break;

      case "AB-":
        a.push(["AB-", "O-", "A-", "B-"]);
        this.findAvailableUser(a);
        break;

      case "O-":
        a.push(["O-"]);
        this.findAvailableUser(a);
        break;
    }
  };

  render() {
    {
      console.log("", this.state.renderArray);
    }
    return (
      <div onMouseDown={() => this.toggleDrawer(false)} style={{ height: "100%",  }} >
        <NavBar
          listArrayItem={[{ name: "Home", selected: false }, { name: "Donate Blood", selected: false }, { name: "Need Donor", selected: true }]}
          openDrawer={this.state.openDrawer}
          toggleDrawer={this.toggleDrawer}
          listHandler={this.listHandler}
          userName={this.props.user ? this.props.user.displayName : ""}
          signOut={this.props.signOutUser}
        />
        <div style={{ display: "flex", flexDirection: "column", height: "35vh", justifyContent: "space-around", alignItems: "center" }} >
          <div style={{ height: "12vh", alignItems: "center" }} >
            <Selector name="bloodInput" valueInput={this.state.bloodInput} changeHandler={this.inputHandler} />
          </div>
          <div style={{ height: "10vh" }} >
            <Button
              variant="contained"
              size="large"
              color="primary"
              style={{ backgroundColor: "#E040FB", fontWeight: "bold" }}
              onClick={this.checkDonors}
            >
              Find Donor
            </Button>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", }} >
          <table style={{ width: "70vw", }} >
            <thead>
              <tr>
                <th>Blood Group</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
              </tr>
              {this.state.renderArray.map((obj, index) => {
                return (
                  <tr key={index}>
                    <td component="th" scope="row">
                      {obj.bloodGroup}
                    </td>
                    <td >{obj.name}</td>
                    <td >{obj.email}</td>
                    <td numeric>{obj.phoneNumber}</td>
                  </tr>
                );
              })}
            </thead>
          </table>
        </div>
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
    getDonor: () => {
      return dispatch(DatabaseActions.getDonor());
    },
    signOutUser: () => {
      return dispatch(AuthActions.SignOutUser());
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Needer);
