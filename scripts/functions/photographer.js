
function displayMedia(photographer, media) {
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