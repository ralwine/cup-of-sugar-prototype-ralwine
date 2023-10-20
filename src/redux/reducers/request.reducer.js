const requestReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_REQUESTS':
            return action.payload;
        case 'CREATE_NEW_REQUEST':
            return action.payload;
        default:
            return state;
    }
};

export default requestReducer;