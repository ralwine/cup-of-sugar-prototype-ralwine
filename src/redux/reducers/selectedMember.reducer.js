const selectedMemberReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_SELECTED_MEMBER':
            return action.payload;
        default:
            return state;
    }
};

export default selectedMemberReducer;