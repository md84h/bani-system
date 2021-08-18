import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { DatePicker as OriginalDatePicker } from '@material-ui/pickers'

const useStyles = makeStyles(() => ({
	date: {
		width: '100%',
		marginBottom: 12
	}
}))

export default function DatePicker({ value, onChange, label = 'Date' }) {
	const classes = useStyles()
	return (
		<OriginalDatePicker
			views={['year', 'month', 'date']}
			label={label}
			value={value}
			onChange={onChange}
			animateYearScrolling
			className={classes.date}
			autoOk
			disableFuture
		/>
				
	)
}
