import React from 'react';

function AddTask(props) {
		return(
			<form onSubmit={props.task} className='text-center'>
				<input type='text' id='newTask' placeholder='task'/>
				<input type='date' id='newDate' />
				<button type='submit' className='btn btn-taco'>Add Task</button>
			</form>
		)
	}



export default AddTask;