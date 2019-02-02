import {Observable} from "rxjs";

import DatabaseActions from '../Actions/DatabaseActions';

import {pushData,getData} from '../Firebase/firebaseDB'

export class DatabaseEpic{

    static addDonorOnFirebase(action$){
        return action$.ofType(DatabaseActions.ADD_DONOR_PROG).switchMap(({payload})=>{
            return Observable.fromPromise(pushData(payload)).map((obj)=>{
                return{
                    type:DatabaseActions.ADD_DONOR_SUCC,
                    payload:obj
                }
            }).catch((error)=>{
                return Observable.of(DatabaseActions.addDonorError(error.message))
            })
        })
    }
    static getDonorFromFirebae(action$){
        return action$.ofType(DatabaseActions.GET_DONOR_PROG).switchMap(()=>{
            return Observable.fromPromise(getData()).map((array)=>{
                return {
                    type:DatabaseActions.GET_DONOR_SUCC,
                    payload:array
                }
            }).catch((error)=>{
                return Observable.of(DatabaseActions.getDonorError(error.message));
            })
        })
    }
}