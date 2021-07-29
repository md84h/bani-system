import React from 'react'
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
	nameSelect: {
		display: 'block',
		'& .MuiOutlinedInput-root': {
			width: '100%',
			'& .MuiSelect-outlined.MuiSelect-outlined': {
				padding: 12
			}
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

export default function Dropdown({ label, name, value, options, onChange, errorMsg = '', error = false, className = '', ...props}) {
	const classes = useStyles()
	return (
		<FormControl
			variant="outlined"
			className={`${classes.nameSelect} ${className}`}
			error={error}
		>
			<InputLabel id={`${name}Label`}>{label}</InputLabel>
			<Select
				labelId={`${name}Label`}
				id={name}
				name={name}
				value={value}
				onChange={onChange}
				label={label}
				{...props}
			>
				{options.map(data => (<MenuItem key={data.value} value={data.value}>{data.name}</MenuItem>))}
			</Select>
			{error && <FormHelperText>{errorMsg}</FormHelperText>}
		</FormControl>
					
	)
}
