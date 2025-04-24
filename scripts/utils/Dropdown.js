import PanelTemplate from "../templates/PanelTemplate.js"
import Lightbox from "./Lightbox.js"

export default class Dropdown {
    constructor(photographer, mediaList, displayMedia) {
        this._photographer = photographer
        this._mediaList = mediaList
        this.displayMedia = displayMedia
        this.$section = document.getElementById("media-section")
    }

    sortAndDisplay(type) {
        this.$section.classList.add("hiding")
        setTimeout(() => {
            this.$section.classList.remove("hiding")
            switch (type) {
                case "Popularité":
                    // sort by likes (high to low)
                    this._mediaList.sort((a, b) => b.likes - a.likes)
                    break
                case "Titre":
                    // sort alphabetically
                    this._mediaList.sort((a, b) => a.title.localeCompare(b.title, 'en', { sensitivity: 'base' }))
                    break
                case "Date":
                    // sort by date (newest to oldest)
                    this._mediaList.sort((a, b) => b.date - a.date)
                    break
            }
            this.displayMedia(this._mediaList)
            new PanelTemplate(this._photographer, this._mediaList).setupEventListeners()
            new Lightbox(this._mediaList).setupEventListeners()
        }, 500)
    }

    // all click events
    dropdownClickEvents() {
        const dropdown = document.querySelector(".dropdown")
        const selected = document.querySelector(".dropdown-selected")
        const options = document.querySelectorAll(".dropdown-option")
        // make selected button a choice
        selected.addEventListener("click", () => {
            if (dropdown.classList.contains("open")) {
                this.sortAndDisplay(selected.dataset.value)
            }
            options.forEach(option => {
                if (option.dataset.value === selected.textContent) {
                    option.classList.add("hidden")
                }
            })
            dropdown.classList.toggle("open")
        })
        // make a choice from the options
        options.forEach(option => {
            option.addEventListener("click", (e) => {
                const choice = e.target.dataset.value
                selected.textContent = choice
                selected.dataset.value = choice
                dropdown.classList.remove("open")
                options.forEach(opt => opt.classList.remove("hidden"))
                this.sortAndDisplay(choice)
            })
        })
    }

    init() {
        this.dropdownClickEvents()
    }
}