
const initialState = {
    module: null,
    lesson: null,
    topic: null,
};

const activeItemReducer = (state=initialState, {type, payload}) => {
    switch(type) {
        case "UPDATE_ACTIVE_MODULE":
            return {
                ...state,
                module: payload
            };
        case "UPDATE_ACTIVE_LESSON":
            return {
                ...state,
                lesson: payload
            };
        case "UPDATE_ACTIVE_TOPIC":
            return {
                ...state,
                topic: payload
            };
        default:
            return state
    }
};

export default activeItemReducer;