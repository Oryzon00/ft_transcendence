import './LoginLayout.styles.css'

function LoginLayout () {
	return (
		<div className='main-page'>
			<div className='frame-1'>
				<span className='text-1'>Welcome to Transcendance Please sign in to continue</span>
					<button className='signin-button'>
						<span className='text-2'>Sign in with 42</span>
					</button>
			</div>
		</div>
	)
}

export default LoginLayout;