const initialState = {
  articles: [],
  remoteArticles: [],
};

// Helper function to preserve immutability of state; copy instead of change
function changeState(currentState, changes) {
  return Object.assign({}, currentState, changes);
}

function rootReducer(state = initialState, action) {
  return state;
}

export default rootReducer;