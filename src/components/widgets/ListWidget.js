import React from 'react';
import {FaTrashAlt} from 'react-icons/fa';
import {ImArrowUp2, ImArrowDown2} from 'react-icons/im';
const ListWidget = ({widget, updateWidget, editWidget, ok, deleteWidget, up, down, widgets, index})=>
    <form>
        <h3 className="form-group"> List Widget</h3>
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
                &nbsp;
        {
            widget.editing &&
            <div>
                <select
                    onChange={event => updateWidget({
                        ...widget,
                        type: event.target.value
                    })}
                    value={widget.type}
                    className="form-control"
                    style={{marginTop: '10px'}}>
                    >
                    <option className="active">Heading</option>
                    <option>Paragraph</option>
                    <option>Image</option>
                    <option>List</option>
                </select>
                <div className="form-group">
                    <textarea
                        rows={5}
                        onChange={event => updateWidget({
                            ...widget,
                            text: event.target.value
                        })}
                        value={widget.text}
                        placeholder={"Put each \n item in \n a separate row"}
                    >
                        {widget.text}
                    </textarea>
                </div>

                <div className="form-group">
                    <select
                        className="form-control"
                        onChange={event => updateWidget({
                            ...widget,
                            ordered:event.target.value
                        })}
                    >
                        <option value={true}>Unordered list</option>
                        <option value={false}>Ordered list</option>
                    </select>
                </div>
                <div className="form-group">
                    <input className="form-control"
                           onChange={event => updateWidget({
                               ...widget,
                               name: event.target.value
                           })}
                           value={widget.name}
                           placeholder={widget.name}/>
                </div>
                <button className="btn btn-success" onClick={() => ok(widget)}>OK</button>
            </div>
        }

        <h4>Preview</h4>
        <ul>
            {
                !widget.ordered ?
                (widget.text || "").split(/\r?\n/).map((line, index)=>
                    <li key={index}>{line}</li>
                ) :
                (widget.text || "").split(/\r?\n/).sort().map((line, index)=>
                    <li key={index}>{line}</li>
                )
            }
        </ul>
    </form>
 
export default ListWidget;