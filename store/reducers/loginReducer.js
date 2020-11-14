const initialState = {
    // token: localStorage.getItem('haha_ecom_bangla_token'),
    token: '',
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
