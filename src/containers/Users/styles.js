import COLOR from '../../components/constant/color'

export default {
	button: {
		backgroundColor: `${COLOR.BLUE} !important`,
		color: COLOR.WHITE,
		position: 'absolute',
		bottom: 12,
		right: 12,
	},
	addContainer: {
		position: 'absolute',
		bottom: 72,
		right: 12,
	},
	addPersonBtn: {
		backgroundColor: `${COLOR.RED} !important`,
		color: COLOR.WHITE,
		display: 'block',
		marginTop: 8,
	},
	addDetailsBtn: {
		backgroundColor: `${COLOR.PURPLE} !important`,
		color: COLOR.WHITE,
		display: 'block',
		marginTop: 8,
	},
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
	activeListItem: {
		color: COLOR.WHITE,
		backgroundColor: COLOR.BLACK
	},
	paper: {
		padding: 12,
		marginTop: 12
	},
	detailsItem: {
		'& p': {
			margin: 0,
			display: 'inline-block',
			width: '50%',
			fontSize: 12,
			color: COLOR.LIGHT_BLACK,
			'&:last-child': {
				textAlign: 'right'
			}
		},
		'&:first-child': {
			marginBottom: 8
		},
		'&:last-child': {
			'& p': {
				fontSize: 14,
				color: COLOR.BLACK
			}
		}
	},
	chaukaDetails: {
		'& p': {
			width: '100%'
		}
	},
	extraLungi: {
		'& p': {
			width: '33%',
			'&:nth-child(2)': {
				textAlign: 'center'
			}
		}
	},
	dialog: {
		'& .MuiDialog-paper': {
			minWidth: 300
		}
	},
	content: {
		'& p': {
			margin: 0,
			marginBottom: 8,
			fontSize: 14,
			'& span': {
				color: COLOR.LIGHT_BLACK,
				display: 'inline-block',
				width: '55%'
			}
		}
	},
	dropBtn: {
		marginTop: 10
	},
	dropdown: {
		width: '60%',
		display: 'inline-block'
	},
	btn: {
		width: '40%',
		display: 'inline-block',
		textAlign: 'right'
	},
	done: {
		borderLeft: `4px solid ${COLOR.GREEN}`
	}
}
