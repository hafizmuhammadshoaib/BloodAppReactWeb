import DatabaseActions from '../Actions/DatabaseActions';



const INITIAL_STATE={
    donorList:[],
    isLoading:false,
    isError:false,
    errorMsg:""
}
export default function DatabaseReducer(state=INITIAL_STATE,action){
    switch(action.type){
        case DatabaseActions.ADD_DONOR_PROG:
        return Object.assign({},state,{isLoading:true});
        case DatabaseActions.ADD_DONOR_SUCC:
        return Object.assign({},state,{isLoading:false,donorList:[...state.donorList,action.payload]})
        case DatabaseActions.ADD_DONOR_ERR:
        return Object.assign({},state,{isLoading:false,isError:true,errorMsg:action.payload})
       
       case DatabaseActions.GET_DONOR_PROG:
       return Object.assign({},state,{isLoading:true});
       case DatabaseActions.GET_DONOR_SUCC:
       return Object.assign({},state,{isLoading:false,donorList:action.payload});
       case DatabaseActions.GET_DONOR_ERR:
       return Object.assign({},state,{isLoading:false,isError:true,errorMsg:action.payload})
       
        default:
        return state;
    }
}