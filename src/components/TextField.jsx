import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import OriginalTextField from '@material-ui/core/TextField'

const useStyles = makeStyles(() => ({
	textField: {
		'& input': {
			padding: 12,
		},
		'& .MuiInputLabel-outlined': {
			transform: 'translate(14px, 12px) scale(1)',
			'&.MuiInputLabel-shrink': {
				transform: 'translate(14px, -4px) scale(0.75)',
			},
		},
		marginBottom: 12,
	}
}))

export default function TextField({ value, name, label, onChange, error = false, errorMsg = '', className = '', ...props}) {
	const classes = useStyles()
	return (
		<OriginalTextField
			variant="outlined"
			value={value}
			error={error}
			{...(error ? { helperText: errorMsg } : {})}
			id={name}
			name={name}
			label={label}
			className={`${classes.textField} ${className}`}
			onChange={onChange}
			fullWidth
			{...props}
		/>
			
	)
}
