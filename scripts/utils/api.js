export default class Api {
    constructor(url) {
        this._url = url
        this.data = null
    }

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