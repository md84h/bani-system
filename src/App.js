import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.min.css'
import Login from './containers/Login'
import LoggedinPages from './LoggedinPages'

export default function App() {
	return (
		<>
			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<Switch>
				<Route path="/login" component={Login} />
				<Route component={LoggedinPages} />
			</Switch>
		</>
	)
}
