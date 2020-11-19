const initialState = {};

function singleProductReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_PRODUCT': {
            return { stateProduct: action.payload };
        }
        case 'TOTAL_BAG_PRODUCT': {
            return { totalBagProduct: action.payload };
        }
        default:
            return state;
    }
}

export default singleProductReducer;
