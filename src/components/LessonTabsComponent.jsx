import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import "../css/course-list.style.css";
import lessonService from '../services/LessonService';
import {connect} from 'react-redux';
import { TiTimes,TiPencil } from 'react-icons/ti';
import {HiCheck} from 'react-icons/hi'
import { FaPlus } from 'react-icons/fa';

const LessonTabs = (
  {
    course = {},
    moduleId,
    lessons=[],
    createLessonForModule,
    deleteLesson,
    updateLesson,
    editLesson,
    okLesson,
    activeLesson,
    setActiveLesson,
  }) =>
  <div>
    <ul className="nav nav-tabs">
      {
        lessons.map(lesson =>
          <li key={lesson._id} className={activeLesson === lesson._id || lesson.editing? "nav-item active-item" :"nav-item"}>
            <a className="nav-link">
              {
                !lesson.editing &&
                <span>
                <Link
                    onClick={() => {
                        setActiveLesson(lesson._id);
                    }}
                    to={`/edit/${course._id}/modules/${moduleId}/lessons/${lesson._id}`}
                >{lesson.title}</Link>
                <TiPencil onClick={() => editLesson(lesson)}/>
                </span>
              }
              {
                lesson.editing &&
                <span>
                  <input value={lesson.title}
                  onChange={(event) => updateLesson({
                    ...lesson,
                    title: event.target.value
                  })}
                  />
                  <i onClick={() => deleteLesson(lesson._id)}><TiTimes/></i>
                  <i onClick={() => okLesson(lesson)}><HiCheck/></i>
                </span>
              }
           
            </a>
          </li>
        )
      }
      <button className="btn btn-sm" onClick={() => createLessonForModule(moduleId)}>
        <FaPlus/>
      </button>      
    </ul>

  </div>
 
const stateToPropertyMapper = (state) => ({
  course: state.courseReducer.course,
  lessons: state.lessonReducer.lessons,
  moduleId: state.lessonReducer.moduleId,
  activeLesson: state.activeItemReducer.lesson,
})

const dispatchToPropertyMapper = (dispatch) => ({
  updateLesson: (newLesson) =>
     dispatch({
        type: "UPDATE_LESSON",
        lesson: newLesson
      }),
  deleteLesson: (lessonId) =>
    lessonService.deleteLesson(lessonId)
      .then(status => dispatch({
        type: "DELETE_LESSON",
        lessonId: lessonId
      })),
  setActiveLesson: (lessonId) =>
    dispatch({
        type: "UPDATE_ACTIVE_LESSON",
        payload: lessonId
    }),
  createLessonForModule: (moduleId) =>
    lessonService.createLesson(
      moduleId, {
      title: "New Lesson",
      editing: false
    })
      .then(actualLesson => dispatch({
        type: "CREATE_LESSON",
        lesson: actualLesson
      })),
  editLesson: (lesson) =>
  lessonService.updateLesson(lesson._id,
    {
      ...lesson, editing: true
    }).then(status =>
      dispatch({
        type: "UPDATE_LESSON",
        lesson: {...lesson, editing: true}
      })),
  okLesson: (lesson) =>
  lessonService.updateLesson(lesson._id,
    {
      ...lesson, editing: false
    }).then(status =>
      dispatch({
        type: "UPDATE_LESSON",
        lesson: {...lesson, editing: false}
      }))
})


export default connect
(stateToPropertyMapper,
  dispatchToPropertyMapper)
(LessonTabs)