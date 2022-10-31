import axios from 'axios'

const PRODUCT_LIST_REQUEST = 'PRODUCT_LIST_REQUEST'
const PRODUCT_LIST_SUCCESS = 'PRODUCT_LIST_SUCCESS'
const PRODUCT_LIST_FAIL = 'PRODUCT_LIST_FAIL'

const initialState = {
    products: [],
}

export const productListReducer = (state = initialState, action) => {
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return {...state,
                    loading: true,
                    products: []}

        case PRODUCT_LIST_SUCCESS:
            return {...state,
                    loading: false, 
                    products: action.payload} 
            
        case PRODUCT_LIST_FAIL:
            return {...state,
                    loading: false, 
                    error: action.payload}

        default:
            return state
    }}

export const productListRequest = () => ({type: PRODUCT_LIST_REQUEST })
export const productListSuccess = (payload) => ({type: PRODUCT_LIST_SUCCESS, payload })
export const productListFail = (error) => ({type: PRODUCT_LIST_FAIL, 
    payload: error.response && error.response.data.message 
    ? error.response.data.message
    : error.message, })

export const getProducts = () => async (dispatch) => {
    try {
        dispatch(productListRequest())
        const {data} = await axios.get('api/products/');
        dispatch(productListSuccess(data))
    }
    catch(error) {
        dispatch(productListFail(error))
    }
}
