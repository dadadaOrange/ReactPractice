import React from "react";

const HeadingWidget= ({widget, updateWidget, editWidget, ok, deleteWidget, up, down, widgets, index})=>
    <div>
        <span>
            <h2>Heading Widget</h2>
            {
                (index!==0)&&
                <button onClick={()=>up(index)} className="btn btn-warning"><i className="arrow up"></i></button>
            }
            {
                (index!=widgets.length-1)&&
                <button onClick={()=>down(index)} className="btn btn-warning"><i className="arrow down"></i></button>
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
                            Widget Text</label>

                    <input className="form-control"
                           onChange={event => updateWidget({
                                                               ...widget,
                                                               text:event.target.value
                                                           })}
                           value={widget.text}
                           placeholder="text"></input>
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
                    <button className="btn btn-success" onClick={()=>ok(widget)}>OK</button>
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
                <span>
                    {
                        !widget.editing&&
                        <button className="btn btn-warning" onClick={()=>editWidget(widget)}>Edit</button>
                    }
                    <button onClick={() => deleteWidget(widget)}
                            className="btn btn-sm btn-primary">
                        Delete
                    </button>
                </span>
            </div>


        </div>
    </div>

export default HeadingWidget