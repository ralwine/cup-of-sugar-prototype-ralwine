const groupMembersReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_GROUP_MEMBERS':
            return action.payload;
        default:
            return state;
    }
};

export default groupMembersReducer;