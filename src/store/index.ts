// Dependencies
import { createStore } from "redux";

// Reducer
import rootReducer from "./reducers";

// Create store with root reducer
const store = createStore(rootReducer);

// Export store
export default store;
