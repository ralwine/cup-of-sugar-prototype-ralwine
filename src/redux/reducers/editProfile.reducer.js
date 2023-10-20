const editProfileReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_EDIT_PROFILE':
            return action.payload;
        case 'PROFILE_EDIT_ONCHANGE':
            return {
                ...state,
                [action.payload.property]: action.payload.value
            };
        case 'EDIT_CLEAR':
            return {}
        default:
            return state;
    }
};

export default editProfileReducer;