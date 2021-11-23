/* import components */
import Breadcrumb from './Breadcrumb';
import Sidebar from './Sidebar';
/* import icon */
import { GiForkKnifeSpoon } from "react-icons/gi";

const Header = () => {
    const breadcrumbLinks = [
        'toutes les recettes',
        'entrées',
        'plats',
        'desserts'
    ];
    /* define the key of breadcrumbLinks which is active */
    const activeLinkKey = 0;

    return (
        <header>
            <h1> <GiForkKnifeSpoon /> TITRE DU SITE</h1>
            <Breadcrumb breadcrumbLinks={breadcrumbLinks} activeLinkKey={ activeLinkKey } />
            <Sidebar />
        </header>
    )
}

export default Header
