const allergyReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ALLERGY':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default allergyReducer;