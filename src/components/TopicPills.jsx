import React from 'react';
import {Link} from 'react-router-dom';
import "../css/course-list.style.css";
import topicService from '../services/TopicService';
import {connect} from 'react-redux';
import { TiTimes,TiPencil } from 'react-icons/ti';
import {HiCheck} from 'react-icons/hi'
import { FaPlus } from 'react-icons/fa';

const TopicPills = (
  {
    course = {},
    moduleId,
    lessonId,
    topics=[],
    createTopicForLesson,
    deleteTopic,
    updateTopic,
    editTopic,
    okTopic,
    activeTopic,
    setActiveTopic,
  }) =>
  <div>
    <ul className="nav nav-tabs">
      {
        topics.map(topic =>
          <li key={topic._id} className={activeTopic === topic._id || topic.editing ? "nav-item active-item" :"nav-item"}>
            <a className="nav-link">
              {
                !topic.editing &&
                <span>
                  <Link
                      onClick={() => {
                          setActiveTopic(topic._id);
                      }}
                      to={`/edit/${course._id}/modules/${moduleId}/lessons/${lessonId}/topics/${topic._id}`}
                  >
                    {topic.title}
                  </Link>
                <TiPencil onClick={() => editTopic(topic)}/>
                </span>
              }
              {
                topic.editing &&
                <span>
                  <input value={topic.title}
                    onChange={(event) => updateTopic({
                      ...topic,
                      title: event.target.value
                    })}
                  />
                  <i onClick={() => deleteTopic(topic._id)}><TiTimes/></i>
                  <i onClick={() => okTopic(topic)}><HiCheck/></i>
                </span>
              }
            </a>
          </li>
        )
      }
      <button className="btn btn-sm" onClick={() => createTopicForLesson(lessonId)}>
        <FaPlus/>
      </button>      
    </ul>

  </div>
 
  const stateToPropertyMapper = (state) => ({
    course: state.courseReducer.course,
    moduleId: state.lessonReducer.moduleId,
    topics: state.topicReducer.topics,
    lessonId: state.topicReducer.lessonId,
    activeTopic: state.activeItemReducer.topic,
  })

const dispatchToPropertyMapper = (dispatch) => ({
  updateTopic: (newTopic) =>
    dispatch({
        type: "UPDATE_TOPIC",
        topic: newTopic
      }),

  deleteTopic: (topicId) =>
    topicService.deleteTopic(topicId)
      .then(status => dispatch({
        type: "DELETE_TOPIC",
        topicId: topicId
      })),

  createTopicForLesson: (lessonId) =>
    topicService.createTopic(
      lessonId, 
      {
      title: "New Topic",
      editing: false
    })
      .then(actualTopic => dispatch({
        type: "CREATE_TOPIC",
        topic: actualTopic
      })),
  setActiveTopic: (topic_id) =>
    dispatch({
        type: "UPDATE_ACTIVE_TOPIC",
        payload: topic_id
    }),
  editTopic: (topic) =>
  topicService.updateTopic(topic._id,
    {
      ...topic, editing : true
    }).then(status =>
      dispatch({
        type: "UPDATE_TOPIC",
        topic: {...topic, editing: true}
      })),

  okTopic: (topic) =>
  topicService.updateTopic(topic._id,
    {
      ...topic, editing : false
    }).then(status =>
      dispatch({
        type: "UPDATE_TOPIC",
        topic: {...topic, editing: false}
      })),
  
})

export default connect
(stateToPropertyMapper,
dispatchToPropertyMapper)
(TopicPills)