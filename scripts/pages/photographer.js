import { getPhotographers } from "./index.js"
import { photographerTemplate } from "../templates/photographer.js"

// get id from URL
const params = new URLSearchParams(window.location.search)
const idPhotographer = parseInt(params.get("id"))

// display photographer's profile
function displayUserProfile(photographers, idUrl) {
    const photographer = photographers.find(p => p.id === idUrl)
    if (!photographer) {
        console.error("Photographe non trouvé")
        return
    } else {
        photographerTemplate(photographer, "profile")
    }
}

async function init() {
    const photographers = await getPhotographers()
    displayUserProfile(photographers, idPhotographer)
}

init()