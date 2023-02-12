import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
	data() {
		return {
			name: '',
			value: '',
			contacts: [
				
			]
		}
	},

	methods: {
		addContact(){
			if (this.name === '' || this.value === '') return
			this.contacts.push({ name: this.name, value: this.value, id: Date.now(), marked: false })
			this.name = this.value =  ''
		},
		deleteContact(id){
			this.contacts = this.contacts.filter(contact => contact.id != id)
		},
		markContact(id){
			this.contacts.find(contact => contact.id === id).marked = true
		}
	},
	async	mounted() {
		console.log('Hello there')
		this.contacts = await request('/api/contacts')
		
	}

}).mount('#app')


async function request(url, method = 'GET', data = null){
	try {
		const headers = {}
		let body

		if (data){
			headers['Content-Type'] = 'application/json'
			body = JSON.stringify(data)
		}
		console.log('responsing')

		const response = await fetch(url, {
			method,
			headers,
			body
		})
		return await response.json()
	}
	catch(e){
		console.log('Ошибка')
		console.error(e.message)
	}
}