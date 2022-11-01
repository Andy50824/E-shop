import {legacy_createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productListReducer } from './reducers/productReducer'
import { productDetailReducer } from './reducers/detailReducer'
import { cartReducer } from './reducers/cartReducer'


const reducer = combineReducers({
    productList: productListReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartList') ?
    JSON.parse(localStorage.getItem('cartList')) : []

const initialState = {
    cart: {cartList: cartItemsFromStorage}
}

const middleware = [thunk]

const store = legacy_createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store