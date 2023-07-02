import './2FALayout.styles.css'

function TwoFALayout () {
    return (
        <div className='main-page'>
            <div className='frame-1'>
                <span className='text-1'>Enter your One Time Password</span>
                <input/>
            </div>
            <button className='error-button'>
                <span className='text-2'>Error: Wrong OTP</span>
            </button>
        </div>
    )
}

export default TwoFALayout;