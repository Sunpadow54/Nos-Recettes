import { useState } from "react";
import { useMediaQuery } from "react-responsive";
/* import components */
import Breadcrumb from "./Breadcrumb";
import Sidebar from "./Sidebar";
/* import icon */
import { GiForkKnifeSpoon } from "react-icons/gi";
import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const Header = (props) => {
    // ---- Breadcrumb
    const breadcrumbLinks = [
        "toutes les recettes",
        "entrées",
        "plats",
        "desserts",
    ];
    const activeLinkKey = 0; // define the key of breadcrumbLinks which is active
    // ---- Sidebar
    // hidden sidebar ?
    const [isHidden, setHidden] = useState(true);
    const toogleSidebar = () => {
        setHidden(!isHidden);
        props.toogleShrink(isHidden);
    };
    // sidebar icon
    const isDesktop = useMediaQuery({ query: "(min-width: 800px)" });
    const sidebarIcon = () => {
        switch (true) {
            case (isDesktop && isHidden):
                return <IoIosArrowBack />
            case (isDesktop && !isHidden):
                return <IoIosArrowForward />
            case (!isDesktop && isHidden):
                return <RiMenuFoldLine />
            case (!isDesktop && !isHidden):
                return <RiMenuUnfoldLine />
            default:
                return <IoIosArrowForward />
        };
    }

    return (
        <header>
            <h1 className={`${isHidden ? "grow" : "shrink"}`}>
                <GiForkKnifeSpoon />
                TITRE DU SITE
            </h1>
            <nav className={`${isHidden ? "grow" : "shrink"}`}>
                <Breadcrumb
                    breadcrumbLinks={breadcrumbLinks}
                    activeLinkKey={activeLinkKey}
                />
            </nav>
            <div className={`sidebar ${isHidden ? "sidebar--hide" : "sidebar--show"}`}>
                <button
                    className="btn-slide"
                    onClick={toogleSidebar}>
                    {sidebarIcon()}
                </button>
                <Sidebar />
            </div>
        </header>
    );
};


export default Header;
