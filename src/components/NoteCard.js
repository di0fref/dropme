import {useDrag} from "react-dnd";
import {ItemTypes} from "./Constants";
import {Link} from "react-router-dom";
import Moment from "react-moment";
import {useState, useEffect} from "react";
import {
    FaEdit,
    FaFolder,
    FaNotesMedical,
    FaRegFolder,
    FaSort,
    FaTrash,
} from "react-icons/fa";
import ReactTooltip from "react-tooltip";

function NoteCard(props, {isDragging, id_}) {
    const [id, setActive] = useState();
    const [note, setNote] = useState(props.note);

    const [{opacity}, dragRef] = useDrag(
        () => ({
            type: ItemTypes.CARD,
            item: {note},
            collect: (monitor) => ({
                opacity: monitor.isDragging() ? 0.1 : 1,
            }),
            end: (item, monitor) => {
                const dropResult = monitor.getDropResult();
                if (item && dropResult) {
                    console.log(item);
                    console.log(dropResult);
                }
            },
        }),
        []
    );

    const getIsActive = () => {
        // return note.id === props.id ? "active" : "";
    };

    useEffect(() => {
        setNote(props.note);
        ReactTooltip.rebuild();
    }, [props.note, id]);

    const getIngress = (text) => {
        const splitted = text.split(/\r?\n/);

        if (typeof splitted[2] === "string") {
            return splitted[2].trunc(95);
        } else {
            return "...";
        }
    };
    return (

        <Link
            ref={dragRef}
            style={{opacity}}
            role="card"
            id={note.id}
            onClick={() => {
                props.noteClicked(note.id);
                props.setId(note.id);
            }}
            to={"/"}
            className={`block px-6 pt-3 pb-4 bg-white border-t ${getIsActive()}`}

        >
            <div className="flex justify-between">
                <span className="text-sm font-semibold ">{note.title} </span><span className={`text-sm text-gray-500 ${getIsActive()}`}><time dateTime="1637079300000">5 days ago</time></span>
            </div>
            <p className="text-sm mt-2">{getIngress(note.text)}</p>
            <div className="text-gray-400 mt-2 text-xs">
                <span className="inline-flex align-baseline">
                    <span className={`leading-normal ${getIsActive()}`}>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M464 128H272l-54.63-54.63c-6-6-14.14-9.37-22.63-9.37H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V176c0-26.51-21.49-48-48-48zm0 272H48V112h140.12l54.63 54.63c6 6 14.14 9.37 22.63 9.37H464v224z"></path></svg></span>
                    <span className={`ml-2 text-gray-400 ${getIsActive()}`}>{note.category_name}</span></span>
            </div>
        </Link>
    );
}

export default NoteCard;
