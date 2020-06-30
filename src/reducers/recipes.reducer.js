const reducer = (state, action) => {
    switch (action.Type) {
        case "FETCHING_SUCCESS":
            return {fetching: false, data: action.payload};
        case "FETCHING_ERROR":
            return {fetching: false, data: []};
        case "REMOVING_SUCCESS":
            return {fetching: false, data: state.data.filter(r => r.id !== action.payload.id)};
        case "REMOVING_ERROR":
            return {fetching: false, data: []};
        case "FETCHING":
            return {fetching: true, data: []};
        default:
            return state;
    }
}

export default reducer;