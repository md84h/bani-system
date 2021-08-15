import React, {PureComponent} from 'react'
import {Grid} from '@material-ui/core'
import moment from 'moment'
import CustomTable from './CustomTable'

export default class PrintableContent extends PureComponent {
	render () {
		const {data, isPrint} = this.props
		const lungiTable = [
			{
				name: 'Than',
				value: Number(data.totalThan).toLocaleString('en-IN')
			},
			{
				name: 'Extra Lungi',
				value: Number(data.extraLungi).toLocaleString('en-IN')
			},
			{
				name: 'Total Lungi',
				value: Number(data.totalLungi).toLocaleString('en-IN')
			},
			{
				name: 'Bheem',
				value: Number(data.totalLungiBheem).toLocaleString('en-IN')
			},
			{
				name: 'Bheem Weight',
				value: `${Number(data.totalLungiBheemNetWeight).toLocaleString('en-IN')} KG`
			},
			{
				name: 'Bheem Length',
				value: `${Number(data.totalLungiBheemLength).toLocaleString('en-IN')} mtr`
			},
			{
				name: 'Cone',
				value: Number(data.totalLungiCone).toLocaleString('en-IN')
			},
			{
				name: 'Cone Weight',
				value: `${Number(data.totalLungiConeWeight).toLocaleString('en-IN')} KG`
			},
			{
				name: 'Cut Piece',
				value: Number(data.totalLungiCutPiece).toLocaleString('en-IN')
			},
			{
				name: 'Cut Piece Amount',
				value: `Rs ${Number(data.totalLungiCutPieceAmount).toLocaleString('en-IN')}`
			},
			{
				name: 'Paid Amount',
				value: `Rs ${Number(data.paidLungiAmount).toLocaleString('en-IN')}`
			},
			{
				name: 'Pending Amount',
				value: `Rs ${Number(data.pendingLungiAmount).toLocaleString('en-IN')}`
			},
			{
				name: 'Total Amount',
				value: `Rs ${Number(data.totalLungiAmount).toLocaleString('en-IN')}`
			}
		]

		const chaukaTable = [
			{
				name: 'Chauka',
				value: Number(data.totalChauka).toLocaleString('en-IN')
			},
			{
				name: 'Bheem',
				value: Number(data.totalChaukaBheem).toLocaleString('en-IN')
			},
			{
				name: 'Bheem Weight',
				value: `${Number(data.totalChaukaBheemNetWeight).toLocaleString('en-IN')} KG`
			},
			{
				name: 'Bheem Length',
				value: `${Number(data.totalChaukaBheemLength).toLocaleString('en-IN')} mtr`
			},
			{
				name: 'Cone',
				value: Number(data.totalChaukaCone).toLocaleString('en-IN')
			},
			{
				name: 'Cone Weight',
				value: `${Number(data.totalChaukaConeWeight).toLocaleString('en-IN')} KG`
			},
			{
				name: 'Cut Piece',
				value: Number(data.totalChaukaCutPiece).toLocaleString('en-IN')
			},
			{
				name: 'Cut Piece Amount',
				value: `Rs ${Number(data.totalChaukaCutPieceAmount).toLocaleString('en-IN')}`
			},
			{
				name: 'Paid Amount',
				value: `Rs ${Number(data.paidChaukaAmount).toLocaleString('en-IN')}`
			},
			{
				name: 'Pending Amount',
				value: `Rs ${Number(data.pendingChaukaAmount).toLocaleString('en-IN')}`
			},
			{
				name: 'Total Amount',
				value: `Rs ${Number(data.totalChaukaAmount).toLocaleString('en-IN')}`
			}
		]

		const amount = [
			{
				name: 'Cut Piece',
				value: `Rs ${Number(data.totalCutPieceAmount).toLocaleString('en-IN')}`
			},
			{
				name: 'Paid',
				value: `Rs ${Number(data.totalPaidAmount).toLocaleString('en-IN')}`
			},
			{
				name: 'Pending',
				value: `Rs ${Number(data.totalPendingAmount).toLocaleString('en-IN')}`
			},
			{
				name: 'Total',
				value: `Rs ${Number(data.totalAmount).toLocaleString('en-IN')}`
			}
		]
		return (
			<Grid container spacing={4} id="section-to-print">
				<Grid item xs={ isPrint ? 6: 12 } md={6}>Name: {data.name}</Grid>
				<Grid item xs={ isPrint ? 6: 12} md={6}>{moment(data.startDate).format('Do MMM\'YY')} TO {moment(data.endDate).format('Do MMM\'YY')}</Grid>
				{data.totalLungiCone > 0 && <Grid item xs={isPrint ? 6: 12} md={data.totalChaukaCone ? 6 : 12}>
					<p style={{margin: '0 0 12px 0'}}>Lungi</p>
					<CustomTable data={lungiTable} />
				</Grid>
				}
				{data.totalChaukaCone > 0 && <Grid item xs={isPrint ? 6: 12} md={data.totalLungiCone ? 6 : 12}>
					<p style={{margin: '0 0 12px 0'}}>Chauka</p>
					<CustomTable data={chaukaTable} />
				</Grid>
				}
				<Grid item xs={12}>
					<p style={{margin: '0 0 12px 0'}}>Amount</p>
					<CustomTable data={amount} />
				</Grid>     
			</Grid>
		)
	}
}
