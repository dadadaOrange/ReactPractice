import React from "react";

const ParagraphWidget= ({widget, updateWidget, editWidget, ok, deleteWidget, up, down,widgets, index})=>
    <div>
        <span>
            <h2>Paragraph Widget</h2>
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
                    <button className="btn btn-success" onClick={()=>ok(widget)}>OK</button>
                </div>
            }

            <div>
                <h2>Preview</h2>
                <div><text>{widget.text}</text></div>
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

export default ParagraphWidget