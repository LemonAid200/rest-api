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
			if (!this.name.trim() || !this.value.trim()) return
			const newContact = { name: this.name, value: this.value, id: Date.now(), marked: false }
			this.contacts.push(newContact)
			request('api/contacts', 'POST', newContact)

			this.name = this.value =  ''
		},
		async deleteContact(id){
			const serverResponce = await request(`api/contacts/${id}`, 'DELETE')
			console.log(serverResponce)
			this.contacts = this.contacts.filter(contact => contact.id != id)

		},
		markContact(id){
			this.contacts.find(contact => contact.id === id).marked = true
			this.contacts.find(contact => console.log(contact))
			

			request(`api/contacts/${id}`, 'PATCH')
		}
	},
	async	mounted() {
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