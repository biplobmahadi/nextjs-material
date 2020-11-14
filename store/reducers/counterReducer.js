const initialState = {
    count: 0,
    mama: 'mamakakhunkor',
};

const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                ...state,
                count: state.count + 1,
            };
        case 'DECREMENT':
            return {
                ...state,
                count: state.count - 1,
            };
        case 'RESET':
            return {
                ...state,
                count: initialState.count,
            };
        default:
            return state;
    }
};

export default counterReducer;
