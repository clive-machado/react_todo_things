import React, { Component } from 'react';
import "./AddTodo.css";

class AddTodo extends Component {

	constructor(props){
		super(props);
		this.state = {
			tempCard : this.resetTempCard()
		}
	}

	resetTempCard(){
		return {
			"title" : "",
			"description" : "",
			"uid" : this.generateUid(8),
			"notes" : []
		}
	}

	saveCardContent(){
		if(this.validateData()){
			this.props.callFunc.insertTodo(this.state.tempCard)
			.then(res => {
				this.setState({ tempCard : this.resetTempCard() });
			})
		}
	}

	cardClose() {
		this.props.hideCardDetails();
	};

	validateData() {
		if(this.state.tempCard){
			return this.state.tempCard.title === "" && this.state.tempCard.description === "" ? false : true;
		}
	}

	generateUid = (length) => {
		let text = "";
		let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		for (var i = 0; i < length; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		return text;
	}

	createTempCard = (e, inputType) => {
		const inputVal = e.currentTarget.value;
		switch (inputType) {
			case "cardTitle" :
				this.setState((prevState, prop )=> ({
					tempCard: {
						...prevState.tempCard,
						title: inputVal
					}
				}))
				break;
			case "cardDescription" :
				this.setState(prevState => ({
					tempCard: {
						...prevState.tempCard,
						description: inputVal
					}
				}));
				break;
		};
	}

	createCardComponent = () => {
		return (
			<div className="createCardWrapper">
				<input 
						className="createCardTitle zeroOutline noBorder"
						type="text"
						placeholder="Begin with a card title..."
						maxLength="50"
						value={ this.state.tempCard.title }
						onFocus={ this.props.displayCardDetails }
						onChange={ (e) => this.createTempCard(e, "cardTitle") }
					/>
				<div className={this.props.isTitleInputFocused ? "cardDetailsWrapper blockDisplay" : "cardDetailsWrapper noDisplay"} >
					<textarea 
							className="createCardDesc zeroOutline noBorder " 
							placeholder="Describe what this card is about..." 
							maxLength="250" 
							value={ this.state.tempCard.description }
							onChange={ (e) => this.createTempCard(e, "cardDescription") }
						/>
					{/* <ul className="createNotesContainer">
					</ul> */}
					<button className="createCardClose noBorder zeroOutline" onClick={ () => this.cardClose() }>Close</button>
				</div>
			</div>
		)
	}

	render(){
		return (
			<div className="createCardContainer">
				{this.createCardComponent()}
			</div>
		)
	}
};

export default AddTodo;