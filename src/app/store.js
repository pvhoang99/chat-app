import reducer from "../component/reducer";

const {configureStore} = require("@reduxjs/toolkit");

const store = configureStore({
    reducer
})

export default store