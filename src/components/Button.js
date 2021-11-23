import PropTypes from 'prop-types'
import { GrAdd } from 'react-icons/gr'
import { RiUserSmileLine } from 'react-icons/ri'
import { IoSearchSharp } from 'react-icons/io5'

const Button = ({ btnText, onClick, btnType, className }) => {

    const icon = () => {
        if (btnType === 'addRecipe') return <GrAdd />
        if (btnType === 'profile') return <RiUserSmileLine />
        if (btnType === 'search') return <IoSearchSharp />
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
