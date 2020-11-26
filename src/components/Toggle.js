import React, {Component} from 'react';
import CourseGrid from './CourseGridComponent';
import CourseTable from './CourseTableComponent';

class Toggle extends Component {
    state={
        value:true,
        courses:this.props.courses
    }

    handleClick = () => {
        const newValue = !this.state.value
        this.setState({
            value: newValue
        })
    }

    render() {      
        return (    
            <div> 
                <button className="btn-info btn-sm" onClick={this.handleClick}>
                    Toggle
                </button>
                {!this.state.value && <CourseGrid courses={this.state.courses}/>}
                {this.state.value && <CourseTable courses={this.state.courses} instructer="Chengcheng" term="2020fall"/>}
            </div>            
        )           
    }
}
export default Toggle;