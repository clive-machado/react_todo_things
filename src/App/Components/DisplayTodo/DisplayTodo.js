import React, { Component } from 'react';
import "./DisplayTodo.css";

class DisplayTodo extends Component {

	displayCards(){
		return this.props.data.map((cardElem, index) => {
			return (
			<li key={cardElem.uid} className="cards">
				<button className="deleteCard noBorder zeroOutline" title={ "Delete " + cardElem.title } onClick={ () => this.deleteNote(cardElem.uid) }>
					<i className="fas fa-times"></i>
				</button>
				<input 
						className="editCardTitle zeroOutline noBorder"
						// contentEditable="true"
						// suppressContentEditableWarning={true}
						value={cardElem.title}
						type="text"
						maxLength="50"
						onChange = { (e) => this.editNote(e, cardElem, "title") }
					></input>
				<textarea 
						className="editCardDesc zeroOutline noBorder"
						// contentEditable="true"
						// suppressContentEditableWarning={true}
						type="text"
						maxLength="250"
						value={cardElem.description}
						onChange = { (e) => this.editNote(e, cardElem, "description") }
				 ></textarea>
				{/* <ul>
					{this.displayNotes(cardElem)}
				</ul> */}
			</li>
			)
		});
	}

	displayNotes(cardElem){
		return cardElem.notes.map(noteElem => {
			return (
				<li key={noteElem.uid}>
					<input type="checkbox" checked={noteElem.status} onChange={ () => this.editNote() }/>
					<span>{noteElem.task}</span>
				</li>
			);
		})
	}

	editNote(e, card, key){
		card[key] = e.currentTarget.value;
		if(card.title === "" && card.description === ""){
			this.deleteNote(card.uid);
			return
		}
		this.props.callFunc.updateTodo(card);
	}

	deleteNote(uid){
		this.props.callFunc.removeTodo({ cardUid : uid });
	}
	
	render(){
		return (
			<div className="displayCardContainer" onMouseDownCapture={ () => this.props.hideCardDetails() }>
				<ul className="cardContainer">
					{this.displayCards()}
				</ul>
			</div>	
		)
	}
};

export default DisplayTodo;