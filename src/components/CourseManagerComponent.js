import React from "react"
import {BrowserRouter, Link, Route} from "react-router-dom";
import CourseTable from "./CourseTableComponent";
import CourseGrid from "./CourseGridComponent"
import CourseEditorComponent from "../containers/CourseEditorContainer";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import { FaToggleOff } from 'react-icons/fa';
import { createCourse,findAllCourses,deleteCourse,} from "../services/CourseService.js"

export default class CourseManagerComponent extends React.Component {
    state ={
        value:true,
        courses: []
    }

    handleClick = () => {
        const newVal = !this.state.value
        this.setState({
            value: newVal
        })
    }

  //initialize
  componentDidMount() {
    findAllCourses()
      .then(courses => {
        this.setState({
            courses : courses
          }
        )
      })
  }

  // delete course
  deleteCourse = (course) => {
    //update the state and re-render
    deleteCourse(course._id)
      .then(this.setState(prevState => ({
        courses: prevState.courses.filter(d => d._id !== course._id) //update
      })))
  }

  //add course
  addCourse = (course) => {
    let newCourse = {  
      title: "New Course",
      owner: "me",
      modified: "1/1/2020"
    }
    
    createCourse(newCourse)
      .then(newCourse => this.setState((prevState) => {
        return {
          courses: [
            ...prevState.courses, newCourse
          ]
        }
    }))
  }
    //edit course
    editCourse = (course) => {
      this.setState({
        courseBeingEdited: course
      })
    }

    render() {
        return(
            <BrowserRouter>
            <div className="container">
            <Link to="/login">Login</Link> |
            <Link to="/register">Register</Link> |
            <Link to="/profile">Profile</Link> |
            <Link to="/grid">Courses Grid</Link> |
            <Link to="/table">Courses Table</Link>
              <Route path="/login" exact component={Login}/>
              <Route path="/register" exact component={Register}/>
              <Route path="/profile" exact component={Profile}/>
              <Route path="/grid" exact>
              <FaToggleOff onClick={() => this.handleClick()}/>
              {
                this.state.value &&
                  <CourseGrid 
                    courses={this.state.courses}
                    deleteCourse={this.deleteCourse}
                    updateCourse={this.updateCourse}
                    addCourse={this.addCourse}
                    editCourse={this.editCourse}
                  />
              }
              {
                    !this.state.value && 
                    <CourseTable
                      deleteCourse={this.deleteCourse}
                      updateCourse={this.updateCourse}
                      addCourse={this.addCourse}
                      editCourse={this.editCourse}
                      courses={this.state.courses} instructer="Chengcheng" term="2020fall"/> 
                  }     
                </Route>
                <Route path="/table" exact>
                  <FaToggleOff onClick={() => this.handleClick()}/>
                  {
                    this.state.value && 
                    <CourseTable
                      deleteCourse={this.deleteCourse}
                      updateCourse={this.updateCourse}
                      addCourse={this.addCourse}
                      editCourse={this.editCourse}
                      courses={this.state.courses} instructer="Chengcheng" term="2020fall"/> 
                  } 
                  {
                    !this.state.value &&
                    <CourseGrid 
                      courses={this.state.courses}
                      deleteCourse={this.deleteCourse}
                      updateCourse={this.updateCourse}
                      addCourse={this.addCourse}
                      editCourse={this.editCourse}
                    />
                  }              
                </Route>
              <Route path={["/edit/:courseId",
                            "/edit/:courseId/modules/:moduleId",
                            "/edit/:courseId/modules/:moduleId/lessons/:lessonId",
                            "/edit/:courseId/modules/:moduleId/lessons/:lessonId/topics/:topicId"
                          ]}
                     exact component={CourseEditorComponent}/>
            </div>  
          </BrowserRouter>
        )
    }
}