import React, { Component } from "react";
import { connect } from 'react-redux';
import AuthActions from "../../Store/Actions/AuthActions";

 class SignIn extends Component {

  constructor(props){
    super(props);
    this.state={emailInput:"",passInput:"",signInButtonDisable:false};

  }
  inputHandler=(event)=>{
    this.setState({ [event.target.name]: event.target.value });
  }
  signInHandler=()=>{
    let userInfo = {
      email: this.state.emailInput,
      pass: this.state.passInput
    };
    console.log(userInfo);
    this.props.signInUser(userInfo);
    this.setState({emailInput:"",passInput:"",signInButtonDisable:true});
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


  render() {
    return (
      <div>
          <div>
        <input onChange={this.inputHandler} type="email" placeholder="Enter email" name="emailInput" />
        </div>
        <div>
        <input onChange={this.inputHandler} type="password" placeholder="Enter password" name="passInput" />
        </div>
        <div> 
        <button onClick={this.signInHandler} disabled={this.state.signInButtonDisable} >SignIn</button>
        </div>
        
      </div>
    );
  }
  
}
const mapStateToProps = (state) => {
    console.log(state);
    return {
      user: state.AuthReducer.user,
      isLoading: state.AuthReducer.isLoading,
      isError: state.AuthReducer.isError,
      errorMsg: state.AuthReducer.errorMsg
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        signInUser:(userPayload)=>{return dispatch(AuthActions.SignInUser(userPayload))},
        checkUser:()=>{return dispatch(AuthActions.checkUser())}
    }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
