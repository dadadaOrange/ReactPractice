import React from 'react';
import {FaTrashAlt} from 'react-icons/fa';
import {ImArrowUp2, ImArrowDown2} from 'react-icons/im';
const ImageWidget= ({widget, updateWidget, editWidget, ok, deleteWidget, up, down,widgets, index, topicId}) =>
    <form>
        <h3 className="form-group"> Image Widget</h3>
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
        &nbsp;
            {
            widget.editing&&
            <div>
                <select
                    onChange={event => updateWidget({
                        ...widget,
                        type:event.target.value
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
                    <input className="form-control"
                           onChange={event => updateWidget({
                               ...widget,
                               text:event.target.value
                           })}
                           value={widget.text}
                           placeholder="http://localhost:8080"/>
                </div>
                <div className="form-group">
                    <input className="form-control"
                           onChange={event => updateWidget({
                               ...widget,
                               name:event.target.value
                           })}
                           value={widget.name}
                           placeholder={widget.name}/>
                </div>
            </div>
        }

        <h4>Preview</h4>
        <img src={widget.text} width="500" height="333"/>
    </form>
 
export default ImageWidget;