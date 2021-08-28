import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import moment from 'moment'
import { Delete, Edit } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow)


export default function CustomTable({data, handleEditClick, handleDeleteClick}) {
	const total = data.reduce((acc, curr) => {
		if (curr.type === 'CREDIT') {
			acc += curr.amount
		} else {
			acc -= curr.amount
		}
		return acc
	}, 0)
	return (
		<TableContainer component={Paper}>
			<Table aria-label="customized table">
				<TableHead>
					<TableRow>
						<StyledTableCell>Date</StyledTableCell>
						<StyledTableCell>Description</StyledTableCell>
						<StyledTableCell>Type</StyledTableCell>
						<StyledTableCell align="right">Credit Amount</StyledTableCell>
						<StyledTableCell align="right">Debit Amount</StyledTableCell>
						<StyledTableCell align="right">Action</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((row) => (<StyledTableRow key={row.id}>
						<StyledTableCell>{moment(row.date).format('Do MMM\'YY')}</StyledTableCell>
						<StyledTableCell>{row.description}</StyledTableCell>
						<StyledTableCell>{row.type}</StyledTableCell>
						<StyledTableCell align="right">{row.type === 'CREDIT' ? `Rs ${Number(row.amount).toLocaleString('en-IN')}` : ''}</StyledTableCell>
						<StyledTableCell align="right">{row.type === 'DEBIT' ? `Rs ${Number(row.amount).toLocaleString('en-IN')}` : ''}</StyledTableCell>
						<StyledTableCell align="right">
							<IconButton size="small" onClick={() => handleEditClick(row)}>
								<Edit />
							</IconButton>
							<IconButton size="small" onClick={() => handleDeleteClick(row.id)}>
								<Delete />
							</IconButton>
						</StyledTableCell>
					</StyledTableRow>
					))}
					<StyledTableRow>
						<StyledTableCell colSpan={6}/>
					</StyledTableRow>
					<StyledTableRow>
						<StyledTableCell />
						<StyledTableCell />
						<StyledTableCell />
						<StyledTableCell />
						<StyledTableCell align="right" style={{fontWeight: 600}}>Balance</StyledTableCell>
						<StyledTableCell align="right" style={{fontWeight: 600}}>{`Rs ${Number(total).toLocaleString('en-IN')}`}</StyledTableCell>
					</StyledTableRow>
				</TableBody>
			</Table>
		</TableContainer>
	)
}
