import {useState} from "react";
import {useDrop} from "react-dnd";
import {FaFolder, FaFolderOpen, FaRegFolder} from "react-icons/fa";
import {Link} from "react-router-dom";
import {useEffect} from "react/cjs/react.development";
import {ItemTypes} from "./Constants";

const SidebarCategoryLink = (props) => {
    const [category, setCategory] = useState([]);
    const [id, setActive] = useState();

    useEffect(() => {
        setCategory(props.category);
    }, [props.category, id]);

    const [{canDrop, isOver}, drop] = useDrop(() => ({
        accept: ItemTypes.CARD,
        drop: () => ({name: "SidebarCategoryLink", category_id: props.id}),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));
    const isActive = canDrop && isOver;
    let backgroundColor = "#222";
    if (isActive) {
        backgroundColor = "darkgreen";
    } else if (canDrop) {
        backgroundColor = "darkkhaki";
    }

    const getIsActive = () => {
        // return category.id === props.id ? "active" : "";
        return (category.id === props.id) ? "bg-blue-500 font-bold" : "";

    };
    const click = () => {
        document.querySelector(".email-app-sidebar").classList.add('d-none');
        document.querySelector(".email-app-sidebar").classList.remove("d-block");
        document.querySelector(".content-overlay").classList.remove("show");
    }
    return (
        <Link
            onClick={() => {
                props.categoryClicked(category.id);
                props.setId(category.id);
                click()
            }}
            to="/"
            ref={drop}
            role={"SidebarCategoryLink"}
            className={`py-2 pl-10 pr-6 block text-sm text-gray-100 hover:bg-blue-500 hover:text-white  ${getIsActive()} ${isActive?"bg-gray-800 text-white":""} `}

        >
            <span className={`flex justify-between items-center`}>
                <span><FaRegFolder className={`text-yellow-500`}/></span>
                <span className={`flex-grow pl-2`}>{isActive ? "Release to drop" : (category.title)}</span>
                {category.count !== 0
                    ? (<span className={`w-8 text-center py-1 text-xs font-semibold rounded-full text-white bg-gray-800`}>{category.count}</span>)
                    : (<span className={`w-8 py-1 `}></span>)}
            </span>
			{/*<span className="inline-flex items-center">*/}
			{/*	<span className="leading-normal">*/}
            {/*        <FaFolder className="w-3 h-3 text-yellow-500"/>*/}
            {/*    </span>*/}
			{/*	<span className={`ml-2 ${(category.id === props.id) ? "text-black" : ""}`}>*/}
			{/*		{isActive ? "Release to drop" : (category.title)}*/}
			{/*	</span>*/}
			{/*</span>*/}
            {/*{category.count !== 0 ? (*/}
            {/*    <span className="w-10 text-center py-1 text-xs font-semibold rounded-full text-gray-700 bg-gray-300">*/}
			{/*		{category.count}*/}
			{/*	</span>*/}
            {/*) : null}*/}
            {/*{isActive ? "Release to drop" : (category.title)}*/}
        </Link>
    );
};
export default SidebarCategoryLink;
