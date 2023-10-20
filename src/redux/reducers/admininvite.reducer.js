const adminInviteReducer = (state = [], action) => {
    switch (action.type) {
        case 'CREATE_NEW_INVITE':
            return action.payload
            default:
                return state;
    }
}
export default adminInviteReducer;