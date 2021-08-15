import React, {useState} from 'react'
import { Button, CircularProgress } from '@material-ui/core'
import moment from 'moment'
import { toast } from 'react-toastify'
import Modal from '../../components/Modal'
import API from '../../components/constant/api'
import Table from './Table'

export default function OverallDetails({employeeId}) {
	const [showDetails, setShowDetails] = useState(false)
	const [loading, setLoading] = useState(false)
	const [details, setDetails] = useState(null)

	const onClick = () => {
		setLoading(true)
		setShowDetails(true)
		getDetails()
	}

	const onClose = () => {
		setShowDetails(false)
	}

	const getDetails = async () => {
		const currentMonth = moment().month()
		let year = moment().year()
		if (currentMonth <=2) {
			year = moment().year() - 1
		}
		const reqBody = {
			employeeId: employeeId,
			startDate: moment().set('date', 1).set('month', 2).set('year', year),
			endDate: moment()
		}
		const res = await fetch(`${API.API_URL}${API.OVERALL_PATH}`, {
			method: 'POST',
			body: JSON.stringify(reqBody),
			headers: {
				'Content-Type': 'application/json',
			},
		})
		if (res.ok) {
			const response = await res.json()
			if (response.error) {
				toast.error(response.error)
			} else {
				setDetails(response)
			}
		} else {
			toast.error('Something went wrong, Please try again!')
		}
		setLoading(false)
	}

	return(
		<>
			<Button variant="contained" onClick={onClick} color="primary" style={{marginBottom: 10}}>
				Overall Details
			</Button>
			{showDetails && <Modal
				heading="Overall Details"
				onClose={onClose}
			>
				{loading ? <CircularProgress size={25} /> : <div>
					{details ? <Table data={details} /> : 'Something went wrong!'}
				</div>}
			</Modal>}
		</>
	)
}