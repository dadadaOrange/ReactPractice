import React from "react";
import {Link} from "react-router-dom";
import {updateCourse} from "../services/CourseService";
import {FaEdit, FaCheck} from 'react-icons/fa';
import {ImBin} from 'react-icons/im';
import { FcFile } from 'react-icons/fc';

export default class CourseRowComponent extends React.Component{
  state = {
    editing: false,
    course:this.props.course
  }

  handleSelected = () => {
    let hilight = "table-primary";
    if(this.props.isSelected) return hilight;
    return ""
    
  }
  render() {
    return(
        <tr className={this.handleSelected()}
        onClick={this.props.onClick}>
        <td>
          <FcFile/>
        {
          this.state.editing && 
          <input 
          className="form-control"
          onChange={
            (event) => {
              const newTitle = event.target.value
              this.setState(prevState => ({
                course: {...prevState.course, title: newTitle}
              }))
            }
          }
          value={this.state.course.title}></input>
        }

        {
          !this.state.editing && 
          <Link to={`/edit/${this.state.course._id}`}>{this.state.course.title}</Link>
        }
        </td>
        <td> {this.props.course.owner} </td>
        <td className="d-none d-lg-block"> {this.props.course.modified} </td>
        <td>
          {
            !this.state.editing && <FaEdit 
                onClick={() => this.setState({editing : true})}
            />
          }
          {
            !this.state.editing && <ImBin
            onClick={() => this.props.deleteCourse(this.props.course)} //careful!!!
            />   
          }
          {
            this.state.editing &&
            <FaCheck
              onClick={() => {
                updateCourse(this.state.course._id, this.state.course)
                  .then(status => this.setState({editing: false}))
              }}
            />
          }
        </td>
      </tr>
    )
  }

}
