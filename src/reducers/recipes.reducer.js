const reducer = (state, action) => {
    switch (action.Type) {
        case "FETCHING_SUCCESS":
            return {fetching: false, data: action.payload};
        case "FETCHING_ERROR":
            return {fetching: false, data: undefined};
        case "REMOVING_SUCCESS":
            return {fetching: false, data: state.data.filter(r=>r.id !== action.payload.id)};
        case "REMOVING_ERROR":
            return {fetching: false, data: undefined};
        case "FETCHING":
            return  {fetching:true, data: undefined};
        default:
            return state;
    }
}

export default reducer;