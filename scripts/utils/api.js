// get photographers' data from JSON file
export async function getPhotographers() {
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
}