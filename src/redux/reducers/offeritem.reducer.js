const offerItemReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_OFFER_ITEM':
            return action.payload;
        default:
            return state;
    }
};

export default offerItemReducer;