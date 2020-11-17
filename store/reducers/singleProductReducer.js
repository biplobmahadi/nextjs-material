const initialState = {};

function singleProductReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_PRODUCT': {
            return { stateProduct: action.payload };
        }
        default:
            return state;
    }
}

export default singleProductReducer;
