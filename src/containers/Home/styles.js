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
	},
}
