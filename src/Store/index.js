// https://redux-observable.js.org/docs/basics/SettingUpTheMiddleware.html

import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";

// reducers
import AuthReducer from "./Reducers/AuthRducer";
import DatabaseReducer from "./Reducers/DatabaseReducer";
// epics
import { AuthEpic } from "./Epics/AuthEpic";
import { DatabaseEpic } from "./Epics/DatabaseEpic";
import AuthActions from "./Actions/AuthActions";
import DatabaseActions from "./Actions/DatabaseActions";
import { loadState, saveState } from "../PersistState";

const persistedState = loadState();

// Application Reducers
const rootReducer = combineReducers({
  AuthReducer,
  DatabaseReducer
});

export const rootEpic = combineEpics(
  AuthEpic.createUserOnFirebase,
  AuthEpic.updateUserProfile,
  AuthEpic.authStateChanged,
  AuthEpic.signInUserFromFirebase,
  AuthEpic.singOutUserFromFirebase,
  DatabaseEpic.addDonorOnFirebase,
  DatabaseEpic.getDonorFromFirebae
  // more epics functions go here
);

const epicMiddleware = createEpicMiddleware(rootEpic);

const createStoreWithMiddleware = applyMiddleware(epicMiddleware);

export let store = createStore(
  rootReducer,
  persistedState,
  createStoreWithMiddleware,
);
store.subscribe(() => {
  saveState(store.getState());
});
