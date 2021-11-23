import PropTypes from 'prop-types'
import Button from './Button';

const Header = (props) => {
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
        <header>
            <h1>Hello {name} !</h1>
            <p>{props.title}</p>
            <nav className="header-nav">
                <Button 
                    onClick={ addRecipe }
                    className="header-nav__btn header-nav__btn--create"
                    btnText='Créer une Recette'
                    btnType='addRecipe'
                />
                <Button 
                    onClick={ goToProfile }
                    className="header-nav__btn header-nav__btn--profil"
                    btnText='Mon Profil'
                    btnType='profile'
                />
            </nav>
        </header>
    )
}

Header.defaultProps = {
    title: 'Default Bon Appétit',
}

Header.propTypes = {
    title: PropTypes.string,
}

export default Header
