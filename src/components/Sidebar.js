import Button from './Button';

const Sidebar = () => {
    /* variables */
    const name = 'User name';

    /* redirections */
    const goToProfile = (event) => {
        console.log('profile redirect');
    }

    /* Fetchs */
    const addRecipe = (event) => {
        console.log('nouvelle recette');
    }

    return (
        <div className="sidebar">
            <h2>Hello {name} !</h2>
            <p>Bon Appétit !</p>
            <nav className="sidebar-nav">
                <Button 
                    onClick={ addRecipe }
                    className="sidebar-nav__btn sidebar-nav__btn--create"
                    btnText='Créer une Recette'
                    btnType='addRecipe'
                />
                <Button 
                    onClick={ goToProfile }
                    className="sidebar-nav__btn sidebar-nav__btn--profil"
                    btnText='Mon Profil'
                    btnType='profile'
                />
                <Button 
                    onClick={ goToProfile }
                    className="sidebar-nav__btn sidebar-nav__btn--search"
                    btnText='Recherche'
                    btnType='search'
                />
            </nav>
        </div>
    )
}

export default Sidebar

