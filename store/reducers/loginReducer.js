import Cookies from 'js-cookie';

const initialState = {
    // token: localStorage.getItem('haha_ecom_bangla_token'),
    // token: Cookies.get('haha_ecom_bangla_token'),
    // I will fix it later, if i get undefined here, then when ssr happend to dispatch a new state,
    // that page gives error in serializing
};

function loginReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN': {
            return {
                responseData: action.payload,
                token: action.payload.key,
            };
        }
        case 'LOGOUT': {
            return {
                responseData: action.payload,
                token: null,
            };
        }
        default:
            return state;
    }
}

export default loginReducer;
