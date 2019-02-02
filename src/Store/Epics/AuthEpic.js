import AuthActions from "../Actions/AuthActions";
import { Observable } from "rxjs";
import {createUser,updateUserProfile,checkUser,sigInWithEmailAndPass,signOutUser}from '../Firebase/firebaseAuth';
import { retry } from "rxjs/operator/retry";

 export class AuthEpic{
    static createUserOnFirebase(action$){
        return action$.ofType(AuthActions.SIGNUP_PROG).switchMap(({payload})=>{
            return Observable.fromPromise(createUser(payload)).map((obj)=>{
                return{
                    type:AuthActions.UPDATE_USER_PRO,
                    payload:payload
                }
            }).catch((error)=>{
                return Observable.of(AuthActions.signUpUserError(error.message))
            })
        })
    }
    static updateUserProfile(action$){
        return action$.ofType(AuthActions.UPDATE_USER_PRO).switchMap(({payload})=>{
            return Observable.fromPromise(updateUserProfile(payload)).map(()=>{
                return {
                    type:AuthActions.CHECK_USER_PROG,
                    
                }
            })
        })
    }
    static authStateChanged(action$){
        return action$.ofType(AuthActions.CHECK_USER_PROG).switchMap(({payload})=>{
            return Observable.fromPromise(checkUser()).map(user=>{
                return {
                    type:AuthActions.CHECK_USER_SUCC,
                    payload:user
                }
            })
        })
    }
    static signInUserFromFirebase(action$){
        return action$.ofType(AuthActions.SIGNIN_PROG).switchMap(({payload})=>{
            return Observable.fromPromise(sigInWithEmailAndPass(payload)).map((obj)=>{
                return{
                    type:AuthActions.SIGNIN_SUCC,
                    payload:obj.user
                }
            }).catch((error)=>{
                return Observable.of(AuthActions.signInUserError(error.message))
            })
        })
    }
    static singOutUserFromFirebase(action$){
        return action$.ofType(AuthActions.SIGNOUT_PROG).switchMap(()=>{
            return Observable.fromPromise(signOutUser()).map(()=>{
                return {
                    type:AuthActions.SIGNOUT_SUCC,
                    payload:null,
                }
            }).catch((error)=>{
                return Observable.of(AuthActions.signOutUserError(error.message))
            })
        })
    }

}
