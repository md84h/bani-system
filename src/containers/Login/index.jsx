import React, { useEffect, useState } from 'react'
import { Button, CircularProgress, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { toast } from 'react-toastify'

import API from '../../components/constant/api'
import { getCookie, setCookie } from '../../components/helper/cookie'
import { setItem } from '../../components/helper/localStorage'
import TextField from '../../components/TextField'
import styles from './styles'

const useStyles = makeStyles(styles)

export default function Login() {
	const [state, setState] = useState({username: '', password: ''})
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (getCookie('userToken')) {
			window.location.href = '/'
		}
	}, [])

	const handleOnChange = ({target: {name, value}}) => setState(prevState => ({...prevState, [name]: value}))

	const handleOnClick = () => {
		const {username, password} = state
		if (username && password) {
			setLoading(true)
			handleLogin()
		} else {
			toast.error('Please add username and password')
		}
	}

	const handleLogin = async () => {
		const {username, password} = state
		const res = await fetch(`${API.API_URL}auth/signin`, {
			method: 'POST',
			body: JSON.stringify({username: username.toLowerCase(), password}),
			headers: {
				'Content-Type': 'application/json',
			},
		})
		if (res.ok) {
			const login = await res.json()
			if (login.error) {
				toast.error(login.error)
				setLoading(false)
			} else {				
				setItem('userRole', JSON.stringify(login.roles))
				setCookie('userToken',login.token, 30)
				window.location.href = '/'
			}
		} else {
			toast.error('Wrong username and password, Please try again!')
			setLoading(false)
		}
	}

	const classes = useStyles()

	return (
		
		<Paper className={classes.paper}>
			<TextField
				required
				value={state.username}
				name="username"
				label="User Name"
				onChange={handleOnChange}
			/>
			<TextField
				required
				value={state.password}
				name="password"
				label="Password"
				onChange={handleOnChange}
				type="password"
			/>
			<Button variant="contained" color="primary" onClick={handleOnClick} disabled={loading}>
				{loading ? <CircularProgress size={25} /> : 'Login'}
			</Button>
		</Paper>
		
		
	)
}