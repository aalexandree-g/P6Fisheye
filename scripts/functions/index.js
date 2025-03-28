import { photographerTemplate } from "../templates/photographer.js"

// display all photographers' cards
export function displayUserCards(photographers) {
    const photographersSection = document.querySelector(".photographer_section")
    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer, "card")
        photographersSection.appendChild(photographerModel)
    })
}