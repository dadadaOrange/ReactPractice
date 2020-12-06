import React from "react";
import TopicPills from "../components/TopicPills";
import LessonTabs from "../components/LessonTabsComponent";
import WidgetListComponent from "./WidgetListContainer";
import ModuleListComponent from "../components/ModuleListComponent";
import { connect } from "react-redux";
import {findCourseById} from '../services/CourseService'
import moduleService from "../services/ModuleService"
import lessonService from "../services/LessonService"
import topicService from "../services/TopicService";
import LessonNavBar from "../components/LessonNavBarComponent";
class CourseEditorComponent extends React.Component {

    componentDidMount() {
        const courseId = this.props.match.params.courseId
        const moduleId = this.props.match.params.moduleId
        const lessonId = this.props.match.params.lessonId
        const topicId = this.props.match.params.topicId

        this.props.findCourseById(courseId)
        this.props.findModulesForCourse(courseId)
        if(moduleId) {
        this.props.findLessonsForModule(moduleId)
        }
        if(lessonId) {
        this.props.findTopicsForLesson(lessonId)
        }
        // if(topicId) {
        // this.props.findWidgetsForTopic(topicId)
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const moduleId = this.props.match.params.moduleId
        const lessonId = this.props.match.params.lessonId
        if(moduleId !== prevProps.match.params.moduleId) {
            this.props.findLessonsForModule(moduleId)
        }
        if(lessonId !== prevProps.match.params.lessonId) {
            this.props.findTopicsForLesson(lessonId)
        }
    }

    render() {
        return(
            <div>
                <div className="container wbdv-course-editer">
                    <div className="row"> 
                    <LessonNavBar course={this.props.course}/>
                    </div>
                    <div className="row">
                        <ModuleListComponent/>
                        <div className="col-sm-8">
                            <br/>
                            <LessonTabs  course={this.props.course}/>
                            <br/>
                            <TopicPills/>
                            <WidgetListComponent/>
                        </div>
                    </div>
                </div>
        </div>
        )
    }    
}

const stateToPropertyMapper = (state) => ({
    course: state.courseReducer.course,
    // module:state.moduleReducer.module,
    // lesson:state.lessonReducer.lesson,
    // topic: state.topicReducer.topic

})

const propertyToDispatchMapper = (dispatch) => ({
    findCourseById: (courseId) => findCourseById(courseId)
        .then(actualCourse => dispatch({
            type: "SET_COURSES",
            course: actualCourse
        })),
    findModulesForCourse: (courseId) => moduleService.findModulesForCourse(courseId)
        .then(actualModule => dispatch({
            type: "FIND_MODLULES_FOR_COURSE",
            modules: actualModule
        })),
    findLessonsForModule: (moduleId) => lessonService.findLessonsForModule(moduleId)
        .then(actualLesson => dispatch({
            type: "FIND_LESSONS_FOR_MODULE",
            moduleId,
            lessons: actualLesson
        })),
    findTopicsForLesson: (lessonId) => topicService.findTopicsForLesson(lessonId)
        .then(actualTopic => dispatch({
            type: "FIND_TOPICS_FOR_LESSON",
            lessonId,
            topics: actualTopic
        }))
})

export default connect(stateToPropertyMapper,propertyToDispatchMapper)(CourseEditorComponent)