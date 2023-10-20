const requestItemReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_REQUEST_ITEM':
            return action.payload;
        default:
            return state;
    }
};

export default requestItemReducer;