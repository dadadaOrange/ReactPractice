import {CREATE_WIDGET, DELETE_WIDGET, UPDATE_WIDGET, WIDGET_POSITION_UP, WIDGET_POSITION_DOWN} from "../actions/widgetActions";

const initialState ={
    widgets :[],
}

const moveItemUp=(arr, index) => {
    return [
        ...arr.slice(0,index-1),
        arr[index],
        arr[index-1],
        ...arr.slice(index+1)
    ]
};

const moveItemDown=(arr, index) => {
    return [
        ...arr.slice(0,index),
        arr[index+1],
        arr[index],
        ...arr.slice(index+2)
    ]
};

const widgetsReducer =(state =initialState, action) =>{
    switch (action.type) {
        case "FIND_ALL_WIDGETS_FOR_TOPIC":
            return {
                ...state,
                widgets: action.widgets.sort(function (a,b) {
                    if (a.widgetOrder>b.widgetOrder){
                        return 1;
                    }
                    else {
                        return -1;
                    }
                }),
                topicId: action.topicId
            }
        case CREATE_WIDGET:
            return {
                ...state,
                widgets: [...state.widgets,
                    action.widget]
            }
        case UPDATE_WIDGET:
            return {
                ...state,
                widgets: state.widgets.map(
                    widget => widget._id===action.widget._id ?
                        action.widget: widget)
            };
        case DELETE_WIDGET:
            return {
                ...state,
                widgets: state.widgets.filter(widget=> widget._id!==action.widgetId)
            };
        case WIDGET_POSITION_UP:
            return {
                ...state,
                widgets: moveItemUp(state.widgets, action.widgetIdx)
            };
        case WIDGET_POSITION_DOWN:
            return {
                ...state,
                widgets: moveItemDown(state.widgets, action.widgetIdx)
            };
        default:
            return state
    }
    return state;
}

export default widgetsReducer;