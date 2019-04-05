import React, { Component } from 'react';
import './App.css';

/**
 * Utility
 */
import Utils from './Utils/Utils.js';

/**
 * Components
 */
import Header from './Components/Header/Header.js';
import AddTodo from './Components/AddTodo/AddTodo.js';
import DisplayTodo from './Components/DisplayTodo/DisplayTodo.js'

class App extends Component {
	
	/**
	 * Life Cycle Methods 
	 */
	constructor(props){
		super(props);
		this.state = {
			todos : [],
			isTitleInputFocused : false,
			callFunc : {
				insertTodo : (card) => { return this.insertTodo(card) },
				removeTodo : (uidObj) => { return this.removeTodo(uidObj) },
				updateTodo : (card) => { return this.updateTodo(card) }
			}
		};
		//Shouldnt be creating refs.
		this.child = React.createRef();
		this.fetchTodo();
	};

  render() {
		return (
			<div className="App">
				<Header />
				<AddTodo 
						displayCardDetails={ this.displayCardDetails } 
						isTitleInputFocused={ this.state.isTitleInputFocused } 
						hideCardDetails={ this.hideCardDetails }
						ref={this.child}
						callFunc={ this.state.callFunc }
						/>
				<DisplayTodo 
						data={ this.state.todos && this.state.todos.length > 0 ? this.state.todos : [] } 
						callFunc={ this.state.callFunc }
						hideCardDetails={ this.hideCardDetails }
				/>
			</div>
		);
	};

	/**
	 * Error Handling
	 */
	 static getDerivedStateFromError = () => {
	 };

	 componentDidCatch = () => {
	 };

	 /**
		* Custom Functions
	 */


	 // Use hooks, context api
	 fetchTodo = () => {
		let that = this;
		Utils.getTodo()
		.then(res => {
			that.setState({ todos : res});
		});
	 };
	 
	 insertTodo = (card) => {
		let that = this;
		return Utils.createTodo(card)
		.then(res => {
			that.setState({ todos : res });
			return res;
		})
	 }

	 updateTodo = (card) => {
		let that = this;
		return Utils.editTodo(card)
		.then((res) => {
			that.setState({ todos : res });
			return res;
		});
	 }

	 removeTodo = (uidObj) => { 
		let that = this;
		return Utils.deleteTodo(uidObj)
		.then((res) => {
			that.setState({ todos : res });
			return res;
		});
	 }

	 displayCardDetails = () => {
		this.setState({ isTitleInputFocused : true });
	 } 

	 hideCardDetails = () => {
		this.child.current.saveCardContent();
		this.setState({ isTitleInputFocused : false });
	 }
}

export default App;
