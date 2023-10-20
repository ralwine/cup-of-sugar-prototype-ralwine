const offerReducer = (state = [], action) => {
    console.log('reducer offer', action.payload)
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