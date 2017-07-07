import React, { Component } from 'react';
import $ from 'jquery';
import AddTask from './AddTask';
import { Link } from 'react-router-dom';

class Home extends Component{
	constructor(props) {
		super(props);
		this.state = {
			theTasks: []
		}
		this.addTask = this.addTask.bind(this)
	}

	componentDidMount() {
		$.getJSON('http://localhost:3000/getTasks?apiKey=pa8s97df0a9s8d7fas0d8fua9s08d7fa09s', (taskity)=>{
			for(let i = 0; i < taskity.length; i++){
				taskity[i].taskDate = taskity[i].taskDate.slice(0,10);
			}
			this.setState({
				theTasks: taskity
			})
		})
	}

	addTask(event){
		event.preventDefault();
		var taskToAdd = document.getElementById('newTask').value;
		var dateForAdd = document.getElementById('newDate').value;
		console.log(taskToAdd,dateForAdd)
		$.ajax({
			method: 'POST',
			url: this.state.url,
			data: {
				task: taskToAdd,
				date: dateForAdd
			}
		}).done((taskArray)=>{
			for(let i = 0; i < taskArray.length; i++){
				taskArray[i].taskDate = taskArray[i].taskDate.slice(0,10);
				console.log(taskArray[i])
			}			
			this.setState({
				theTasks: taskArray
			})
		})
}

	render(){
		var theTaskArray = [];
		this.state.theTasks.map((tasks,index)=>{
			theTaskArray.push(
					<li key={index}>
						<Link to={`/task/desc/${tasks.id}`}>{tasks.taskName}</Link> | 
						<Link to={`/task/edit/${tasks.id}`}>Edit</Link> | 
						<Link to={`/task/delete/${tasks.id}`}>Delete</Link>
					</li>
			)
			return 'boo'
		})		
		return(
			<div className='add-box'>
			<AddTask task={this.addTask} />
			<ul>
				{theTaskArray}
			</ul>
			</div>

		)
	}

}

export default Home;