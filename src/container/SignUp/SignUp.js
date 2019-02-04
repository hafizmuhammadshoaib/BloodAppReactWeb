import React, { Component } from "react";
import AuthActions from "../../Store/Actions/AuthActions";
import { connect } from "react-redux";
import { AuthEpic } from "../../Store/Epics/AuthEpic";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import "../SignIn/SignIn.css";
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { emailInput: "", passInput: "", nameInput: "", registerButtonDisable: false };
  }
  componentDidMount() {
    //  this.props.createUser({name:"shoaib",email:"shoaibsilat9@gmail.com",pass:"shoaib123"})
    this.props.checkUser();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.props.history.replace('/home');
    }
    else {

    }
  }
  inputHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  registerHandler = () => {
    let userInfo = {
      name: this.state.nameInput,
      email: this.state.emailInput,
      pass: this.state.passInput
    };
    console.log(userInfo);
    this.props.createUser(userInfo)
    // this.setState({ emailInput: "", passInput: "", nameInput: "",registerButtonDisable:true });
  }
  render() {
    // console.log(this.props.user);
    return (
      <div>
        <div className="appBar"  >
          <h2 className="headingText" >Blood App</h2>
        </div>
        <div className="parentDiv" >
          <div className="formParentStyle"  >

            <form onSubmit={this.registerHandler} >

              <div className="inputParentStyles" >
                <input
                  required
                  fullWidth
                  id="name"
                  placeholder="Name"
                  className="nameInput input"
                  onChange={this.inputHandler}
                  name="nameInput"
                  margin="normal"
                  value={this.state.nameInput}
                  disabled={this.props.isLoading}
                />
              </div>
              <div className="inputParentStyles" >
                <input
                  id="email"
                  label="Email"
                  placeholder="Email"
                  className="emailInput input"
                  onChange={this.inputHandler}
                  name="emailInput"
                  margin="normal"
                  value={this.state.emailInput}
                  disabled={this.props.isLoading}
                />
              </div>
              <div className="inputParentStyles" >
                <input
                  id="password-input"
                  label="Password"
                  placeholder="Password"
                  className="passInput input"
                  type="password"
                  autoComplete="current-password"
                  margin="normal"
                  name="passInput"
                  onChange={this.inputHandler}
                  value={this.state.passInput}
                  disabled={this.props.isLoading}
                />
              </div>
              <div id="signInDiv" >
                <button
                  id="signInButton"
                  className="signUpBtn"
                  disabled={this.props.isLoading}
                  type="submit"
                >
                  SignUp
            </button>
              </div>
            </form>
            <div id="anchorDiv" >
              <a style={{ color: "#1e3799" }} onClick={(this.props.isLoading) ? () => { } :
                () => {
                  this.props.history.replace("/");
                }}  >
                Already have an account? SignIn here



            </a>
            </div>

          </div>

        </div>

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
    createUser: userObj => {
      return dispatch(AuthActions.signUpUser(userObj));
    },
    checkUser: () => { return dispatch(AuthActions.checkUser()) }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
