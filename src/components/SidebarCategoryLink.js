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
        return (category.id === props.id) ? "bg-gray-200 font-bold" : "";

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
            className={`sidebarlink ml-2 hover:bg-gray-200 text-gray-700 mt-1 -mx-3 px-3 py-2 flex items-center justify-between text-sm font-medium rounded-lg ${getIsActive()}`}

        >
			<span className="inline-flex items-center">
				<span className="leading-normal"><FaFolder className="w-3 h-3 text-yellow-500"/></span>
				<span className={`ml-2 ${(category.id === props.id) ? "text-black" : ""}`}>
					{isActive ? "Release to drop" : (category.title)}
				</span>
			</span>
            {category.count !== 0 ? (
                <span className="w-10 text-center py-1 text-xs font-semibold rounded-full text-gray-700 bg-gray-300">
					{category.count}
				</span>
            ) : null}
        </Link>
    );
};
export default SidebarCategoryLink;
