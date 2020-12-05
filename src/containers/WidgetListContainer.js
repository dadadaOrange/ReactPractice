import React from "react";
import WidgetListComponent from "../components/WidgetListComponent";
import {connect} from "react-redux";
import {editWidget, UPDATE_WIDGET} from "../actions/widgetActions";
import WidgetService from "../services/WidgetService";

const stateToPropertyMapper = (state) => ({
    widgets: state.widgetReducer.widgets,
    topicId: state.activeItemReducer.topic
})

const propertyToDispatchMapper = (dispatch) => ({
    findWidgetsForTopic: (topicId) => WidgetService.findWidgetsForTopic(topicId).then((widgets)=>{
        dispatch({
            type:"FIND_ALL_WIDGETS_FOR_TOPIC",
            widgets,
            topicId
        })
    }),
    createWidgetForTopic: (topicId, order) => WidgetService.createWidget(topicId,{
        name:"Install React",
        type:"Heading",
        size: 1,
        widgetOrder: order
    }).then(actualWidget => dispatch({
                                    type:"CREATE_WIDGET",
                                    widget: actualWidget

                                    })),

    editWidget: (widget) => editWidget(dispatch, widget),

    ok: (widget) =>
        WidgetService.updateWidget(widget._id,{
            ...widget, editing: false
        }).then(()=> dispatch({
                                      type:UPDATE_WIDGET,
                                      widget: {...widget, editing: false}
                                  })),
    up: (widget, widgets,topicId) =>{
        let allWidgets = widgets;
        let i = allWidgets.findIndex(w => w._id === widget._id);
        let downWidget= allWidgets[i-1]
        let newo =downWidget.widgetOrder
        let oldo=widget.widgetOrder

        WidgetService.updateWidget(widget._id,{...widget, editing:false,widgetOrder:newo}).then(
            actualWidget => dispatch({
                type: UPDATE_WIDGET,
                widget : {...widget, widgetOrder:newo,editing: false}
                               })
        )

        WidgetService.updateWidget(downWidget._id,{...downWidget,editing:false,widgetOrder:oldo}).then(
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
        let i = allWidgets.findIndex(w => w._id == widget._id);
        let downWidget= allWidgets[i+1]
        let newo =downWidget.widgetOrder
        let oldo=widget.widgetOrder

        WidgetService.updateWidget(widget._id,{...widget, widgetOrder:newo}).then(
            actualWidget => dispatch({
                                         type: UPDATE_WIDGET,
                                         widget : {...widget, editing:false,widgetOrder:newo}
                                     })
        )
        console.log("here",widget)
        WidgetService.updateWidget(downWidget._id,{...downWidget,widgetOrder:oldo}).then(
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
        WidgetService.deleteWidget(widget._id)
        .then(status => dispatch({
            type: "DELETE_WIDGET",
            widgetId:widget._id
                                 }))
    },
    updateWidget: (widget) =>
        dispatch({
                     type: "UPDATE_WIDGET",
                     widget: widget
                 }),
})

export default connect(stateToPropertyMapper, propertyToDispatchMapper)
(WidgetListComponent)