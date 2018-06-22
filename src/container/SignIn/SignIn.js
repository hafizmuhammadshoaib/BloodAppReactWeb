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
  signInHandler = () => {
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
    if(nextProps.isError){
      this.modalHandler(true);
    }
    
  }
  modalHandler=(state)=>{
    this.setState({modalState:state})
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
        <AppBar
          position="static"
          color="default"
          style={{ backgroundColor: "#E53935" }}
        >
          <Toolbar>
            <Typography
              variant="title"
              color="inherit"
              style={{ color: "#FFF" }}
            >
              Blood App
            </Typography>
          </Toolbar>
        </AppBar>
   





        

        <Grid style={{}} container direction="column" alignItems="center">
          <Grid container direction="row" justify="center">
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                className="emailInput"
                onChange={this.inputHandler}
                name="emailInput"
                margin="normal"
                value={this.state.emailInput}
                disabled={this.props.isLoading}
              />
            </Grid>
          </Grid>

          
          <Grid container direction="row" justify="center">
            <Grid xs={12} md={6}>
              <TextField
                required
                fullWidth
                id="password-input"
                label="Password"
                className="passInput"
                type="password"
                autoComplete="current-password"
                margin="normal"
                name="passInput"
                onChange={this.inputHandler}
                value={this.state.passInput}
                disabled={this.props.isLoading}
              />
            </Grid>
          </Grid>

          
          <Grid container direction="row" justify="center">
            <Grid item xs={1} md={1}>
              <Button
                variant="outlined"
                color="primary"
                onClick={this.signInHandler}
                className="signInBtn"
                disabled={this.props.isLoading}
              >
                SignIn
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid container direction="row" justify="center">
          <a
            onClick={(this.props.isLoading)?"":
              () => {
              this.props.history.replace("./signUp");
            }}
           
          >
            <Typography
              variant="body1"
              align="center"
              style={{ color: "blue", padding: "20px" }}
            >
              Don't have an account? SignUp here
            </Typography>
          </a>
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
