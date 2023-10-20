const activityItemReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_CURRENT_ACTIVITY':
            return action.payload;
        default:
            return state;
    }
};

export default activityItemReducer;