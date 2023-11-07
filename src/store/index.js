import { legacy_createStore as createStore } from 'redux';
import reducer from "./reducer";
//创建的store
export default createStore(reducer);
