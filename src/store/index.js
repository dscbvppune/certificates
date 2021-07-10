import { createStore } from "redux";
import { reducer } from "../reducers/index.reducers";

const store = createStore(reducer);
export default store;