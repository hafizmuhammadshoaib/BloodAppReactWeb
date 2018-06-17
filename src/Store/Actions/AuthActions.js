export default class AuthActions {
  static SIGNIN_PROG = "SIGNIN_PROG";
  static SIGNIN_ERROR = "SIGNIN_ERROR";
  static SIGNIN_SUCC = "SIGNIN_SUCC";

  static SIGNUP_PROG = "SIGNUP_PROG";
  static SIGNUP_ERROR = "SIGNUP_ERROR";
  static SIGNUP_SUCC = "SIGNUP_SUCC";

  // static SIGNUP_PROG = "SIGNUP_PROG";
  // static SIGNUP_SUCC = "SIGNUP_SUCC";

  static UPDATE_USER_PRO = "UPDATE_USER_PRO";

  static CHECK_USER_PROG = "CHECK_USER_PROG";
  static CHECK_USER_SUCC = "CHECK_USER_SUCC";
  static SIGNOUT_PROG = "SIGNOUT_USER_PROG";
  static SIGNOUT_SUCC = "SIGNOUT_USER_SUCC";
  static SIGNOUT_ERROR = "SIGNOUT_USER_ERROR";
  static signUpUser(userPayload) {
    return {
      type: AuthActions.SIGNUP_PROG,
      payload: userPayload
    };
  }
  static signUpUserError(message) {
    return {
      type: AuthActions.SIGNUP_ERROR,
      payload: message
    };
  }
  static signInUserError(message) {
    return {
      type: AuthActions.SIGNIN_ERROR,
      payload: message
    };
  }
  static signOutUserError(message) {
    return {
      type: AuthActions.SIGNOUT_ERROR,
      payload: message
    };
  }
  static checkUser() {
    return {
      type: AuthActions.CHECK_USER_PROG
    };
  }
  static SignInUser(userPayload) {
    return {
      type: AuthActions.SIGNIN_PROG,
      payload: userPayload
    };
  }
  static SignOutUser() {
    return{
      type:AuthActions.SIGNOUT_PROG
    }
  }
}
