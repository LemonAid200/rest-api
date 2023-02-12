const express = require("express")
const path = require('path')
const app = express()
const port = 3000

const CONTACTS = [
	{ name: 'Tilly', value: 'Dilly', id: 2000, marked: false },
	{ name: 'Boba', value: 'Biba', id: 1000, marked: false },
	{ name: 'Pupa', value: 'Lupa', id: 3000, marked: false }
]

app.use(express.static(path.resolve(__dirname, 'client')))

app.get('/api/contacts', (req, res) => {
	console.log('fetching is in process')
	res.status(200).json(CONTACTS)
})

app.get('*', (req, res) => {
	res.send(path.resolve(__dirname, 'client', 'index.html'))
})


app.listen(port, () => console.log('Listening to port: ' + port + '...'))