
import React from 'react';
import { Button } from 'react-bootstrap';
import {connect} from "react-redux";
import {deleteWidget, createWidget, updateWidget, editWidget, okWidget} from "../actions/widgetActions";
import { FaToggleOff,FaTrashAlt } from 'react-icons/fa';
import { ImArrowUp2,  ImArrowDown2} from 'react-icons/im';
import { IoMdAddCircleOutline} from 'react-icons/io';

const WidgetList = ({
    widgets=[], 
    createWidget, 
    deleteWidget, 
    updateWidget,
    editWidget, 
    okWidget}) => 
        <div>
                            <div className="wbdv-light-gray-border">
                                <span className="pull-right float-right">
                                    <a href="#" className="btn btn-sm btn-success">save</a>
                                    <a href="#">Preview</a>
                                    <a href="#" className="btn">
                                        <FaToggleOff/>
                                    </a>
                                </span>
                                <br/>
                                <br/>
                               
                                <h3> Heading Widget
                                    <span className="float-right">
                                    <a href="#" className="btn btn-sm btn-warning">
                                        <ImArrowUp2/>
                                    </a>
                                    <a href="#" className="btn btn-sm btn-warning">
                                        <ImArrowDown2/>
                                    </a>
                                    <select>
                                        <option>Heading</option>
                                        <option>YouTube</option>
                                        <option>Slides</option>
                                        <option>Image</option>
                                        <option>List</option>
                                    </select>
                                    <a href="#" className="btn btn-sm btn-danger">
                                        <FaTrashAlt/>
                                    </a>
                                    </span>
                                </h3>
                                <input className="form-control" placeholder="Heading Text"/>
                                <br/>
                                <select className="form-control">
                                    <option>Heading 1</option>
                                    <option>Heading 2</option>
                                    <option>Heading 3</option>
                                    <option>Heading 4</option>
                                    <option>Heading 5</option>
                                    <option>Heading 6</option>
                                </select>
                                <br/>
                                <h4>Preview</h4>
                                <input className="form-control" placeholder="Heading Text"/>
                                <i className="float-right btn btn-md btn-danger" aria-hidden="true">
                                <IoMdAddCircleOutline onClick={createWidget}/>
                                </i>
                            </div>

            <ul>
                {
                    widgets.map(widget =>
                        <li>

                            {widget.editing && 
                                <div>
                                    <input value={widget.name}
                                            onChange={(event) => updateWidget({
                                                ...widget,
                                                name:event.target.value
                                            })}/>   
                                    <Button className="btn btn-sm btn-info" 
                                        onClick={() => okWidget(widget)}>OK</Button>                                    
                                </div>
                     
                            }
                            {!widget.editing&&
                            <span>{widget.name}
                            <button onClick={() => editWidget(widget)} className="btn btn-sm btn-info">
                                Edit
                            </button>
                                <button onClick={() => deleteWidget(widget)} className="btn btn-sm btn-primary">
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
