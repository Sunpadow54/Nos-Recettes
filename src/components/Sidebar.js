import Button from './Button';
/* import icon */
import { AiOutlineMenuFold } from "react-icons/ai";

const Sidebar = () => {
    /* variables */
    const name = 'User name';
    const slideState = 'in';

    /* redirections */
    const goToProfile = (event) => {
        console.log('profile redirect');
    }

    /* Fetchs */
    const addRecipe = (event) => {
        console.log('nouvelle recette');
    }

    /* Slide In / Out btn */


    return (
        <div className="sidebar">
            <button className="btn-slide">
                <AiOutlineMenuFold />
            </button>
            <div className="sidebar-content">
                <h2>Hello {name} !</h2>
                <p>Bon Appétit !</p>
                <nav className="sidebar-content-nav">
                    <Button 
                        onClick={ addRecipe }
                        className="sidebar-content-nav__btn sidebar-content-nav__btn--create"
                        btnText='Créer une Recette'
                        btnType='addRecipe'
                    />
                    <Button 
                        onClick={ goToProfile }
                        className="sidebar-content-nav__btn sidebar-content-nav__btn--profil"
                        btnText='Mon Profil'
                        btnType='profile'
                    />
                    <Button 
                        onClick={ goToProfile }
                        className="sidebar-content-nav__btn sidebar-content-nav__btn--search"
                        btnText='Recherche'
                        btnType='search'
                    />
                </nav>
            </div>
        </div>
    )
}

export default Sidebar

