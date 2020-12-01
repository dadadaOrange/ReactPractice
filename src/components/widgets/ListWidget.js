import React from 'react';
import {FaTrashAlt} from 'react-icons/fa';
import {ImArrowUp2, ImArrowDown2} from 'react-icons/im';
class ListWidget extends React.Component {
    render() { 
        return (
            <form>
            <h3 className="form-group"> Heading Widget
                <span className="float-right">
                    <button href="#" className="btn btn-sm btn-warning">
                        <ImArrowUp2/>
                    </button>
                    &nbsp;
                    <button className="btn btn-sm btn-warning">
                        <ImArrowDown2/>
                    </button>
                    &nbsp;
                    <select>
                        <option className="active">Heading</option>
                        <option>YouTube</option>
                        <option>Paragraph</option>
                        <option>Image</option>
                        <option>List</option>
                    </select>
                    &nbsp;
                    <a href="#" className="btn btn-sm btn-danger">
                        <FaTrashAlt/>
                    </a>
                </span>
            </h3>
            <div class="form-group">
                <label className="form-control">
                    <p>Put each</p>
                    <p>item in</p>
                    <p>a separate row</p>
                </label>  
            </div>
                                
            <div class="form-group">
                <select class="form-control">
                <option>Unordered list</option>
                <option>Ordered list</option>
                </select>
            </div>
            <div class="form-group">
               <input className="form-control" placeholder="Widget name"/>     
            </div>
            <h4>Preview</h4>
            <ul>
                <li>Put each</li>
                <li>item in</li>
                <li>a separate row</li>
            </ul>
            </form> 
          );
    }
}
 
export default ListWidget;