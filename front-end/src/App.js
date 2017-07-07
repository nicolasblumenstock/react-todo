import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Delete from './Delete';
import Header from './Header';
import Edit from './Edit';
import Desc from './Desc';

class ToDo extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Header />
					<Route exact path='/' component={Home} />
					<Route path='/task/delete/:taskId' component={Delete} />
					<Route path='/task/edit/:taskId' component={Edit} />
					<Route path='/task/desc/:taskId' component={Desc} />
				</div>
			</Router> 
		);
	}
}

export default ToDo;
