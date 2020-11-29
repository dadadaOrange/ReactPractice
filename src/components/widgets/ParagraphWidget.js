import React, { Component } from 'react';
import {FaTrashAlt} from 'react-icons/fa';
import {ImArrowUp2, ImArrowDown2} from 'react-icons/im';
class ParagraphWidget1 extends Component {
    render() { 
        return (
            <form>
            <h3 className="form-group"> Paragraph Widget
                <span className="float-right">
                    <a href="#" className="btn btn-sm btn-warning">
                        <ImArrowUp2/>
                    </a>
                    <a href="#" className="btn btn-sm btn-warning">
                        <ImArrowDown2/>
                    </a>
                    <select>
                        <option className="active">Paragraph</option>
                        <option>Heading</option>
                        <option>YouTube</option>
                        <option>Image</option>
                        <option>List</option>
                    </select>
                    <a href="#" className="btn btn-sm btn-danger">
                        <FaTrashAlt/>
                    </a>
                </span>
            </h3>
            <div class="form-group">
                <textarea className="form-control" placeholder="text area"/>  
            </div>
            <div class="form-group">
               <input className="form-control" placeholder="Widget name"/>     
            </div>
            <h4>Preview</h4>
            </form> 
          );
    }
}
 
const ParagraphWidget =({widget, updateWidget,editWidget, ok, createWidgetForTopic,deleteWidget,up, down,topicId,widgets,index}) =>
    <div className={"non-preview-container"}>
            {
                widget.editing &&
                <div>
                    <div>
                    {widget.name}
                        {
                            index===0 &&
                            <button onClick={()=>down(widget,widgets,topicId)} className="btn btn-warning"><i className="fa fa-arrow-down"></i></button>||
                            index===widgets.length-1&&
                            <button onClick={()=>up(widget,widgets,topicId)} className="btn btn-warning"><i className="fa fa-arrow-up"></i></button>
                        }
                        {
                            index!==0&&index!==widgets.length-1&&
                            <div>
                                <button onClick={()=>down(widget,widgets,topicId)} className="btn btn-warning"><i className="fa fa-arrow-down"></i></button>
                                <button onClick={()=>up(widget,widgets,topicId)} className="btn btn-warning"><i className="fa fa-arrow-up"></i></button>
                            </div>
                        }



                        <button onClick={()=>deleteWidget(widget)} className="pull-right btn btn-danger"><i className="fa fa-trash"></i></button>
                    </div>
                    <div className="input-group flex-nowrap">
                        <label  className="col-sm-3 col-form-label">
                            Widget Type</label>
                        <select
                            id={"headingSize"}
                            onChange={event => updateWidget({
                                                                ...widget,
                                                                type:event.target.value
                                                            })}
                            value={widget.type}
                            className="form-control"
                            style={{marginTop: '10px'}}>
                            <option value="Heading">Heading</option>
                            <option value="Paragraph">Paragraph</option>
                            <option value="List">List</option>
                            <option value="Hyperlink">Hyperlink</option>
                            <option value="Video">Video</option>
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
                        Paragraph Text</label>
                    <textarea
                        onChange={event => updateWidget({
                                                            ...widget,
                                                            text:event.target.value
                                                        })}
                        value={widget.text}
                        className="form-control"
                        placeholder="Paragraph text"
                        aria-label="List text"
                        style={{marginTop: '10px'}}/>
                    </div>



                    <button className="btn btn-success" onClick={()=>ok(widget)}><i className="fa fa-check"></i></button>
                </div>
            }
            {
                !widget.editing &&
                <div>
                    {widget.text}
                    <button className="btn btn-warning" onClick={()=>editWidget(widget)}><i className="fa fa-pencil"></i></button>
                </div>
            }


    </div>


export default ParagraphWidget