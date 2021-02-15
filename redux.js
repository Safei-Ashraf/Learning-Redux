//helper:
function getRandomInt() {
  return Math.floor(Math.random() * Math.floor(999999));
}

const myRedux = {
    createStore: (reducer) => {
        let state = {};
    let listeners = [];
    const getState = () => state;

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    }

    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(l => l !== listener)
        }
    }
    dispatch({})

    return { getState, dispatch, subscribe}
},
    combineReducers: (reducers) => {
    return (state = {}, action) => {
        return Object.keys(reducers).reduce(
        (nextState, key) => {
            nextState[key] = reducers[key](
            state[key],
            action
            );
            return nextState;
        },
        {}
        );
    };
}
}
//Time Travelling
function undoable(reducer) {
    // Call the reducer with empty action to populate the initial state
    const initialState = {
        past: [],
        present: reducer([], {}),
        future: [],
    };

    return (state = initialState, action) => {
        const { past, present, future } = state;
        switch (action.type) {
            case 'UNDO':
                const previous = past[past.length - 1];
                const newPast = past.slice(0, past.length - 1);
                return {
                    past: newPast,
                    present: previous,
                    future: [present, ...future],
                };
            case 'REDO':
                const next = future[0];
                const newFuture = future.slice(1);
                return {
                    past: [...past, present],
                    present: next,
                    future: newFuture,
                };
            default:
                const newPresent = reducer(present, action);
                if (present === newPresent) {
                    return state;
                }
                else {
                return {
                    past: [...past,present],
                    present: newPresent,
                    future: [],
                };}
        }
    };
}
