import React from "react";
import {ImArrowUp2, ImArrowDown2} from 'react-icons/im';
import {FaTrashAlt} from 'react-icons/fa';


const ParagraphWidget= ({widget, updateWidget, editWidget, ok, deleteWidget, up, down,widgets, index, topicId})=>
    <div>
        <h3>Paragraph Widget</h3>
        <span className="float-right">
            {
                (index!==0)&&
                <ImArrowUp2 onClick={()=>up(widget, widgets, topicId)}/>
            }
            {
                (index!==widgets.length-1)&&
                <ImArrowDown2 onClick={()=>down(widget, widgets, topicId)} />
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

                        <textarea className="form-control"
                               onChange={event => updateWidget({
                                   ...widget,
                                   text:event.target.value
                               })}
                               value={widget.text}
                               placeholder="text"/>
                    </div>
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
                </div>
            }

            <div>
                <h2>Preview</h2>
                <div><text>{widget.text}</text></div>
            </div>

        </div>
    </div>

export default ParagraphWidget