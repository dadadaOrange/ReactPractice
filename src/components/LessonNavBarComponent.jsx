import React, { Component } from 'react';
import "../css/course-list.style.css";
import {Navbar,Button, Nav} from "react-bootstrap";
import {createCourse} from "../services/CourseService";
import { TiTimes, } from 'react-icons/ti';
import { BrowserRouter, Link, Route, withRouter, Redirect  } from 'react-router-dom';
import creatHistory from 'history/createHashHistory'
const history = creatHistory();
class LessonNavBar extends Component {

     goBackPage = () => {
      history.goBack();
    }

    //add course
    addCourse = () => {
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

    render() { 
        return (
            
                <div className="container">
                    <Navbar bg="light" variant="light">
                            <TiTimes className="topIcon" onClick={this.goBackPage}/>
                        <Navbar.Brand href="#home" >{this.props.course.title}</Navbar.Brand>
                        <Navbar className="mr-auto active hidden-xs hidden-sm">
                            <Nav.Link href="#" >Build</Nav.Link>
                            <Nav.Link href="#" >Pages</Nav.Link>
                            <Nav.Link href="#">Theme</Nav.Link>
                            <Nav.Link href="#">Store</Nav.Link>
                            <Nav.Link href="#">APPs</Nav.Link>
                            <Nav.Link href="#">Settings</Nav.Link>
                        </Navbar>
                        <Button 
                        onClick={this.addCourse} className="btn btn-info"
                        >+</Button>
                    </Navbar>              
                </div> 
            
          );
    }
}
export default LessonNavBar;