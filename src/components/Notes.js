import {BsPencilSquare, BsSortUp} from "react-icons/bs";
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import Moment from "react-moment";
import {
    FaBars,
    FaEdit,
    FaNotesMedical,
    FaPencilAlt,
    FaSort,
    FaTrash,
    FaTrashAlt,
} from "react-icons/fa";
import NotesService from "../service/NotesService";
import moment from "moment";
import ReactTooltip from "react-tooltip";
import NoteCard from "./NoteCard";

function Notes(props) {
    const [id, setActive] = useState();
    const [notes, setNotes] = useState(props.notes);
    const [categoryId, setCategoryId] = useState(props.categoryId);

    useEffect(() => {
        setNotes(props.notes);
        setCategoryId(props.categoryId);
        ReactTooltip.rebuild();
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
    );
}

export default Notes;
