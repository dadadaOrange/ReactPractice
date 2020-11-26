import CourseCardComponent from "./CourseCardComponent";
import React from "react";
import CourseNavbar from "./CourseNavBarComponent";

class CourseGridComponent extends React.Component {
  state = {
    selectedCourseId: null,
  };

  selectCourse = (courseId) => {
    this.setState({ selectedCourseId: courseId });
  };

  render() {
    return (
      <div className="container"> 
        <CourseNavbar/>

        <div className="row">
        {this.props.courses.map((course) => (
          <CourseCardComponent
            course={course}
            deleteCourse={this.props.deleteCourse}
            isSelected={this.state.selectedCourseId === course._id}
            key={course._id}
            onClick={() => {
              this.selectCourse(course._id);
            }}
          />
        ))}
        <button 
        onClick={this.props.addCourse}
        className="btn btn-danger">
        +</button>
        </div>
        <button
          onClick={() => {
            this.props.addCourse();
            this.setState({ selectedCourseId: null });
          }}
          className="btn sticky-add-button">
          
        </button>
      </div>
    );
  }
}

export default CourseGridComponent;
