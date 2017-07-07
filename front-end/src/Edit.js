import React, {Component} from 'react';
import $ from 'jquery';
import {Link} from 'react-router-dom';

class Edit extends Component{
	constructor(props) {
		super(props);
		this.state = {
			task: {}
		}
		this.editTask = this.editTask.bind(this);
		this.updateName = this.updateName.bind(this);
	}

	componentDidMount() {
		var taskId = this.props.match.params.taskId;
		$.getJSON(`http://localhost:3000/getTask/${taskId}?apiKey=pa8s97df0a9s8d7fas0d8fua9s08d7fa09s`, (taskticle)=>{
			this.setState({task:taskticle})
		})
	}

	updateName(event){
		event.preventDefault();
		var taskName = event.target.parentNode.childNodes[0].value;
		var taskDate = event.target.parentNode.childNodes[1].value;
		var taskId = this.props.match.params.taskId;
		var taskObject = {
			id: taskId,
			taskName: taskName,
			taskDate: taskDate
		}
		console.log(taskObject)
		this.setState({
			task: taskObject
		})

	}

	editTask(event){
		event.preventDefault();
		var taskId = this.props.match.params.taskId;
		var taskToEdit = document.getElementById('editTask').value;
		var dateForEdit = document.getElementById('editDate').value;
		$.ajax({
			method:'POST',
			url: 'http://localhost:3000/editTask?apiKey=pa8s97df0a9s8d7fas0d8fua9s08d7fa09s',
			data: {
				id: taskId,
				task: taskToEdit,
				date: dateForEdit
			}
		}).done((results)=>{
			this.setState({
				task:results
			})
			this.props.history.push('/');
		})
	}

	render(){
		return(
			<div className='container text-center'>
				<h2>Edit Task</h2>
				<form onSubmit={this.editTask} className='text-center'>
					<input type='text' id='editTask' value={this.state.task.taskName} onChange={this.updateName}/>
					<input type='date' id='editDate' value={this.state.task.taskDate} onChange={this.updateName}/>
					<button type='submit' className='btn btn-taco'>Edit Task</button>
				</form>
				<Link to='/'>Home</Link> | 
				<Link to={`/task/desc/${this.state.task.id}`}>Description</Link> | 
				<Link to={`/task/delete/${this.state.task.id}`}>Delete</Link>	

			</div>

		)
	}

}

export default Edit;