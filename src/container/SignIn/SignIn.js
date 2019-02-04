import React, { Component } from "react";
import { connect } from "react-redux";
import AuthActions from "../../Store/Actions/AuthActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import "./SignIn.css";
import Fade from "@material-ui/core/Fade";
import LinearProgress from "@material-ui/core/LinearProgress";
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = { emailInput: "", passInput: "", modalState: false };
  }
  inputHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  signInHandler = (e) => {
    e.preventDefault();
    let userInfo = {
      email: this.state.emailInput,
      pass: this.state.passInput
    };
    console.log(userInfo);
    this.props.signInUser(userInfo);
    // this.setState({ emailInput: "", passInput: "", signInButtonDisable: true });
  };
  componentDidMount() {
    //  this.props.createUser({name:"shoaib",email:"shoaibsilat9@gmail.com",pass:"shoaib123"})
    this.props.checkUser();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.props.history.replace("/home");
    }
    if (nextProps.isError) {
      this.modalHandler(true);
    }

  }
  modalHandler = (state) => {
    this.setState({ modalState: state })
  }
  getModalStyle() {
    const top = 50 + Math.round(Math.random() * 20) - 10;;
    const left = 50 + Math.round(Math.random() * 20) - 10;;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  render() {
    return (
      <div>
        <div className="appBar"  >
          <h2 className="headingText" >Blood App</h2>
        </div>
        <div className="parentDiv" >
          <div className="formParentStyle"  >
            <form onSubmit={this.signInHandler} >
              <div className="inputParentStyles" >
                <input
                  id="email"
                  className="emailInput input"
                  placeholder="Email"
                  onChange={this.inputHandler}
                  name="emailInput"
                  value={this.state.emailInput}
                  disabled={this.props.isLoading}
                />
              </div>
              <div className="inputParentStyles" >
                <input
                  required
                  id="password-input"
                  placeholder="Password"
                  label="Password"
                  className="passInput input"
                  type="password"
                  name="passInput"
                  onChange={this.inputHandler}
                  value={this.state.passInput}
                  disabled={this.props.isLoading}
                />
              </div>
              <div id="signInDiv" >
                <button id="signInButton"
                  disabled={this.props.isLoading}
                  type="submit"
                >
                  SignIn
              </button>
              </div>
            </form>
            <div id="anchorDiv" >
              <a style={{ color: "#1e3799" }}
                onClick={(this.props.isLoading) ? () => { } : () => { this.props.history.replace("./signUp"); }}>
                Don't have an account? SignUp here
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
    signInUser: userPayload => {
      return dispatch(AuthActions.SignInUser(userPayload));
    },
    checkUser: () => {
      return dispatch(AuthActions.checkUser());
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
