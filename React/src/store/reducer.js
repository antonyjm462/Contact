// const redux = require("redux");
// const createStore = redux.createStore;

const initialState = {
    isLoggedIn: false,
    user: {}
}

const reducer = ((state = initialState, action) => {
    console.log("reducer called", state, action)
    if (action.type === "LOGIN") {
        return { ...state, isLoggedIn: true, user: action.val };
    } else if (action.type === "LOGOUT") {
        return { ...state, isLoggedIn: false, user: {} };
    }
    return state;
});

export default reducer;

// const store = createStore(reducer);

// console.log(store.getState())
// store.dispatch({ type: "LOGIN" })
// console.log(store.getState())
// store.dispatch({ type: "LOGOUT" })
// console.log(store.getState())

