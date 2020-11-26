import React from 'react';
import {connect} from "react-redux";
import WidgetList from '../components/WidgetListComponent';

const stateToPropertyMapper = (state) => ({
    widgets: state.widgetReducer.widgets
})

export default connect
    (stateToPropertyMapper)
    (WidgetList)
