import React from 'react'
import ReactDOM from 'react-dom'
import MomentUtils from '@date-io/moment'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
// import { BrowserRouter } from 'react-router-dom'
import { HashRouter } from 'react-router-dom'

import App from './App'
import './index.css'

// import reportWebVitals from './reportWebVitals'

ReactDOM.render(
	<HashRouter>
		<React.StrictMode>
			<MuiPickersUtilsProvider utils={MomentUtils}>
				<App />
			</MuiPickersUtilsProvider>
		</React.StrictMode>
	</HashRouter>,
	document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
