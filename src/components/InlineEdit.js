import { useState, useEffect } from "react/cjs/react.development";

const InlineEdit = ({ value, setValue, onBlur }) => {
	const onChange = (event) => setValue(event.target.value);

	const [scrollHeight, setScrollHeight] = useState(0);

	useEffect(() => {
		const el = document.getElementById("notebox");
		setScrollHeight(el.scrollHeight);
	}, []);

	const inputHandler = (e) => {
		setScrollHeight(e.target.scrollHeight);
	};
  
	return (
		<textarea
			
			placeholder="Just start typing"
			id="notebox"
			aria-label="Note"
			onChange={onChange}
			onBlur={onBlur}
			defaultValue={value}
			autoFocus
			onInput={inputHandler}
			style={{ height: scrollHeight }}
		></textarea>
	);
};

export default InlineEdit;
