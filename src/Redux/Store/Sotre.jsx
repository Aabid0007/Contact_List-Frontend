import { configureStore } from "@reduxjs/toolkit";
import GetDataReducer from "../Reducer/GetData.Slice";

 const store = configureStore({
    reducer: {
        data: GetDataReducer,
    },
})
export default store;