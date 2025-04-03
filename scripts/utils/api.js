// get photographers' data from JSON file
/*export async function getPhotographers() {
    try {
        const response = await fetch("./data/photographers.json")
        if (!response.ok) {
            throw new Error("Erreur lors du chargement du fichier JSON")
        }
        const data = await response.json()
        return data.photographers
    } catch(error) {
        console.error(error)
    }
}

// get media from JSON file
export async function getMedia() {
    try {
        const response = await fetch("./data/photographers.json")
        if (!response.ok) {
            throw new Error("Erreur lors du chargement du fichier JSON")
        }
        const data = await response.json()
        return data.media
    } catch(error) {
        console.error(error)
    }
}*/



class Api {
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

class PhotographersApi extends Api {
    constructor(url) {
        super(url)
    }

    async getPhotographers() {
        const data = await this.get()
        return data.photographers
    }

    async getMedia() {
        const data = await this.get()
        return data.media
    }
}