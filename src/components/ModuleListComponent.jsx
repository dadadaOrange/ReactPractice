import React from 'react';
import {Link} from "react-router-dom";
import { TiTimes,TiPencil } from 'react-icons/ti';
import {HiCheck} from 'react-icons/hi'
import { connect } from 'react-redux';
import moduleService from "../services/ModuleService"

const ModuleListComponent = ({
        //want to receive data from reducer
        course = {},
        modules = [],
        deleteModule,
        createModule,
        updateModule,
        okModule,
        editModule,
        activeModule,
        setActiveModule,
}) =>
        <div className="col-sm-4">
        <br/>
        <div className="wbdv-module-list">
                <div>
                        <ul className="list-group">
                        {
                        modules.map(module => 
                                <li className={activeModule === module._id ? "list-group-item active-item" :  "list-group-item"} key={module._id}>
                                        {module.editing &&
                                        <div>
                                                <input value={module.title}
                                                onChange={(event) => updateModule({
                                                        ...module,
                                                        title:event.target.value
                                                })}/>
                                                <i className="float-right" onClick={() => okModule(module)}><HiCheck/></i>
                                                <i className="float-right" onClick={() => deleteModule(module)}><TiTimes/></i>   
                                        </div>
                                        }
                                        {!module.editing &&
                                                <span>
                                                        <Link
                                                            onClick={() => {
                                                                setActiveModule(module._id);
                                                            }}
                                                            to={`/edit/${course._id}/modules/${module._id}`}
                                                        >{module.title}</Link>
                                                        <span className="float-right">
                                                        <i onClick={() => editModule(module)}><TiPencil/></i>
                                                        </span>
                                                </span>
                                        }  
                                </li>)
                        }
                                <button className="btn btn-sm btn-primary float-right" 
                                        //create module for particular course
                                        onClick={() => createModule(course)}
                                        >+</button>                        
                       
                        </ul>
                </div>
        </div>
 
        </div>
const propertyToDispatchMapper = (dispatch) => ({
    deleteModule: (module) =>
    //first delete from server
    moduleService.deleteModule(module._id)
        // then delete from state
      .then(status => dispatch({
        type: "DELETE_MODULE",
        module: module
      })),

    createModule: (course) =>
    moduleService.createModule(course._id, {
      title: "New Module"
    }).then(actualModule => dispatch({
      type: "CREATE_MODULE",
      module: actualModule
    })),

    updateModule: (module) =>
    dispatch({
      type: "UPDATE_MODULE",
      module: module
    }),

    setActiveModule: (module_id) =>
    dispatch({
        type: "UPDATE_ACTIVE_MODULE",
        payload: module_id
    }),

    editModule: (module) =>
    moduleService.updateModule(module._id, {
      ...module, editing: true
    }).then(status =>
      dispatch({
      type: "UPDATE_MODULE",
      module: {...module, editing: true}
    })),
    
    okModule: (module) =>
    moduleService.updateModule(module._id, {
      ...module, editing: false
    }).then(status => dispatch({
      type: "UPDATE_MODULE",
      module: {...module, editing: false}
    })),

 })

const stateToPropertyMapper = (state) => ({
        modules: state.moduleReducer.modules,
        course: state.courseReducer.course,
        activeModule: state.activeItemReducer.module,
})

export default connect
        (stateToPropertyMapper,propertyToDispatchMapper)
        (ModuleListComponent)