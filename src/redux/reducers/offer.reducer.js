const offerReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_OFFERS':
            return action.payload; 
        case 'CREATE_NEW_OFFER1':
                return action.payload;
        default:
            return state;
    }
};

export default offerReducer;