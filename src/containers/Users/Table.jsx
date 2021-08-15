import React from 'react'
import { Print } from '@material-ui/icons'
import PrintableContent from './PrintableContent'
import { IconButton } from '@material-ui/core'
import { setItem } from '../../components/helper/localStorage'

export default function CustomizedTables({data}) {
	const handleClick = () => {
		setItem('bani_details_print', JSON.stringify(data))
		window.open('/print')
	}
	return (
		<>
			<IconButton onClick={handleClick}>
				<Print />
			</IconButton>
			<PrintableContent data={data} />
		</>
		
	)
}
