import { useState, useEffect } from "react";
import { BsCloudDownloadFill, BsTagFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import NotesService from "../service/NotesService";

function Mainheader(props) {
	const [noteId, setNoteId] = useState(props.noteId);
	const [editing, setEditing] = useState(false);

	useEffect(() => {
		setNoteId(props.noteId);
	}, [props.noteId]);

	return (
		<div className="">
			<div >
				<div >
					<button>
						<span >
							<BsCloudDownloadFill />
						</span>
					</button>
					<button >
						<span >
							<BsTagFill />
						</span>
					</button>
					<button data-tip="Move to trash">
						<span >
							<FaTrash />
						</span>
					</button>
					{editing ? (
						<button >
							Save
						</button>
					) : (
						<button >
							Edit
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default Mainheader;
