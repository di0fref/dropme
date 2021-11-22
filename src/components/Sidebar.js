import Nav from "./Nav";

function Sidebar(props) {
	return (
		<Nav
			id={props.categoryId}
			categoryClicked={props.categoryClicked}
			onNewBookCreated={props.onNewBookCreated}
			noteSubmitted={props.noteSubmitted}
		/>
	);
}
export default Sidebar;
