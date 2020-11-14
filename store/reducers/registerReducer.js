const initialState = {};

function registerReducer(state = initialState, action) {
    switch (action.type) {
        case 'REGISTER': {
            return { responseData: action.payload };
        }
        default:
            return state;
    }
}

export default registerReducer;
