export default class Api {
    constructor(url) {
        this._url = url
    }

    async get() {
        try {
            const response = await fetch(this._url)
            const data = await response.json()
            return data
        } catch(error) {
            console.error(error)
        }
    }
}