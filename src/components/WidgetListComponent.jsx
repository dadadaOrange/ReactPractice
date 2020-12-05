
import React from 'react';
import {connect} from "react-redux";
import {
    deleteWidget,
    createWidget,
    updateWidget,
    editWidget,
    okWidget,
    upWidget,
    downWidget,
} from "../actions/widgetActions";
import {IoMdAddCircleOutline} from 'react-icons/io';
import HeadingWidget from './widgets/HeadingWidget';
import ParagraphWidget from './widgets/ParagraphWidget';
import ListWidget from "./widgets/ListWidget";
import ImageWidget from "./widgets/ImageWidget";
import WidgetService from "../services/WidgetService";

const WidgetList = ({
                        createWidgetForTopic,
                        widgets = [],
                        createWidget,
                        deleteWidget,
                        updateWidget,
                        editWidget,
                        ok,
                        up,
                        down,
                        topicId,
                    }) =>
    <div>
        <div className="wbdv-light-gray-border flex-nowrap">
            <a href="#" className="btn btn-sm btn-success" onClick={()=>createWidgetForTopic(topicId,widgets)}>save</a>
        </div>
                <ul>
                {
                widgets.map((widget,index) =>
                                <li key={widget.id}>
                                    {
                                        widget.type == "Heading" &&
                                        <HeadingWidget
                                            widget={widget}
                                            updateWidget={updateWidget}
                                            deleteWidget={deleteWidget}
                                            editWidget={editWidget}
                                            ok={ok}
                                            up={up}
                                            widgets={widgets}
                                            down={down}
                                            index={index}
                                        />
                                    }
                                    {
                                        widget.type== "Paragraph"&&
                                        <ParagraphWidget
                                            widget={widget}
                                            updateWidget={updateWidget}
                                            deleteWidget={deleteWidget}
                                            editWidget={editWidget}
                                            ok={ok}
                                            up={up}
                                            widgets={widgets}
                                            down={down}
                                            index={index}
                                        />

                                    }
                                    {
                                        widget.type== "List"&&
                                        <ListWidget
                                            widget={widget}
                                            updateWidget={updateWidget}
                                            deleteWidget={deleteWidget}
                                            editWidget={editWidget}
                                            ok={ok}
                                            up={up}
                                            widgets={widgets}
                                            down={down}
                                            index={index}
                                        />

                                    }
                                    {
                                        widget.type== "Image"&&
                                        <ImageWidget
                                            widget={widget}
                                            updateWidget={updateWidget}
                                            deleteWidget={deleteWidget}
                                            editWidget={editWidget}
                                            ok={ok}
                                            up={up}
                                            widgets={widgets}
                                            down={down}
                                            index={index}
                                        />

                                    }
                                </li>
                )
            }
        </ul>
        <i className="float-right btn btn-md btn-danger" aria-hidden="true">
            <IoMdAddCircleOutline onClick={createWidget}/>
        </i>
    </div>

const propertyToDispatchMapper = (dispatch) => ({
    createWidgetForTopic: (topicId, widgets) => WidgetService.createWidget(topicId,widgets)
        .then(actualWidget => dispatch({
            type:"CREATE_WIDGET",
            widget: actualWidget

        })),
    deleteWidget: (widget) => deleteWidget(dispatch, widget),
    createWidget: () => createWidget(dispatch),
    updateWidget: (widget) => updateWidget(dispatch, widget),
    editWidget: (widget) => editWidget(dispatch, widget),
    ok: (widget) => okWidget(dispatch, widget),
    up: (widgetIdx) => upWidget(dispatch, widgetIdx),
    down: (widgetIdx) => downWidget(dispatch, widgetIdx),
})

const stateToPropertyMapper = (state) => ({
    widgets: state.widgetReducer.widgets,
    preview: state.widgetReducer.preview,
    topicId: state.activeItemReducer.topic,
})

export default connect
(stateToPropertyMapper, propertyToDispatchMapper)
(WidgetList)