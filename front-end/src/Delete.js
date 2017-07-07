import React, { Component } from 'react';
import $ from 'jquery';

class Delete extends Component{
	constructor(props) {
		super(props);
		this.state ={
			task: {}
		}
		this.delTask = this.delTask.bind(this);
		this.waitWait = this.waitWait.bind(this);
	}

	componentDidMount() {
		var taskId = this.props.match.params.taskId;
		$.getJSON(`http://localhost:3000/getTask/${taskId}?apiKey=pa8s97df0a9s8d7fas0d8fua9s08d7fa09s`, (taskticle)=>{
			this.setState({task:taskticle})
		})
	}

	delTask(){
		var taskId = this.props.match.params.taskId;
		$.ajax({
			method: 'POST',
			url: 'http://localhost:3000/delTask?apiKey=pa8s97df0a9s8d7fas0d8fua9s08d7fa09s',
			data: {
				id: taskId
			}
		}).done((deleted)=>{
			this.props.history.push('/');
		})
	}

	waitWait(){
		this.props.history.push('/');
	}


	render(){
		return(
			<div className='container text-center'>
				<h2>Delete the Task: <span className='colors'>{this.state.task.taskName}</span></h2>
				<h3>Are Your Sure?</h3>
				<button className='btn btn-taco' onClick={this.delTask}>Delete!</button>
				<button className='btn btn-notco' onClick={this.waitWait}>Never!</button>
			</div>	
		)
	}
}

export default Delete;