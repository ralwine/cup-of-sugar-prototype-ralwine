const restrictionReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_RESTRICTION':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default restrictionReducer;