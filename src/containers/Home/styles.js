import COLOR from '../../components/constant/color'

export default {
	listItem: {
		display: 'inline-block',
		verticalAlign: 'middle',
		padding: '8px 16px',
		color: COLOR.BLACK,
		borderRadius: 4,
		marginRight: 12,
		marginBottom: 12,
		border: `1px solid ${COLOR.BLACK}`
	},
	button: {
		backgroundColor: `${COLOR.BLUE} !important`,
		color: COLOR.WHITE,
		position: 'absolute',
		bottom: 12,
		right: 12,
		zIndex: 1
	},
	avatar: {
		fontSize: 16,
		margin: '0 auto',
		width: 30,
		height: 30
	},
	name: {
		textAlign: 'center',
		margin: 8,
		fontWeight: 400,
		fontSize: 22
	},
	mobile: {
		fontSize: 12,
		margin: 0,
		textAlign: 'center',
		color: 'rgb(0 0 0 / 60%)',
		fontWeight: 400
	},
	cardContent: {
		paddingBottom: 0
	},
	link: {
		textDecoration: 'none'
	},
	action: {
		position: 'absolute',
		top: 8,
		right: 4
	},
	editButton: {
		color: COLOR.GREEN,
		padding: 8
	},
	deleteButton: {
		color: COLOR.RED,
	},
	container: {
		position: 'relative'
	}
}
