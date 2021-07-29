import React from 'react'
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Close, Edit } from '@material-ui/icons'

import color from './constant/color'

const styles = (theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(2),
	},
	closeButton: {
		position: 'absolute',
		right: 8,
		top: 8,
		color: color.RED,
	},
	editButton: {
		position: 'absolute',
		right: 50,
		top: theme.spacing(1),
		color: color.BLUE,
	},
	doneButton: {
		position: 'absolute',
		right: 90,
		top: theme.spacing(1),
		color: color.GREEN,
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
				color: color.LIGHT_BLACK,
				display: 'inline-block',
				width: 100
			}
		}
	}
})

const DialogTitleX = withStyles(styles)((props) => {
	const { children, classes, onClose, onEdit, showEdit, ...other } = props
	return (
		<DialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant="h6">{children}</Typography>
			{onClose ? (
				<IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
					<Close />
				</IconButton>
			) : null}
			{showEdit && <IconButton aria-label="edit" className={classes.editButton} onClick={onEdit}><Edit /></IconButton>}
		</DialogTitle>
	)
})

const DialogContentX = withStyles((theme) => ({
	root: {
		padding: theme.spacing(2),
	},
}))(DialogContent)

const DialogActionsX = withStyles((theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(1),
	},
}))(DialogActions)

const useStyles = makeStyles(styles)

export default function Modal({onClose, heading, showEdit, editOpenCallback, handleAction, actionLabel, loadingAction = false, children}) {
	const classes = useStyles()

	return (
		<Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open className={classes.dialog}>
			<DialogTitleX id="customized-dialog-title" onClose={onClose} onEdit={editOpenCallback} showEdit={showEdit}>
				{heading}
			</DialogTitleX>
			<DialogContentX dividers>
				{children}
			</DialogContentX>
			{handleAction &&
				<DialogActionsX>
					<Button onClick={handleAction} color="primary" disabled={loadingAction}>
						{loadingAction ? <CircularProgress size={25} /> : actionLabel}
					</Button>
				</DialogActionsX>
			}
		</Dialog>
	)
}
