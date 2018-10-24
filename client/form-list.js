import EventEmitter from "./event-emitter.js";
import Form from "./form.js";

const FormList = (() => {

	const api_url = "http://localhost:3000/api";
	const endpoint = "/forms";
	const route = `${api_url}${endpoint}`;

	const FormList = function(creatorID) {

		if (FormList.instance) return FormList.instance;

		EventEmitter.call(this);

		fetch(route, {
			method: "get",
		})
			.then(response => response.json())
			.then(allForms => {

				const forms = allForms.filter(form => form.creatorID === creatorID);

				this.list = forms.map(({_id, formTitle, template}) =>
					new Form(_id, formTitle, creatorID, template));

				this.dispatchEvent(new Event("load"));

			});

		Object.defineProperty(FormList, "instance", {
			value: this,
			writable: false,
		});

		return this;

	};


	FormList.prototype = Object.assign(EventEmitter.prototype, {

		addForm(title, creatorID, template) {

			const form = Form.create(title, creatorID, template);

			this.list.push(form);

		},

		deleteForm(_id) {

			this.list.find(form => form._id === _id).delete();
			this.list = this.list.filter(form => form._id !== _id);
			this.dispatchEvent(new Event("load"));

		},

	});

	return FormList;

})();


export default FormList;
