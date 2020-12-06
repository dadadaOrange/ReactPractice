
import React from 'react';
import {IoMdAddCircleOutline} from 'react-icons/io';
import HeadingWidget from './widgets/HeadingWidget';
import ParagraphWidget from './widgets/ParagraphWidget';
import ListWidget from "./widgets/ListWidget";
import ImageWidget from "./widgets/ImageWidget";

export default class WidgetListComponent extends React.Component {
    componentDidMount() {
        const topicId = this.props.topicId;
        this.props.findWidgetsForTopic(topicId)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const topicId = this.props.topicId;
        if(topicId !== prevProps.topicId) {
            this.props.findWidgetsForTopic(topicId)
        }
    }

    render() {
        return(
            <div>
                <ul>
                    {
                        this.props.widgets.map((widget,index) =>
                            <li key={widget.id}>
                                {
                                    widget.type == "Heading" &&
                                    <HeadingWidget
                                        widget={widget}
                                        updateWidget={this.props.updateWidget}
                                        deleteWidget={this.props.deleteWidget}
                                        editWidget={this.props.editWidget}
                                        ok={this.props.ok}
                                        up={this.props.up}
                                        widgets={this.props.widgets}
                                        down={this.props.down}
                                        index={index}
                                        topicId={this.props.topicId}
                                    />
                                }
                                {
                                    widget.type== "Paragraph"&&
                                    <ParagraphWidget
                                        widget={widget}
                                        updateWidget={this.props.updateWidget}
                                        deleteWidget={this.props.deleteWidget}
                                        editWidget={this.props.editWidget}
                                        ok={this.props.ok}
                                        up={this.props.up}
                                        widgets={this.props.widgets}
                                        down={this.props.down}
                                        index={index}
                                        topicId={this.props.topicId}
                                    />

                                }
                                {
                                    widget.type== "List"&&
                                    <ListWidget
                                        widget={widget}
                                        updateWidget={this.props.updateWidget}
                                        deleteWidget={this.props.deleteWidget}
                                        editWidget={this.props.editWidget}
                                        ok={this.props.ok}
                                        up={this.props.up}
                                        widgets={this.props.widgets}
                                        down={this.props.down}
                                        index={index}
                                        topicId={this.props.topicId}
                                    />

                                }
                                {
                                    widget.type== "Image"&&
                                    <ImageWidget
                                        widget={widget}
                                        updateWidget={this.props.updateWidget}
                                        deleteWidget={this.props.deleteWidget}
                                        editWidget={this.props.editWidget}
                                        ok={this.props.ok}
                                        up={this.props.up}
                                        widgets={this.props.widgets}
                                        down={this.props.down}
                                        index={index}
                                        topicId={this.props.topicId}
                                    />

                                }
                            </li>
                        )
                    }
                </ul>
                <i className="float-right btn btn-md btn-danger" aria-hidden="true">
                    <IoMdAddCircleOutline onClick={()=>this.props.createWidgetForTopic(this.props.topicId,this.props.widgets.length)}/>
                </i>
            </div>
        )
    }
}

// const propertyToDispatchMapper = (dispatch) => ({
//     createWidgetForTopic: (topicId, order) => WidgetService.createWidget(topicId,{
//         name:"Install React",
//         type:"Heading",
//         size: 1,
//         widgetOrder: order
//     }).then(actualWidget => dispatch({
//         type:"CREATE_WIDGET",
//         widget: actualWidget
//     })),
//     findAllWidgets: (topicId) => WidgetService.findWidgetsForTopic(topicId)
//         .then(widgets => dispatch({
//             type: "FIND_ALL_WIDGETS_FOR_TOPIC",
//             widgets,
//             topicId
//         })),
//     deleteWidget: (widget) => {
//         WidgetService.deleteWidget(widget.id)
//         .then(deleteWidget(dispatch, widget))
//     },
//     updateWidget: (widget) => updateWidget(dispatch, widget),
//     editWidget: (widget) => editWidget(dispatch, widget),
//     ok: (widget) => {
//         WidgetService.updateWidget(widget.id,{
//             ...widget, editing: true
//         }).then(okWidget(dispatch, widget))
//     },
//     up: (widgetIdx) => upWidget(dispatch, widgetIdx),
//     down: (widgetIdx) => downWidget(dispatch, widgetIdx),
// })
//
// const stateToPropertyMapper = (state) => ({
//     widgets: state.widgetReducer.widgets,
//     preview: state.widgetReducer.preview,
//     topicId: state.activeItemReducer.topic,
// })
//
// export default connect
// (stateToPropertyMapper, propertyToDispatchMapper)
// (WidgetList)