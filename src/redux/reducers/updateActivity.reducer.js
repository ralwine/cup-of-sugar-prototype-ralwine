const updateActivity = (state = {}, action) => {
// console.log('in updateactivity', action.payload)
    switch (action.type) {
        case 'SET_UPDATE_ACTIVITY':
            return action.payload;
        case 'EDIT_ACTIVITY_ONCHANGE':
            return {
                ...state,
                [action.payload.property]: action.payload.value
            };
        case 'EDIT_CLEAR':
            return { title: '', description: '', tag: ''}
        default:
            return state;
    }
};

export default updateActivity;