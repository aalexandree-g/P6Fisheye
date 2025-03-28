import { photographerTemplate } from "../templates/photographer.js"

// get the right photographer with id in URL
export function getPhotographerFromId(photographers) {
    const params = new URLSearchParams(window.location.search)
    const idPhotographer = parseInt(params.get("id"))
    const photographer = photographers.find(p => p.id === idPhotographer)
    return photographer
}

// display photographer's profile
export function displayUserProfile(photographer) {
    if (!photographer) {
        console.error("Photographe non trouvé")
        return
    } else {
        photographerTemplate(photographer, "profile")
    }
}

export function displayMedia(photographer, media) {
    const main = document.getElementById("main")
    const mediaSection = document.createElement("div")
    mediaSection.classList.add("media_section")

    media.forEach((content) => {
        if (content.photographerId === photographer.id) {
            const img = document.createElement("img")
            const picture = content.image
            const photographerId = photographer.id
            img.setAttribute("src", `./assets/media/${photographerId}/${picture}`)
            mediaSection.appendChild(img)
        }
    })
    main.appendChild(mediaSection)
    
    
}