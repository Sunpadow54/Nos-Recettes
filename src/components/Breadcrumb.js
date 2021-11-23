/* import icons */
import { MdOutlineArrowRight } from "react-icons/md";

function Breadcrumb({ breadcrumbLinks, activeLinkKey }) {
    const activeLink = breadcrumbLinks[activeLinkKey];

    return (
        <div>
            <nav>
                <ul className="breadcrumb">
                    {breadcrumbLinks.map((link) => (
                        <li 
                            className={activeLink === link ? "breadcrumb__link breadcrumb__link--active" : "breadcrumb__link" } 
                            key={link}>
                                {activeLink === link ? <MdOutlineArrowRight /> : null }
                                {link}
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default Breadcrumb
