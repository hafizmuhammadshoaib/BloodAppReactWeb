import React, { Component } from "react";
import AuthActions from "../../Store/Actions/AuthActions";
import { connect } from "react-redux";
import { AuthEpic } from "../../Store/Epics/AuthEpic";
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { emailInput: "", passInput: "", nameInput: "" ,registerButtonDisable:false};
  }
  componentDidMount() {
    //  this.props.createUser({name:"shoaib",email:"shoaibsilat9@gmail.com",pass:"shoaib123"})
    this.props.checkUser();
  }
  componentWillReceiveProps(nextProps){
      if(nextProps.user){
          this.props.history.replace('/home');
      }
      else{

      }
  }
  inputHandler=(event)=> {
    this.setState({ [event.target.name]: event.target.value });
  }
  registerHandler=()=> {
    let userInfo = {
      name: this.state.nameInput,
      email: this.state.emailInput,
      pass: this.state.passInput
    };
    console.log(userInfo);
    this.props.createUser(userInfo)
    this.setState({ emailInput: "", passInput: "", nameInput: "",registerButtonDisable:true });
  }
  render(){
    // console.log(this.props.user);
    return (
      <div>
        <div>
          <input
            onChange={this.inputHandler}
            type="text"
            placeholder="Enter name"
            name="nameInput"
          />
        </div>
        <div>
          <input
            onChange={this.inputHandler}
            type="email"
            placeholder="Enter email"
            name="emailInput"
          />
        </div>
        <div>
          <input
            onChange={this.inputHandler}
            type="password"
            placeholder="Enter password"
            name="passInput"
          />
        </div>
        <div>
          <button onClick={this.registerHandler} disabled={this.state.registerButtonDisable} >Register</button>
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
    checkUser:()=>{return dispatch(AuthActions.checkUser())}
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
