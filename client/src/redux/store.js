import { configureStore } from "@reduxjs/toolkit"
import { userReducer } from "./reducers/user"
import { productReducer } from "./reducers/product";
import cartReducer from "./reducers/cart";
import { adminReducer } from "./reducers/admin";

const myStore = new configureStore({
    reducer: {
        userGS: userReducer,
        productGS: productReducer,
        cartGS: cartReducer,
        adminGS: adminReducer
    }
});
export default myStore;