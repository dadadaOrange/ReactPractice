import React from 'react';
import {FaTrashAlt} from 'react-icons/fa';
import {ImArrowUp2, ImArrowDown2} from 'react-icons/im';
class HeadingWidget1 extends React.Component {
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
                <input className="form-control" placeholder="http://localhost:8080"/>  
            </div>
            <div class="form-group">
               <input className="form-control" placeholder="Widget name"/>     
            </div>
            <h4>Preview</h4>
            <img src="../../resources/images/logo.JPG" width="500" height="333"></img>
            </form> 
          );
    }
}
 
export default HeadingWidget1;