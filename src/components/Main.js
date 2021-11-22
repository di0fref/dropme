import Mainheader from "./Mainheader";
import { useEffect, useState } from "react";
import InlineEdit from "./InlineEdit";
import ReactMarkdown from "react-markdown";
import NotesService from "../service/NotesService";
import remarkGfm from "remark-gfm";
import ReactTooltip from "react-tooltip";
import { FaEdit } from "react-icons/fa";

function Main(props) {
	const [markdown, setMarkdown] = useState();
	const [edit, setEdit] = useState(false);
	const [noteId, setNoteId] = useState(false);

	useEffect(() => {
		if (props.id) {
			NotesService.get(props.id)
				.then((result) => {
					setMarkdown(result.data[0].text);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			setMarkdown(false);
		}
	}, [props.id]);

	const clickHandler = () => {
		setEdit(true);
	};

	const onFocusOut = () => {
		setEdit(false);
		const match = markdown.split(/\r?\n/);
		NotesService.update(props.id, {
			text: markdown,
			title: match[0].trunc(24),
		})
			.then((result) => {
				setMarkdown(markdown);
				props.onDone();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<main >
			{/*<Mainheader noteId={props.id} />*/}
			<div className={"p-4 pb-8 bg-white rounded-lg shadow text-sm"}>
				<div >
					{edit && markdown? (
						<InlineEdit
							value={markdown}
							setValue={setMarkdown}
							onBlur={onFocusOut}
						/>
					) : (
						<div onClick={clickHandler} >
							{/* { */}
								{markdown
									? <ReactMarkdown
									children={markdown}
									
									remarkPlugins={[remarkGfm]}
								/>
								: <span ><FaEdit /></span>
							}
						</div>
					)}
				</div>
			</div>
			<ReactTooltip type="dark" effect="solid" />
		</main>
	);
}
export default Main;
