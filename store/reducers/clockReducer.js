const initialState = {
    lastUpdate: 0,
    light: false,
};

const clockReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TICK':
            return {
                ...state,
                lastUpdate: action.lastUpdate,
                light: !!action.light,
            };

        default:
            return state;
    }
};

export default clockReducer;
