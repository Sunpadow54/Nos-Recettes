import PropTypes from 'prop-types'
import { RiAddFill } from 'react-icons/ri'
import { RiUser5Line } from 'react-icons/ri'

const Button = ({ btnText, onClick, btnType, className }) => {

    const icon = () => {
        if (btnType === 'addRecipe') return <RiAddFill />
        if (btnType === 'profile') return <RiUser5Line />
    };

    return (
        <button 
            className={ className }
            onClick={ onClick }
        >
            { icon() }
            { btnText }
        </button>
    )
}

Button.defaultProps = {
    btnText: 'Click', 
}

Button.propTypes = {
    btnText: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    btnType: PropTypes.string.isRequired,
}

export default Button
