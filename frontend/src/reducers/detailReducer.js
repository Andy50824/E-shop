import axios from 'axios'

const PRODUCT_DETAIL_REQUEST = 'PRODUCT_DETAIL_REQUEST'
const PRODUCT_DETAIL_SUCCESS = 'PRODUCT_DETAIL_SUCCESS'
const PRODUCT_DETAIL_FAIL = 'PRODUCT_DETAIL_FAIL'

const initialState = {
    product: {},
}

export const productDetailReducer = (state = initialState, action) => {
    switch(action.type){
        case PRODUCT_DETAIL_REQUEST:
            return {...state,
                    loading: true,
                    product: {}}

        case PRODUCT_DETAIL_SUCCESS:
            return {...state,
                    loading: false, 
                    product: action.payload} 
            
        case PRODUCT_DETAIL_FAIL:
            return {...state,
                    loading: false, 
                    error: action.payload}

        default:
            return state
    }}

export const productDetailRequest = () => ({type: PRODUCT_DETAIL_REQUEST })
export const productDetailSuccess = (payload) => ({type: PRODUCT_DETAIL_SUCCESS, payload })
export const productDetailFail = (error) => ({type: PRODUCT_DETAIL_FAIL, 
    payload: error.response && error.response.data.message 
    ? error.response.data.message
    : error.message, })

export const getProduct = (productId) => async (dispatch) => {
    try {
        dispatch(productDetailRequest())
        const {data} = await axios.get(`/api/products/${productId}`);
        dispatch(productDetailSuccess(data))
    }
    catch(error) {
        dispatch(productDetailFail(error))
    }
}
