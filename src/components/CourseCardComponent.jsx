import React from "react";
import { Link } from "react-router-dom";
import CourseService from "../services/CourseService";
import Image from "../resources/images/courseCard.png";
import "../css/course-card.style.css";
import {FaEdit, FaCheck} from 'react-icons/fa';
import {ImBin} from 'react-icons/im';

class CourseCardComponent extends React.Component {
  state = {
    isEditing: false,
    course: this.props.course,
  };

  render() {
    let { deleteCourse } = this.props;
    let course = this.state.course;
    return (
      <div //className="col col-sm-6 col-md-4 col-lg-3"
        className={`col col-sm-6 col-md-4 col-lg-3 courseCard ${
          this.props.isSelected ? "selected" : ""
        }`}
        onClick={this.props.onClick}>
        <div>
          {this.state.isEditing ? (
            <input
              className="form-control"
              onChange={(e) => {
                const newTitle = e.target.value;
                this.setState((prevState) => ({
                  course: {
                    ...prevState.course,
                    title: newTitle,
                  },
                }));
              }}
              value={course.title}
            />
          ) : (
            <Link to={`/edit/${course._id}`}>{course.title}</Link>
          )}
        </div>
        <div> {course.modified} </div>
        <img className="course-card" src={Image}
          alt="course card img placeholder"
        />
        <div>
           
          {this.state.isEditing ? (
            <FaCheck
              onClick={() => {
                CourseService.updateCourse(course._id, course).then((_) =>
                  this.setState({
                    isEditing: false,
                  })
                );
              }}
          />
          ) : (
            <div>
            <ImBin
            onClick={() => deleteCourse(course)}
            />
            <FaEdit
              onClick={() => {
                this.setState({
                  isEditing: true,
                });
              }}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default CourseCardComponent;
