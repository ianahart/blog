
export const navReducer = (state, action) => {

  switch(action.type) {
    case 'MOBILE_MENU_OPEN':
      return true
    case 'MOBILE_MENU_CLOSE':
      console.log('DSFJDSFKLDJSFKL')
      return false
    case 'MOBILE_MENU_TOGGLE':
      return !state;
    default:
      return state;
  }
}