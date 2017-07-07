import React, { Component } from 'react';
import $ from 'jquery';
import {Link} from 'react-router-dom';

class Desc extends Component{
	constructor(props) {
		super(props);
		this.state = {
			task: {}
		}
	}

	componentDidMount() {
		var key= 'pa8s97df0a9s8d7fas0d8fua9s08d7fa09s'
		var taskId = this.props.match.params.taskId;
		$.getJSON(`http://localhost:3000/getTask/${taskId}?apiKey=${key}`, (taskticle)=>{
			this.setState({task:taskticle})
		})
	}

	render(){
		return(
			<div className='container text-center'>
				<h2>Task: {this.state.task.taskName}</h2>
				<h3>On: {this.state.task.taskDate}</h3>
				<Link to='/'>Home</Link> | 
				<Link to={`/task/edit/${this.state.task.id}`}>Edit</Link> | 
				<Link to={`/task/delete/${this.state.task.id}`}>Delete</Link>	
			</div>
		)
	}


}

export default Desc;