const express = require("express")
const path = require('path')
const app = express()
const port = 3000
app.use(express.json())

let CONTACTS = [
	{ name: 'Toilly', value: 'Dilly', id: 2000, marked: false },
	{ name: 'Boba', value: 'Biba', id: 1000, marked: false },
	{ name: 'Pupa', value: 'Lupa', id: 3000, marked: false }
]

app.use(express.static(path.resolve(__dirname, 'client')))

app.get('/api/contacts', (req, res) => {
	res.status(200).json(CONTACTS)
})

app.post('/api/contacts',function(req,res){
	const contact = req.body
	CONTACTS.push(contact);
	res.status(201).json( contact )
});

app.delete('/api/contacts/:id', (req, res) => {
 CONTACTS	= CONTACTS.filter( c => c.id != req.params.id)
 res.status(200).json( {message: 'Contact was deleted'} )
})

app.patch('/api/contacts/:id', (req, res) => {
	CONTACTS.find( contact => contact.id === +req.params.id ).marked = true
	res.status(200).json({ message: `Contact with id:${req.params.id} was marked` })
})

app.get('*', (req, res) => {
	res.send(path.resolve(__dirname, 'client', 'index.html'))
})


app.listen(port, () => console.log('Listening to port: ' + port + '...'))