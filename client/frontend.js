import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
	data() {
		return {
			name: '',
			value: '',
			contacts: [
				{ name: 'Boba', value: 'Biba', id: 1000, marked: false }
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
	computed(){
		
	},

	mounted() {
		
	}

}).mount('#app')