const formRenderer = template => {

	// TODO: Add other input attributes
	const html = template.map(([fieldName, inputType, fieldInfo]) => {

		switch (inputType) {

		case "radio":
		case "checkbox":
			return `
			<div>
			<label>${fieldInfo.label}</label>
			${
	fieldInfo.values.reduce((output, [value, label]) =>
		`${output}<label>
				<input type="${inputType}" name="${fieldName}" value="${value}" />
				${label}</label>`, "")
}
			</div>`;

		case "select":
			return `
			<label>${fieldInfo.label}
			<select name="${fieldName}" >
			${
	fieldInfo.values.reduce((output, [value, label]) =>
		`${output}
				<option value="${value}" >${label}</option>`, "")
}
			</select>
			</label>`;

		case "date":
			return `
			<label>${fieldInfo.label}
			<input type="${inputType}" name="${fieldName}" value="${fieldInfo.value || ""}" />
			</label>`;

		case "textarea":
			return `
			<label>${fieldInfo.label}
			<textarea name="${fieldName}" placeholder="${fieldInfo.placeholder || ""}" />${fieldInfo.defaultContent || ""}</textarea>
			</label>`;

		default:
			return `
			<label>${fieldInfo.label}
			<input type="${inputType}" name="${fieldName}" placeholder="${fieldInfo.placeholder || ""}" />
			</label>`;

		}

	});

	return html.join("");

};

module.exports = formRenderer;
