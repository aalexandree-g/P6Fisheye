export function photographerTemplate(data, format) {
    const { name, id, city, country, tagline, price, portrait } = data
    const picture = `./assets/photographers/${portrait}`
    const location = `Localisation : ${city}, ${country}`
    const slogan = `Slogan : ${tagline}`
    const cost = `Tarif : ${price}€ par jour`

    const img = document.createElement("img")
    img.setAttribute("src", picture)

    const spanLocation = document.createElement("span")
    spanLocation.textContent = `${city}, ${country}`
    spanLocation.classList.add("location")
    spanLocation.setAttribute("aria-label", location)

    const spanTagline = document.createElement("span")
    spanTagline.textContent = tagline
    spanTagline.classList.add("slogan")
    spanTagline.setAttribute("aria-label", slogan)

    const spanPrice = document.createElement("span")
    spanPrice.textContent = `${price}€/jour`
    spanPrice.classList.add("cost")
    spanPrice.setAttribute("aria-label", cost)

    function getUserDOM() {
        if (format === "profile") {
            // photographer's profile
            const h1 = document.createElement("h1")
            h1.textContent = name

            img.setAttribute("alt", name)
            
            const textContent = document.createElement("div")
            textContent.classList.add("text_content")
            textContent.append(h1, spanLocation, spanTagline)

            const profile = document.querySelector(".photographer_header")
            profile.insertBefore(textContent, profile.firstChild)
            profile.appendChild(img)
            return profile
        } else {
            // photographer's card
            const h2 = document.createElement("h2")
            h2.textContent = name

            img.setAttribute("alt", "")
    
            const link = document.createElement("a")
            link.setAttribute("href", `photographer.html?id=${id}`)
            link.setAttribute("aria-label", name)
            link.append(img, h2)
    
            const article = document.createElement("article")
            article.append(link, spanLocation, spanTagline, spanPrice)
            return article
        }
    }
    return getUserDOM()
}