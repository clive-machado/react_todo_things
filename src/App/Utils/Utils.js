export default {
	getTodo : (uid) => {
		let promise = new Promise ((resolve, reject) => {
			return localStorage.getItem("todos") && resolve(JSON.parse(localStorage.getItem("todos")))
		});
		return promise;
	},
	createTodo : (card) => {
		let promise = new Promise ((resolve, reject) => {
			!localStorage.getItem("todos") && localStorage.setItem("todos", "[]");
			let tempTodo = JSON.parse(localStorage.getItem("todos"));
			tempTodo.unshift(card);
			localStorage.setItem("todos", JSON.stringify(tempTodo));
			resolve(JSON.parse(localStorage.getItem("todos")));
		});
		return promise
	},
	editTodo : (card) => {
		let promise = new Promise ((resolve, reject) => {
			if (!card.description && !card.title) return;
			let tempTodo = JSON.parse(localStorage.getItem("todos"));
      tempTodo.map((element, index) => {
        if(card.uid === element.uid){
					tempTodo.splice(index, 1, card);
				}
      });
			localStorage.setItem("todos", JSON.stringify(tempTodo));
			resolve(JSON.parse(localStorage.getItem("todos")));
		});
		return promise;
	},
	deleteTodo : (uidObj) => {
		let promise = new Promise ((resolve, reject) => {
			if (!uidObj) return;
			let tempTodo = JSON.parse(localStorage.getItem("todos"));
			tempTodo = tempTodo.filter((element, index) => {
				return uidObj.cardUid !== element.uid;
			});
			localStorage.setItem("todos", JSON.stringify(tempTodo));
			resolve(JSON.parse(localStorage.getItem("todos")));
		});
		return promise;
	}
}