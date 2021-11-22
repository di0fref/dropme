import {Link, BrowserRouter as Router} from "react-router-dom";
import {useEffect, useState} from "react/cjs/react.development";
import CategoryService from "../service/CategoryService";
import {FaRegFolder, FaInbox, FaPlusCircle} from "react-icons/fa";
import Modal from "react-modal";
import NotesService from "../service/NotesService";
import ReactTooltip from "react-tooltip";
import SidebarCategoryLink from "./SidebarCategoryLink";
import {Offcanvas, Button} from "react-bootstrap";

function Nav(props) {
    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "30em",
            height: "12em",
        },
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
        },
    };

    const [id, setActive] = useState("allnotes");
    const [menu, setMenu] = useState([]);
    const [newBookName, setNewBookName] = useState("");
    const [modalIsOpen, setIsOpen] = useState(false);
    const [bookSubmitted, setBookSubmitted] = useState(false);
    const [totalNotes, setTotalNotes] = useState(false);
    const [categoryId, setCategoryId] = useState(props.categoryId);
    const [treeData, setTreeData] = useState([]);

    /**************************************** */
    // const fetchJson = (url) => fetch(url).then((r) => r.json());

    // const getResult = (parent) =>
    // 	fetchJson(`http://localhost:4000/categories/byparent/${parent}`).then(
    // 		(children) => Promise.all(children.map(getResultAux))
    // 	);

    // const getResultAux = async (t = {}) => ({
    // 	...t,
    // 	children: await getResult(t.id),
    // });

    // const getNode = (data) => {
    // 	return (
    // 		<ul >
    // 			{data.map((item) => (
    // 				<li>
    // 					<label htmlFor={item.id}>{item.title}</label>
    // 					<input type="checkbox" id={item.id} />
    // 					{/* <Link to="/">{item.title}</Link> */}
    // 					<ul >
    // 						{item.children && item.children.length
    // 							? item.children.map((subItem) => (
    // 									<li>
    // 										{/* <Link to="/">{subItem.title}</Link> */}
    // 										<label htmlFor={subItem.id}>
    // 											{subItem.title}
    // 										</label>
    // 										<input
    // 											type="checkbox"
    // 											id={subItem.id}
    // 										/>
    // 										<ul >
    // 											{subItem.children &&
    // 											subItem.children.length
    // 												? subItem.children.map(
    // 														(subSubItem) => (
    // 															<li>
    // 																<Link to="/">{subSubItem.title}</Link>
    // 															</li>
    // 														)
    // 												  )
    // 												: null}
    // 										</ul>
    // 									</li>
    // 							  ))
    // 							: null}
    // 					</ul>
    // 				</li>
    // 			))}
    // 		</ul>
    // 	);
    // };
    /******************************************* */

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
        setBookSubmitted(false);
    }

    useEffect(() => {
        // (async () => {
        // 	let response = await getResult(0);
        // 	setTreeData(response);
        // })();

        setCategoryId(props.categoryId);
        NotesService.count()
            .then((result) => {
                setTotalNotes(result.data[0].count);
            })
            .catch((err) => {
                console.log(err);
            });
        CategoryService.getAll()
            .then((result) => {
                setMenu([
                    // {
                    //     id: "allnotes",
                    //     text: "All notes",
                    //     icon: <FaInbox/>,
                    //     link: true,
                    //     submenu: [],
                    //     count: totalNotes,
                    // },
                    {
                        id: "noteboks",
                        text: "Notebooks",
                        // icon: <FaRegFolder/>,
                        link: false,
                        submenu: result.data,
                        count: 0,
                        actionIcon: {
                            tooltip: "Create notebook",
                            icon: <FaPlusCircle onClick={openModal}/>,
                        },
                    },
                ]);
            })
            .catch((err) => {
                console.log(err);
            });

        ReactTooltip.rebuild();
    }, [bookSubmitted, props.noteSubmitted, props.categoryId]);

    const onClick = (id) => {
        setActive(id);
    };

    const newBookSubmit = (e) => {
        e.preventDefault();
        CategoryService.create({name: newBookName})
            .then((result) => {
                CategoryService.getAll()
                    .then((result) => {
                        setBookSubmitted(true);
                        closeModal();
                    })
                    .catch((err) => {
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const modalOnChange = (e) => {
        setNewBookName(e.target.value);
    };

    const getIsActive = (item) => {
        return item.id === id ? "bg-gray-200 font-bold" : "";
    };
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>

            {menu.map((item) => {
                return (
                    <div key={item.id}>
                        {item.link ? (
                            <>
                            {/*<Link*/}
                            {/*    key={"cat-" + item.id}*/}
                            {/*    id={"cat-" + item.id}*/}
                            {/*    onClick={(e) => {*/}
                            {/*        props.categoryClicked(item.id);*/}
                            {/*        onClick(item.id);*/}
                            {/*    }}*/}
                            {/*    to="/"*/}
                            {/*    className={`${getIsActive(item)}`}*/}
                            {/*>*/}
							{/*			<span>*/}
							{/*				<span>{item.icon}</span>*/}
							{/*				<span>{item.text}</span>*/}
							{/*			</span>*/}
                            {/*    <span>{totalNotes}</span>*/}
                            {/*</Link>*/}
                            </>
                        ) : (
                           <></>
                        )}
                        <h1><a href="index.html" className="logo">Notebooks</a></h1>

                        <ul>
                            {item.submenu.map((subitem) => {
                                return (
                                        <SidebarCategoryLink
                                            id={id}
                                            key={
                                                "category-" + subitem.id
                                            }
                                            category={subitem}
                                            categoryClicked={
                                                props.categoryClicked
                                            }
                                            setId={onClick}
                                        />
                                );
                            })}
                        </ul>
                    </div>
                );
            })}
            <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Add notebook"
                ariaHideApp={false}
            >
                <h2>Add notebook</h2>
                {/* <button onClick={closeModal}>close</button> */}
                <form>
                    <div>
                        <div>
                            <div>
                                <div className="">
                                    <input
                                        requied="true"
                                        type="text"
                                        name="name"
                                        placeholder="New notebook name"
                                        onChange={modalOnChange}
                                    />
                                </div>

                                <button type="submit">Create</button>
                                <button onClick={closeModal}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>

        </>
    );
}

export default Nav;
