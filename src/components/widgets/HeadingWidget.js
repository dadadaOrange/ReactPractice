import React from "react";
import {ImArrowUp2, ImArrowDown2} from 'react-icons/im';
import {FaTrashAlt} from 'react-icons/fa';


const HeadingWidget= ({widget, updateWidget, editWidget, ok, deleteWidget, up, down, widgets, index})=>
    <div>
        <h3>Heading Widget</h3>
        <span className="float-right">
                {
                    (index!==0)&&
                    <ImArrowUp2 onClick={()=>up(index)}/>
                }
            {
                (index!==widgets.length-1)&&
                <ImArrowDown2 onClick={()=>down(index)} />
            }
            &nbsp;
            <a href="#" className="btn btn-sm btn-danger" onClick={() => deleteWidget(widget)}>
                <FaTrashAlt/>
            </a>
            {
                !widget.editing ?
                    <button className="btn btn-warning" onClick={()=>editWidget(widget)}>Edit</button>
                    :
                    <button className="btn btn-success" onClick={()=>ok(widget)}>OK</button>
            }
        </span>
        <div>
            {
                widget.editing&&
                <div className={"non-preview-container"}>
                        <div className="input-group flex-nowrap">
                            <label  className="col-sm-3 col-form-label">
                                Widget Type</label>
                        <select
                            onChange={event => updateWidget({
                                                                ...widget,
                                                                type:event.target.value
                                                            })}
                            value={widget.type}
                            className="form-control"
                            style={{marginTop: '10px'}}>
                            <option className="active">Heading</option>
                            <option>Paragraph</option>
                            <option>Image</option>
                            <option>List</option>
                        </select>
                        </div>
                    <div className="input-group flex-nowrap">
                        <label  className="col-sm-3 col-form-label">
                            Widget Name</label>

                    <input className="form-control"
                           onChange={event => updateWidget({
                                                               ...widget,
                                                               name:event.target.value
                                                           })}
                           value={widget.name}
                           placeholder={widget.name}/>
                    </div>
                    <div className="input-group flex-nowrap">
                        <label  className="col-sm-3 col-form-label">
                            Widget Text</label>

                    <input className="form-control"
                           onChange={event => updateWidget({
                                                               ...widget,
                                                               text:event.target.value
                                                           })}
                           value={widget.text}
                           placeholder="text"/>
                    </div>
                    <div className="input-group flex-nowrap">
                        <label  className="col-sm-3 col-form-label">
                            Widget Size</label>

                    <select
                        id={"headingSize"}
                        onChange={event => updateWidget({
                                                            ...widget,
                                                            size:parseInt(event.target.value)
                                                        })}
                        value={widget.size}
                        className="form-control"
                        style={{marginTop: '10px'}}>
                        <option value="1">Heading 1</option>
                        <option value="2">Heading 2</option>
                        <option value="3">Heading 3</option>
                        <option value="4">Heading 4</option>
                        <option value="5">Heading 5</option>
                    </select>
                    </div>
                </div>
            }
            <div>
                <h2>Preview</h2>
                {widget.size===1&&
                <h1>{widget.text}</h1>}
                {widget.size===2&&
                <h2>{widget.text}</h2>}
                {widget.size===3&&
                <h3>{widget.text}</h3>}
                {widget.size===4&&
                <h4>{widget.text}</h4>}
                {widget.size===5&&
                <h5>{widget.text}</h5>}
            </div>


        </div>
    </div>

export default HeadingWidget