import React from "react";
import WidgetListComponent from "../component/WidgetListComponent";
import {connect} from "react-redux";
import {createWidget,okWidget, UPDATE_WIDGET} from "../actions/WidgetActions";

const stateToPropertyMapper = (state) => ({
    widgets: state.widgetsReducer.widgets,
    topicId: state.widgetsReducer.topicId
})

const propertyToDispatchMapper = (dispatch) => ({
    createWidgetForTopic: (topicId, order) => WidgetService.createWidget(topicId,{
        name:"Install React",
        type:"Heading",
        size: 1,
        widgetOrder: order
    }).then(actualWidget => dispatch({
                                    type:"CREATE_WIDGET",
                                    widget: actualWidget

                                    })),
    editWidget: (widget) =>
        WidgetService.updateWidget(widget.id,{
            ...widget, editing: true
        }).then(status=> dispatch({
                                      type:UPDATE_WIDGET,
                                      widget: {...widget, editing: true}
                                  })),
    ok: (widget) =>
        WidgetService.updateWidget(widget.id,{
            ...widget, editing: false
        }).then(status=> dispatch({
                                    type: UPDATE_WIDGET,
                                    widget: {...widget, editing: false}
                                  })),
    up: (widget, widgets,topicId) =>{
        let allWidgets = widgets;
        let i = allWidgets.findIndex(w => w.id == widget.id);
        let downWidget= allWidgets[i-1]
        let newo =downWidget.widgetOrder
        let oldo=widget.widgetOrder

        WidgetService.updateWidget(widget.id,{...widget, editing:false,widgetOrder:newo}).then(
            actualWidget => dispatch({
                type: UPDATE_WIDGET,
                widget : {...widget, widgetOrder:newo,editing: false}
                               })
        )

        WidgetService.updateWidget(downWidget.id,{...downWidget,editing:false,widgetOrder:oldo}).then(
            actualWidget => dispatch({
                                         type: UPDATE_WIDGET,
                                         widget : {...widget, editing:false,widgetOrder:oldo}
                                     })
        )
        return(
            WidgetService.findWidgetsForTopic(topicId)
                .then(widgets => dispatch({
                                              type: "FIND_ALL_WIDGETS_FOR_TOPIC",
                                              widgets,
                                              topicId
                                          }))
        );
    },

    down:(widget, widgets,topicId) => {
        let allWidgets = widgets;
        let i = allWidgets.findIndex(w => w.id == widget.id);
        let downWidget= allWidgets[i+1]
        let newo =downWidget.widgetOrder
        let oldo=widget.widgetOrder

        WidgetService.updateWidget(widget.id,{...widget, widgetOrder:newo}).then(
            actualWidget => dispatch({
                                         type: UPDATE_WIDGET,
                                         widget : {...widget, editing:false,widgetOrder:newo}
                                     })
        )
        console.log("here",widget)
        WidgetService.updateWidget(downWidget.id,{...downWidget,widgetOrder:oldo}).then(
            actualWidget => dispatch({
                                         type: UPDATE_WIDGET,
                                         widget : {...widget, editWidget:false,widgetOrder:oldo}
                                     })
        )
        return(
            WidgetService.findWidgetsForTopic(topicId)
                .then(widgets => dispatch({
                                              type: "FIND_ALL_WIDGETS_FOR_TOPIC",
                                              widgets,
                                              topicId
                                          }))
        );

    },
    
    deleteWidget: (widget)=>{
        WidgetService.deleteWidget(widget.id)
        .then(status => dispatch({
            type: "DELETE_WIDGET",
            widgetId:widget.id
                                 }))
    },

    createWidget: () => createWidget(dispatch),
    updateWidget: (widget) =>
        dispatch({
                     type: "UPDATE_WIDGET",
                     widget: widget
                 }),

    okWidget: (widget) => okWidget(dispatch, widget)
})

export default connect(stateToPropertyMapper, propertyToDispatchMapper)
(WidgetListComponent)