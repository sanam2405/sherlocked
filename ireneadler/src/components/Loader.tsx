import { CSSProperties } from 'react'
import { Triangle } from 'react-loader-spinner'

const Loader = () => {
	const LoaderStyle: CSSProperties = {
		position: 'fixed',
		top: '0',
		left: '0',
		width: '100%',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	}

	return (
		<>
			<div style={LoaderStyle}>
				<Triangle
					visible={true}
					height='200'
					width='200'
					color='#4fa94d'
					ariaLabel='triangle-loading'
					wrapperStyle={{}}
					wrapperClass=''
				/>
			</div>
		</>
	)
}

export default Loader
