import { photographerTemplate } from "../templates/photographer.js"

// load JSON file
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

// display photographers' card
function displayUserCards(photographers) {
    const photographersSection = document.querySelector(".photographer_section")
    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer, "card")
        photographersSection.appendChild(photographerModel)
    })
}

async function init() {
    const photographers = await getPhotographers()
    displayUserCards(photographers)
}

init()