import AuthActions from "../Actions/AuthActions";

const INITIAL_STATE = {
  user: null,
  isLoading: false,
  isError: false,
  errorMsg: ""
};
export default function AuthReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AuthActions.SIGNUP_PROG:
      return Object.assign({}, state, { isLoading: true });
    case AuthActions.SIGNUP_SUCC:
      break;
    case AuthActions.SIGNUP_ERROR:
      return Object.assign({}, state, {
          isLoading:false,
        isError: true,
        errorMsg: action.payload
      });


    case AuthActions.CHECK_USER_PROG:
      return Object.assign({}, state, { isLoading: true });
    case AuthActions.CHECK_USER_SUCC:
    return Object.assign({},state,{user:action.payload,isLoading:false});


    case AuthActions.SIGNIN_PROG:
    return Object.assign({},state,{isLoading:true});
    case AuthActions.SIGNIN_SUCC:
    return Object.assign({},state,{isLoading:false,user:action.payload});
    case AuthActions.SIGNIN_ERROR:
    return Object.assign({},state,{isLoading:false,isError:true,errorMsg:action.payload});
    

    case AuthActions.SIGNOUT_PROG:
    return Object.assign({},state,{isLoading:true});
    case AuthActions.SIGNOUT_SUCC:
    return Object.assign({},state,{isLoading:false,user:action.payload});
    case AuthActions.SIGNOUT_ERROR:
    return Object.assign({},state,{isLoading:false,isError:true,errorMsg:action.payload})

    default:
    return state;
  }
}
