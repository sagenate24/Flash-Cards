export default store => next => (action) => {
  console.group(action.type);
  console.log('The action is: ', action);
  console.log(store.getState());
  const returnValue = next(action);
  console.log('The new state: ', store.getState());
  console.groupEnd();

  return returnValue;
};
