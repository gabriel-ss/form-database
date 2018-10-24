import framework from "./framework/index.js";
import User from "./user.js";
import FormList from "./form-list.js";

// HACK: The whole file was done in a hurry, it is poorly written, poorly
// optimized and inelegant, rewrite it from scratch

document.querySelector("#login-button")
	.addEventListener("click", event => {

		event.preventDefault();

		const loginForm = document.querySelector("#login-form");
		const email = loginForm.querySelector("input[type='email']").value;
		const password = loginForm.querySelector("input[type='password']").value;

		if (!loginForm.reportValidity()) return;

		const currentUser = new User(email, password);


		currentUser.addEventListener("failedlogin", () => {

			const alert = document.createElement("div");

			alert.classList.add("alert", "danger");
			alert.innerText = "Invalid user or password";

			document.querySelector("#alert-display").appendChild(alert);

		});


		currentUser.addEventListener("successfullogin", () => {

			framework("#dashboard-view")[0].displayView();


			const formsDisplay = document.querySelector("#form-list");
			const answersDisplay = document.querySelector("#answers-display");
			const userForms = new FormList(currentUser._id);
			let currentForm;


			userForms.addEventListener("load", () => {

				formsDisplay.innerHTML = "";

				userForms.list.forEach(form => {

					const listItem = document.createElement("li");

					listItem.innerHTML = form.title;
					formsDisplay.appendChild(listItem);

					listItem.addEventListener("click", () => {

						currentForm = form;

						form.getAnswers().then(answers => {

							if (!answers.length) {

								answersDisplay.innerHTML =
									"This form hasn't been answered yet";

								return;

							}

							answersDisplay.innerHTML =
								answers.reduce((html, answer) =>
									`${html}<div class="slideshow-content">
										${Object.entries(answer).reduce(
											(content, [field, value]) =>
												`${content}<strong>${field}</strong>
												${value}<br /><br />`
											, "")}
									</div>`
								, "");

							answersDisplay.children[0].classList.add("active");

						});

					});

				});

			});


			document.querySelector("#create-button")
				.addEventListener("click", () => {

					const title =
						document.querySelector("#form-creator input").value;
					const templateString =
						document.querySelector("#form-creator textarea").value;

					userForms.addForm(
						title,
						currentUser._id,
						JSON.parse(templateString),
					);

					const listItem = document.createElement("li");

					listItem.innerHTML = title;
					formsDisplay.appendChild(listItem);

				});

			document.querySelector("#delete-button")
				.addEventListener("click", () => {

					userForms.deleteForm(currentForm._id);
					answersDisplay.innerHTML = "";

				});

			document.querySelector("#clear-button")
				.addEventListener("click", () => {

					currentForm.clearAnswers();
					answersDisplay.innerHTML =
						"This form hasn't been answered yet";

				});

		});

	});
