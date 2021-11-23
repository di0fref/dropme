import {Link, BrowserRouter as Router} from "react-router-dom";
import {useEffect, useState} from "react/cjs/react.development";
import CategoryService from "../service/CategoryService";
import {FaRegFolder, FaInbox, FaFolderPlus, FaReact} from "react-icons/fa";
import Modal from "react-modal";
import NotesService from "../service/NotesService";
import ReactTooltip from "react-tooltip";
import SidebarCategoryLink from "./SidebarCategoryLink";

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
            zIndex: 1200
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
    //
    // const getResult = (parent) =>
    //     fetchJson(`http://localhost:4000/categories/byparent/${parent}`).then(
    //         (children) => Promise.all(children.map(getResultAux))
    //     );
    //
    // const getResultAux = async (t = {}) => ({
    //     ...t,
    //     children: await getResult(t.id),
    // });
    //
    // const getNode = (data) => {
    //     return (
    //         <ul>
    //             {data.map((item) => (
    //                 <li>
    //                     <label htmlFor={item.id}>{item.title}</label>
    //                     <input type="checkbox" id={item.id}/>
    //                     {/* <Link to="/">{item.title}</Link> */}
    //                     <ul>
    //                         {item.children && item.children.length
    //                             ? item.children.map((subItem) => (
    //                                 <li>
    //                                     {/* <Link to="/">{subItem.title}</Link> */}
    //                                     <label htmlFor={subItem.id}>
    //                                         {subItem.title}
    //                                     </label>
    //                                     <input
    //                                         type="checkbox"
    //                                         id={subItem.id}
    //                                     />
    //                                     <ul>
    //                                         {subItem.children &&
    //                                         subItem.children.length
    //                                             ? subItem.children.map(
    //                                                 (subSubItem) => (
    //                                                     <li>
    //                                                         <Link to="/">{subSubItem.title}</Link>
    //                                                     </li>
    //                                                 )
    //                                             )
    //                                             : null}
    //                                     </ul>
    //                                 </li>
    //                             ))
    //                             : null}
    //                     </ul>
    //                 </li>
    //             ))}
    //         </ul>
    //     );
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
        //     let response = await getResult(0);
        //     setTreeData(response);
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
                    {
                        id: "allnotes",
                        text: "All notebooks",
                        icon: <FaInbox/>,
                        link: false,
                        submenu: result.data,
                        count: 0,

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
            <div class="flex flex-col sm:flex-row sm:justify-around">
                <div class="w-64 h-screen bg-gray-800">
                    <div class="flex items-center justify-center mt-10">
                        <FaReact className={`w-10 h-10 font-bold text-react`}/>
                    </div>

                    <nav class="mt-8">
                        <div>
                            <button class="w-full flex justify-between items-center py-3 px-6 text-gray-100 cursor-pointer hover:bg-gray-700 hover:text-gray-100 focus:outline-none">
                        <span class="flex items-center">
                            <FaInbox className={`h-5 w-5`}/>

                            <span class="mx-4 font-medium">Notebooks</span>
                        </span>
                                <span>
                        </span>
                            </button>
                            <div class="bg-gray-700">
                                {menu.map((item) => {
                                    return (
                                        <>
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
                                                )
                                            })}
                                        </>
                                    )
                                })}

                                {/*<a class="py-2 px-16 block text-sm text-gray-100 hover:bg-blue-500 hover:text-white" href="#">Manage*/}
                                {/*    Accounts</a>*/}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            {/*    <div className="mt-2 -mx-3 px-3 py-1 flex items-center justify-between text-sm font-medium ">*/}
            {/*                <span className="flex items-center">*/}
            {/*                    <span className="text-gray-500 text-sm font-semibold text-gray-600 uppercase tracking-wider">*/}
            {/*                    Notebooks*/}
            {/*                    </span>*/}
            {/*                </span>*/}
            {/*        <span className="w-10 t py-1 text-xs font-medium rounded-full text-gray-700 bg-gray-300_">*/}
            {/*                 <span className="float-right text-gray-300">*/}
            {/*                    <button*/}
            {/*                        to={"/"}*/}
            {/*                        onClick={openModal}*/}
            {/*                        data-tip={`New notebook`}*/}
            {/*                    >*/}
            {/*        <FaFolderPlus className={`h-4 w-4 text-gray-400 hover:text-gray-600`}/>*/}
            {/*    </button>*/}
            {/*</span>*/}
            {/*</span>*/}
            {/*    </div>*/}
            {/*    {menu.map((item) => {*/}
            {/*        return (*/}
            {/*            <>*/}
            {/*                <Link*/}
            {/*                    key={"cat-" + item.id}*/}
            {/*                    id={"cat-" + item.id}*/}
            {/*                    onClick={(e) => {*/}
            {/*                        props.categoryClicked(item.id);*/}
            {/*                        onClick(item.id);*/}
            {/*                    }}*/}
            {/*                    to="/"*/}
            {/*                    className={`mt-2 -mx-3 px-3 py-2 flex items-center justify-between text-sm font-medium rounded-lg  hover:bg-gray-200 ${getIsActive(item)}`}*/}
            {/*                >*/}
            {/*						<span className="inline-flex align-baseline items-center">*/}
            {/*							<span className="leading-normal">*/}
            {/*								{item.icon}*/}
            {/*							</span>*/}
            {/*							<span className="ml-2 text-gray-700">*/}
            {/*								{item.text}*/}
            {/*							</span>*/}
            {/*						</span>*/}
            {/*                    <span className="w-10 text-center py-1 text-xs font-semibold rounded-full text-gray-700 bg-gray-300">*/}
            {/*                            {totalNotes}*/}
            {/*                        </span>*/}
            {/*                </Link>*/}
            {/*                <ul>*/}
            {/*                    {item.submenu.map((subitem) => {*/}
            {/*                        return (*/}
            {/*                            <SidebarCategoryLink*/}
            {/*                                id={id}*/}
            {/*                                key={*/}
            {/*                                    "category-" + subitem.id*/}
            {/*                                }*/}
            {/*                                category={subitem}*/}
            {/*                                categoryClicked={*/}
            {/*                                    props.categoryClicked*/}
            {/*                                }*/}
            {/*                                setId={onClick}*/}
            {/*                            />*/}
            {/*                        );*/}
            {/*                    })}*/}
            {/*                </ul>*/}
            {/*            </>*/}
            {/*        );*/}
            {/*    })}*/}
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
