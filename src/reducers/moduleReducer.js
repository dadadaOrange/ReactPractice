import {DELETE_MODULE, CREATE_MODULE, UPDATE_MODULE} from "../actions/moduleActions"
const initialState = {
    modules: []
}

const moduleReducer = (state = initialState, action) => {
        switch (action.type) {
        case "FIND_MODLULES_FOR_COURSE":
            return {
                ...state,
                modules: action.modules
            }
        case "CREATE_MODULE":
            return {
                modules: [...state.modules,{
                    _id: Date.now()+ "",
                    title: "new module"
                }]
            }
        case "UPDATE_MODULE":
            return {
                modules: state.modules.map(module => module._id === action.module._id ? action.module : module)
            }
        case "DELETE_MODULE":
            return {
                modules: state.modules.filter(module => module._id !== action.module._id)
            }
        default:
            return state
    }
}

export default moduleReducer;