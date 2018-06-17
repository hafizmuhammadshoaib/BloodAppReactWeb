import AuthActions from "./AuthActions";
import { retry } from "rxjs/operators/retry";

export default class DatabaseActions {
  static ADD_DONOR_PROG = "ADD_DONOR_PROG";
  static ADD_DONOR_SUCC = "ADD_DONOR_SUCC";
  static ADD_DONOR_ERR = "ADD_DONOR_ERR";

  static GET_DONOR_PROG = "GET_DONOR_PROG";
  static GET_DONOR_SUCC = "GET_DONOR_SUCC";
  static GET_DONOR_ERR = "GET_DONOR_ERR";

  static addDonor(donorPayload) {
    return {
      type: DatabaseActions.ADD_DONOR_PROG,
      payload: donorPayload
    };
  }
  static addDonorSucc(payload) {
    return {
      type: DatabaseActions.ADD_DONOR_SUCC,
      payload: payload
    };
  }
  static addDonorError(message) {
    return {
      type: DatabaseActions.ADD_DONOR_ERR,
      payload: message
    };
  }
  static getDonor() {
    return { type: DatabaseActions.GET_DONOR_PROG };
  }
  static getDonorError(message){
      return {
          type:DatabaseActions.GET_DONOR_ERR,
          payload:message
      }
  }
}
