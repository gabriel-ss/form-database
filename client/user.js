import EventEmitter from "./event-emitter.js";

const User = (() => {


	const api_url = "http://localhost:3000/api";
	const endpoint = "/users";
	const route = `${api_url}${endpoint}`;


	const User = function(email, password) {

		if (User.instance) return User.instance;

		EventEmitter.call(this);

		this.email = email;


		fetch(route, {
			method: "get",
		})
			.then(response => response.json())
			.then(users => {

				const user = users.find(user => user.email === email);

				if (!user) {

					this.dispatchEvent(new Event("failedlogin"));
					User.instance = void this;

					return;

				}

				if (user.password !== password) {

					this.dispatchEvent(new Event("failedlogin"));
					User.instance = void this;

					return;

				}

				this._id = user._id;
				this.name = user.name;

				Object.defineProperty(User, "instance", {
					value: this,
					writable: false,
				});

				this.dispatchEvent(new Event("successfullogin"));

			});


		return this;

	};

	User.register = (email, name, password) =>
		fetch(route, {
			method: "post",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({
				email,
				name,
				password,
			}).then(response => response.json()),
		});

	User.prototype = Object.assign(EventEmitter.prototype, {

		update(data) {

			return fetch(`${route}/${this._id}/answers`, {
				method: "put",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify(data),
			});

		},
	});

	return User;

})();


export default User;
