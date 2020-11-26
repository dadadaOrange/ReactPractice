import React, { Component } from 'react';
import "../css/course-list.style.css";
import {Navbar, Form,FormControl,Button, Nav} from "react-bootstrap";
import {HiOutlineViewList} from 'react-icons/hi';
import {createCourse} from "../services/CourseService";

class CourseNavbar extends Component {
    state = {
        courses: this.props.courses
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
                        <HiOutlineViewList className="topIcon"/>
                        <Navbar.Brand href="#home" >Course Manager</Navbar.Brand>
                        <Navbar className="mr-auto active hidden-xs hidden-sm">
                            <Nav.Link href="#home" >Home</Nav.Link>
                            <Nav.Link href="#features">Features</Nav.Link>
                            <Nav.Link href="#pricing">Pricing</Nav.Link>
                        </Navbar>
                        <Form inline>
                        <FormControl type="text" placeholder="New Course" className="mr-sm-6" />
                        <Button 
                        onClick={this.addCourse} className="btn btn-info"
                        >+</Button>
                        </Form>
                    </Navbar>              
            </div> 
          );
    }
}
 
export default CourseNavbar;