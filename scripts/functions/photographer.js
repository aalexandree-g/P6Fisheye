import { photographerTemplate } from "../templates/photographer.js"

// display photographer's profile
export function displayUserProfile(photographers) {
    // get id from URL
    const params = new URLSearchParams(window.location.search)
    const idPhotographer = parseInt(params.get("id"))
    // search for corresponding photographer's id
    const photographer = photographers.find(p => p.id === idPhotographer)
    if (!photographer) {
        console.error("Photographe non trouvé")
        return
    } else {
        photographerTemplate(photographer, "profile")
    }
}