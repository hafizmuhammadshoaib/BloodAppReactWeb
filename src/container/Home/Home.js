import React,{Component}from 'react';
import AuthActions from '../../Store/Actions/AuthActions';
import {connect} from 'react-redux'

 class Home extends Component{
    componentWillReceiveProps(nextProps){
        if(!nextProps.user){
            this.props.history.replace('/');
        }
    }
    render(){
        return (
            <div>
                <h1>Home</h1>
                <button onClick={this.props.signOutUser} >SignOut</button>
                <button onClick={()=>{this.props.history.replace('/donor')}} >Donate Blood</button>
                <button onClick={()=>{this.props.history.replace('/needer')}} >Need Blood</button>
            </div>
        )
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
        signOutUser:()=>{return dispatch(AuthActions.SignOutUser())}
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home);
  