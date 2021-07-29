import React, { useEffect, useState } from 'react'
import { CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import '../../App.css'
import API from '../../components/constant/api'
import AddPerson from './AddPerson'
import styles from './styles'

const useStyles = makeStyles(styles)

export default function Home() {
	const [employeeList, setEmployeeList] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		getEmployeeList()
	}, [])

	const getEmployeeList = async () => {
		const res = await fetch(`${API.API_URL}${API.PERSON_PATH}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		if (res.ok) {
			const employee = await res.json()
			if (employee.error) {
				toast.error(employee.error)
			} else {
				setEmployeeList(employee)	
			}
		} else {
			toast.error('Something went wrong, Please try again!')
		}
		setLoading(false)
		
	}

	const addPersonCallback = () => {
		setLoading(true)
		setEmployeeList(null)
		getEmployeeList()
	}

	const classes = useStyles()
	
	return (
		<div className="App">
			<AddPerson addPersonCallback={addPersonCallback} />
			{loading ? <CircularProgress /> : <>
				{employeeList ? employeeList.map((employee) => (
					<Link key={employee.id} to={`/users/${employee.id}`}>
						<div className={classes.listItem}>{employee.name}</div>
					</Link>
				)) : <p>No Person Found!</p>}
			</>
			}
		</div>
	)
}
