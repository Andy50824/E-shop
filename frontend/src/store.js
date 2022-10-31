import {legacy_createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productListReducer } from './reducers/productReducer'
import { productDetailReducer } from './reducers/detailReducer'


const reducer = combineReducers({
    productList: productListReducer,
    productDetail: productDetailReducer,
})

const middleware = [thunk]

const store = legacy_createStore(reducer,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store