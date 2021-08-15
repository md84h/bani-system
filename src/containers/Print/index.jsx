import React, {useEffect} from 'react'
import { getItem } from '../../components/helper/localStorage'

import PrintableContent from '../Users/PrintableContent'

export default function Print() {
	const data = JSON.parse(getItem('bani_details_print'))
	useEffect(() => {
		window.print()
	}, [])
	return(
		<PrintableContent data={data} isPrint />
	)
}