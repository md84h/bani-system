export function setCookie(cname, cvalue, exdays) {
	let d = new Date()
	exdays = parseFloat(exdays)
	d.setTime(d.getTime() + (exdays*24*60*60*1000))
	let expires = exdays == -1 ? 'expires=Thu, 01 Jan 1970 00:00:01 GMT' :  'expires='+d.toUTCString()
	document.cookie = cname + '=' + cvalue + '; ' + expires+';path=/'
}

export function getCookie(cname){
	let name = cname + '='
	let ca = document.cookie.split(';')
	for(let i=0; i<ca.length; i++) {
		let c = ca[i]
		while (c.charAt(0)==' ') c = c.substring(1)
		if (c.indexOf(name) == 0) return c.substring(name.length,c.length)
	}
	return ''
}