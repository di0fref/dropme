import {BsPencilSquare, BsSortUp} from "react-icons/bs";
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import Moment from "react-moment";
import {
    FaBars,
    FaEdit, FaFolder,
    FaNotesMedical,
    FaPencilAlt, FaSearch,
    FaSort,
    FaTrash,
    FaTrashAlt,
} from "react-icons/fa";
import NotesService from "../service/NotesService";
import moment from "moment";
import ReactTooltip from "react-tooltip";
import NoteCard from "./NoteCard";
import CategoryService from "../service/CategoryService";

function Notes(props) {
    const [id, setActive] = useState();
    const [notes, setNotes] = useState(props.notes);
    const [categoryId, setCategoryId] = useState(props.categoryId);
    const [category, setCategory] = useState(props.categoryId);

    useEffect(() => {
        setNotes(props.notes);
        setCategoryId(props.categoryId);
        ReactTooltip.rebuild();

        if(props.categoryId) {
            CategoryService.get(props.categoryId)
                .then((result) => {
                    setCategory(result.data[0])
                }).catch((err) => {
                console.log(err);
            });
        }

    }, [props.notes, props.categoryId]);

    const onClick = (id) => {
        setActive(id);
    };
    const newNoteClicked = () => {
        const newid = moment().valueOf();
        const note = {
            date_modified: moment().format("YYYY-MM-DD HH:mm:ss"),
            title: "Untitled",
            text: "",
            id: newid,
            category_id: categoryId === "allnotes" ? null : categoryId,
        };
        NotesService.create(note)
            .then((result) => {
                // console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
        setNotes((notes) => [...[note], ...notes]);
        props.onNoteCreated(newid);
        setActive(newid);
    };
    const toggleNav = (e) => {

        // e.target.classList("show");
        document.querySelector(".wrapper").classList.toggle('hide');

    };
    return (

        <>
            <div className={`bg-gray-200 flex flex-row justify-between items-center border-b`}>
                <div>
                    <button className="my-4 ml-3 email-app-sidebar-toggle ft-align-justify mr-2 ">
                        <FaBars className={`h-5 w-5 d-md-none`}/>
                    </button>
                </div>
                <div className={`flex-grow bg-white_ mx-4`}>
                    <input type={`text`} className={`w-full px-2 py-1 rounded-xl border border-gray-300 bg-gray-100`} placeholder={`Search`}/>
                </div>
                <div>
                    <button onClick={newNoteClicked} data-tip="Create note" className={`my-3 mr-3 `}>
					<span className="text-gray-600">
						<BsPencilSquare className="h-6 w-6 text-gray-500 hover:text-gray-600" data-tip={"New note"}/>
					</span>
                    </button>
                </div>
            </div>


            <div className="inline-flex items-center bg-white py-2 pl-6 w-full d-xl-none">
				<span className="leading-normal">
                    <FaFolder className="w-3 h-3 text-yellow-500"/>
                </span>
				<span className={`ml-2 text-sm`}>
					{category?category.title:"All notes"}
				</span>
			</div>
            {notes.length > 0
                ? (
                    <div>
                        {notes.map((note) => (
                            <NoteCard
                                note={note}
                                noteClicked={props.noteClicked}
                                setId={onClick}
                                id={id}
                                key={"note-" + note.id}
                                active={props.noteid}
                            />
                        ))}
                    </div>
                )
                : (
                    <div className="p-3 w-full text-center text-gray-500 my-20 font-th_in">
                        <p className="text-lg font-th_in">No notes</p>
                        <span className="text-sm">
								Create new by clicking
							</span>
                        <span>
								<BsPencilSquare className="inline ml-2"/>
							</span>
                    </div>
                )}
        </>
    );
}

export default Notes;
