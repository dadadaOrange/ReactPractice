import React from 'react';
import {Button} from 'react-bootstrap';
import {connect} from "react-redux";
import {
    deleteWidget,
    createWidget,
    updateWidget,
    editWidget,
    okWidget
} from "../actions/widgetActions";
import {FaToggleOff} from 'react-icons/fa';
import {IoMdAddCircleOutline} from 'react-icons/io';
import HeadingWidget from './widgets/HeadingWidget';
import ParagraphWidget from './widgets/ParagraphWidget';

const WidgetList = ({
                        widgets = [],
                        createWidget,
                        deleteWidget,
                        updateWidget,
                        editWidget,
                        ok,
                        up,
                        down,
                        topicId
                    }) =>
    <div>
        <div className="wbdv-light-gray-border">
                                <span className="pull-right float-right">
                                    <a href="#" className="btn btn-sm btn-success">save</a>
                                    &nbsp;
                                    <a href="#">Preview</a>
                                    <a href="#" className="btn">
                                        <FaToggleOff/>
                                    </a>
                                </span>
            <br/>
            <br/>

            <HeadingWidget/>
            <ParagraphWidget/>
         
            <i className="float-right btn btn-md btn-danger" aria-hidden="true">
                <IoMdAddCircleOutline onClick={createWidget}/>
            </i>
        </div>
                <ul>
                {
                widgets.map((widget,index) =>
                                <li>
                                    {
                                    widget.type== "Heading"&&
                                      <HeadingWidget widget={widget}
                                                     topicId={topicId}
                                                     updateWidget={updateWidget}
                                                     deleteWidget={deleteWidget}
                                                     editWidget={editWidget}
                                                     ok={ok}
                                                     up={up}
                                                     widgets={widgets}
                                                     down={down}
                                                     index={index}


                                      />||
                                      widget.type== "Paragraph"&&
                                      <ParagraphWidget widget={widget}

                                                       topicId={topicId}
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
        <ul>
            {
            widgets.map(widget =>
            <li>
                {widget.editing &&
                    <div>
                        <input value={widget.name}
                            onChange={(event) => updateWidget({
                                ...widget,
                                name: event.target.value
                                                                })}/>
                        <Button className="btn btn-sm btn-info"
                                onClick={() => okWidget(widget)}>OK</Button>
                    </div>

                }
                {!widget.editing &&
                    <span>{widget.name}
                        <button onClick={() => editWidget(widget)}
                                className="btn btn-sm btn-info">
                    Edit
                </button>
                    <button onClick={() => deleteWidget(widget)}
                            className="btn btn-sm btn-primary">
                        Delete
                    </button>
                </span>}
            </li>
            )
            }
        </ul>
    </div>

const propertyToDispatchMapper = (dispatch) => ({
    deleteWidget: (widget) => deleteWidget(dispatch, widget),
    createWidget: () => createWidget(dispatch),
    updateWidget: (widget) => updateWidget(dispatch, widget),
    editWidget: (widget) => editWidget(dispatch, widget),
    okWidget: (widget) => okWidget(dispatch, widget),
})

const stateToPropertyMapper = (state) => ({
    widgets: state.widgetReducer.widgets
})

export default connect
(stateToPropertyMapper, propertyToDispatchMapper)
(WidgetList)
