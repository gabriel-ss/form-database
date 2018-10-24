const Form = (() => {

	const api_url = "http://localhost:3000/api";
	const endpoint = "/forms";
	const route = `${api_url}${endpoint}`;

	const Form = function(id, title, creatorID, template) {

		this._id = id;
		this.title = title;
		this.creatorID = creatorID;
		this.template = template;
		this.answers = [];

	};

	Form.create = (formTitle, creatorID, template) =>
		fetch(route, {
			method: "post",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({
				formTitle,
				creatorID,
				template,
				answers: [],
			}),
		});

	Form.prototype = {

		answer(ans) {

			return fetch(`${route}/${this._id}/answers`, {
				method: "post",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify(ans),
			});

		},

		getAnswers() {

			return fetch(`${route}/${this._id}/answers`, {
				method: "get",
			})
				.then(response => response.json())
				.then(answers => (this.answers = answers));

		},

		clearAnswers() {

			return fetch(`${route}/${this._id}/answers`, {
				method: "delete",
			});

		},

		delete() {

			return fetch(`${route}/${this._id}`, {
				method: "delete",
			});

		},

	};

	return Form;

})();


export default Form;
