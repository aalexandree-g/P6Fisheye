export default class ApiService {
    constructor(url) {
        this._url = url
        this.data = null
    }

    // get data from JSON file
    async get() {
        if (this.data) {
            return this.data
        }
        try {
            const response = await fetch(this._url)
            const data = await response.json()
            return data
        } catch(error) {
            console.error(error)
        }
    }
}