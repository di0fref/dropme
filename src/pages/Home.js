import {useState, ReactDOM} from "react";
import {useEffect} from "react/cjs/react.development";
import Main from "../components/Main";
import Notes from "../components/Notes";
import Sidebar from "../components/Sidebar";
import NotesService from "../service/NotesService";
import {FaBars} from "react-icons/fa";

function Home(props) {
    const [noteId, setNoteId] = useState();
    const [notes, setNotes] = useState([]);
    const [categoryId, setCategoryId] = useState("allnotes");

    useEffect(() => {
        getAllNotes();
    }, []);

    // const noteClicked = (e, key) => {
    // 	e.preventDefault();
    // 	setNoteId(key);
    // };

    const noteClicked = (noteid) => {
        document.querySelector(".email-app-mail-content").classList.remove('hide-email-content');
        // document.querySelector(".email-app-mail-content").classList.remove('hide-email-content');
        // document.querySelector(".email-app-mail-content").classList.remove('hide-email-content');
        // document.querySelector(".email-app-mail-content").classList.remove('hide-email-content');

        setNoteId(noteid);
    };

    const onNoteCreated = (noteid) => {
        setNoteId(noteid);
    };
    const getAllNotes = () => {
        NotesService.getAll()
            .then((result) => {
                setNotes(result.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const getNotesByCategory = (category_id) => {
        NotesService.getNotesByCategory(category_id)
            .then((result) => {
                setNotes(result.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onFocusOut = () => {
        categoryId === "allnotes"
            ? getAllNotes()
            : getNotesByCategory(categoryId);
    };

    const categoryClicked = (category_id) => {
        setCategoryId(category_id);
        category_id === "allnotes"
            ? getAllNotes()
            : getNotesByCategory(category_id);

        setNoteId(null);
    };

    const onDeleteNote = (id) => {
        console.log(id);

        NotesService.delete(id)
            .then((result) => {
                categoryId === "allnotes"
                    ? getAllNotes()
                    : getNotesByCategory(categoryId);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <>
            <header className="flex flex-shrink-0">
                <div className="w-64 flex-shrink-0 px-4 py-3 bg-gray-800">
                    <button className="block w-full flex items-center">
                        <img className="h-8 w-8 rounded-full object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=144&amp;q=80"/>
                        <span className="ml-4 mr-2 text-sm font-medium text-white">Akanbi Lawal</span>
                        <svg className="ml-auto h-6 w-6 stroke-current text-gray-400" viewBox="0 0 24 24" fill="none">
                            <path d="M16 10l-4 4-4-4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </button>
                </div>
                <div className="flex-1 flex items-center px-6 justify-between bg-gray-700">
                    <nav className="flex">
                        <a href="#" className="ml-2 text-sm px-3 py-2 leading-none rounded-lg inline-block font-medium text-white hover:bg-gray-600 bg-gray-800">Mailbox</a>
                        <a href="#" className="ml-2 text-sm px-3 py-2 leading-none rounded-lg inline-block font-medium text-white hover:bg-gray-600">Customers</a>
                        <a href="#" className="ml-2 text-sm px-3 py-2 leading-none rounded-lg inline-block font-medium text-white hover:bg-gray-600">Reporting</a>
                        <a href="#" className="ml-2 text-sm px-3 py-2 leading-none rounded-lg inline-block font-medium text-white hover:bg-gray-600">Manage</a>
                    </nav>
                    <div className="flex">
                        <div className="relative py-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <svg className="h-5 w-5 fill-current text-gray-500" viewBox="0 0 24 24">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM0 10C0 4.477 4.477 0 10 0s10 4.477 10 10-4.477 10-10 10S0 15.523 0 10z"></path>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.293 16.293a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414l-6-6a1 1 0 010-1.414z"></path>
              </svg>
            </span>
                            <input className="block pl-10 pr-4 py-2 w-64 bg-gray-900 rounded-lg text-sm placeholder-gray-400 text-white focus:bg-white focus:placeholder-gray-700 focus:text-gray-900 focus:outline-none" placeholder="Search"/>
                        </div>
                        <button className="ml-5 text-gray-400 hover:text-gray-200">
                            <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                                <path d="M8 0a2 2 0 00-2 2v.341C3.67 3.165 2 5.388 2 8v5H1a1 1 0 100 2h14a1 1 0 100-2h-1V8a6.002 6.002 0 00-4-5.659V2a2 2 0 00-2-2zM8 18a2 2 0 01-2-2h4a2 2 0 01-2 2z"></path>
                            </svg>
                        </button>
                        <button className="ml-5 text-gray-400 hover:text-gray-200">
                            <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-1.086-8.724c-.084.56.392 1.022.958 1.022h.47a.525.525 0 00.524-.492c.057-.526.283-.986.676-1.379l.63-.62c.492-.495.836-.944 1.033-1.347.197-.409.295-.842.295-1.299 0-1.005-.303-1.782-.909-2.33C13.985 6.277 13.133 6 12.035 6c-1.088 0-1.947.29-2.58.871a2.84 2.84 0 00-.793 1.28c-.184.604.36 1.131.99 1.131.534 0 .933-.435 1.304-.84.052-.057.103-.114.154-.168.234-.247.542-.37.925-.37.808 0 1.212.454 1.212 1.362 0 .301-.078.589-.233.863-.155.269-.469.621-.94 1.056-.466.43-.787.869-.964 1.315-.087.221-.152.48-.196.776zm.057 2.611c-.233.231-.35.527-.35.887 0 .355.114.648.342.88.233.23.539.346.917.346s.68-.116.909-.347c.233-.231.35-.524.35-.879 0-.36-.12-.656-.358-.887-.233-.237-.534-.355-.901-.355-.368 0-.671.118-.91.355z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </header>
            <div className="wrapper bg-gray-200">
                <div className="main-panel">
                    <div className="main-content">
                        <div className="content-wrapper">
                            <div className="email-application">
                                <div className="content-overlay"></div>


                                <div id="sidebar" className="p-5 bg-gray-100 text-gray-900 email-app-sidebar float-left d-none d-xl-block d-flex_ flex-column flex-shrink-0  text-white bg-dark">
                                    <div className="email-app-sidebar-content">
                                        <div className="email-app-menu">
                                            {/*<h6 className="text-muted text-bold-500 mt-2 mb-1">TITLE</h6>*/}
                                            <Sidebar
                                                categoryClicked={categoryClicked}
                                                noteSubmitted={noteId}
                                                categoryId={categoryId}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="email-app-content _row">
                                    <div className="email-search-box w-100 bg-white p-2">
                                        <div className="media">
                                            {/*<span className="email-app-sidebar-toggle ft-align-justify font-large-1 mr-2 d-xl-none">Menu</span>*/}
                                            <button className="email-app-sidebar-toggle ft-align-justify mr-2 d-xl-none">
                                                <FaBars/></button>
                                            <div className="media-body">
                                                <input type="text" className="form-control round" placeholder="search for emails"/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="email-app-content-area w-100">
                                        <div className="email-app-list-mails p-0">
                                            <div className="email-app-list">
                                                <div id="users-list">
                                                    <div className="list-group">
                                                        <div className="users-list-padding">
                                                            {/*<span className="email-app-sidebar-toggle ft-align-justify font-large-1 mr-2 d-xl-none"></span>*/}
                                                            <Notes
                                                                onDeleteNote={onDeleteNote}
                                                                noteClicked={noteClicked}
                                                                notes={notes}
                                                                onNoteCreated={onNoteCreated}
                                                                categoryId={categoryId}
                                                                id={noteId}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="email-app-mail-content">
                                            <div className="email-app-mail-content-detail p-4">
                                                <div className="email-app-options card__body">
                                                    <div className="ro_w d-md-none">
                                                        <button className="btn btn-raised btn-primary ml-2 back-to-inbox">
                                                            <i className="fa fa-angle-left"></i>Back to inbox
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="media-list">
                                                    <div className="card-content">
                                                        <div className="email-app-text cardbody">
                                                            <div className="email-app-message">
                                                                {/*MAIN*/}
                                                                <Main id={noteId} onDone={onFocusOut}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="email-app-text-action card-content"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
