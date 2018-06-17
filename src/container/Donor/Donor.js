import React, { Component } from "react";
import { connect } from "react-redux";
import DatabaseActions from "../../Store/Actions/DatabaseActions";
class Donor extends Component {
  constructor(props) {
    super(props);
    this.state = { numbInput: "", bloodGroupInput: "" };
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
    this.setState({ numbInput: "", bloodGroupInput: "" });
  };
  render() {
    return (
      <div>
        <h1> Donor</h1>
        <button
          onClick={() => {
            this.props.history.replace("/needer");
          }}
        >
          Need Blood
        </button>
        <br />
        <button
          onClick={() => {
            this.props.history.replace("/home");
          }}
        >
          Home
        </button>
        <br />
        <input
          type="text"
          disabled={true}
          name="nameInput"
          value={this.props.user.displayName}
        />
        <input
          type="text"
          disabled={true}
          name="emailInput"
          value={this.props.user.email}
        />
        <input
          onChange={this.inputHandler}
          placeholder="Enter phone number"
          type="text"
          disabled={false}
          name="numbInput"
          value={this.state.numbInput}
        />
        <input
          onChange={this.inputHandler}
          placeholder="Enter Blood Group"
          type="text"
          disabled={false}
          name="bloodGroupInput"
          value={this.state.bloodGroupInput}
        />
        <button onClick={this.buttonHandler}>Donate</button>
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
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Donor);
