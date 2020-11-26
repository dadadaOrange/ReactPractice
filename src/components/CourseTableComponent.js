import React from "react";
import CourseRoleComponent from "./CourseRowComponent";
import { FaSortAlphaDown } from 'react-icons/fa';
import { BsFillGrid3X3GapFill} from 'react-icons/bs';
import CourseNavbar from "./CourseNavBarComponent";
import {Link} from 'react-router-dom';

class CourseTable extends React.Component {
  // state just like fields, local state instance
  state = {
    courseBeingEdited: null
  }
  selectCourse = (courseId) => {
    this.setState({ courseBeingEdited: courseId });
  };
  //props like parameters
  //render like a fucntion and it returns the whole object to render on the website
  render() {
    return (
      <div className="container">
        <CourseNavbar/>
        <table className="table table-hover">
          <thead className="col-12">
              <tr className="table-primary">
                <th>Title</th>
                <th>Owned by</th>
                <th className="d-none d-lg-block">Last modified</th>
                <th>
                  <FaSortAlphaDown/>
                  <Link to="/grid">
                    <BsFillGrid3X3GapFill/>
                  </Link>
                </th>
              </tr>
            </thead>
            <tbody>
          {
            this.props.courses.map(item => (
              <CourseRoleComponent 
              deleteCourse={this.props.deleteCourse}
              key={item._id}
              course={item}
              editing={this.state.courseBeingEdited === item._id}
              onClick={() => {
                  this.selectCourse(item._id);
                }} />
            ))
            //iterate the elememnt
          }
          </tbody>
        </table>
        <button 
        onClick={this.props.addCourse}
        className="btn btn-danger">
        +</button>
      </div>
    );
  }
}

export default CourseTable;
