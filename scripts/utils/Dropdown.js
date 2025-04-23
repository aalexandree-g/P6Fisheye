import PanelTemplate from "../templates/PanelTemplate.js"
import Lightbox from "./Lightbox.js"
import { changeClass } from "./helper.js"

export default class Dropdown {
    constructor(photographer, mediaList, displayMedia) {
        this._photographer = photographer
        this._mediaList = mediaList
        this.displayMedia = displayMedia
        this.$buttons = document.querySelectorAll(".sort-btn")
        this.$chevron = document.querySelector(".fa-chevron-down")
        this.$noChoiceBtn = document.querySelector(".noChoice")
        this.$popularityBtn = document.querySelector(".popularity")
        this.$titleBtn = document.querySelector(".title")
        this.$section = document.getElementById("media-section")
    }

    sortAndDisplay(type) {
        this.$section.classList.add("hiding")
        setTimeout(() => {
            this.$section.classList.remove("hiding")
            if (type === "popularity") {
                this._mediaList.sort( (a, b) => b.likes - a.likes)
            } else if (type === "title") {
                this._mediaList.sort((a, b) => a.title.localeCompare(b.title, 'en', { sensitivity: 'base' }))
            }
            this.displayMedia(this._mediaList)
            new PanelTemplate(this._photographer, this._mediaList).setupEventListeners()
            new Lightbox(this._mediaList).setupEventListeners()
        }, 500)
    }

    btnEvent(type) {
        const $activeBtn = type === "popularity" ? this.$popularityBtn : this.$titleBtn
        const $inactiveBtn = type === "popularity" ? this.$titleBtn : this.$popularityBtn
        const direction = type === "popularity" ? "column" : "column-reverse"

        if (!$inactiveBtn.classList.contains("visible")) {
            changeClass($inactiveBtn, "visible", "hidden")
            this.$noChoiceBtn.classList.add("hidden")
            document.querySelector(".buttons").style.flexDirection = direction
        } else {
            changeClass($inactiveBtn, "hidden", "visible")
            changeClass(this.$noChoiceBtn, "hidden", "visible")
            changeClass($activeBtn, "visible", "hidden")

            this.$noChoiceBtn.removeAttribute("aria-haspopup")
            this.$noChoiceBtn.setAttribute("aria-selected", "false")

            $activeBtn.setAttribute("aria-haspopup", "true")
            $activeBtn.setAttribute("aria-selected", "true")

            $inactiveBtn.removeAttribute("aria-haspopup")
            $inactiveBtn.setAttribute("aria-selected", "false")

            this.sortAndDisplay(type)
        }
        this.$chevron.classList.toggle("rotate")
    }

    noChoiceBtnEvent() {
        this.$buttons.forEach($button => {
            if (!$button.classList.contains("visible")) {
                changeClass($button, "visible", "hidden")
                this.$noChoiceBtn.setAttribute("aria-selected", "true")
            } else {
                changeClass($button, "hidden", "visible")
                changeClass(this.$noChoiceBtn, "visible", "hidden")
                this.$noChoiceBtn.setAttribute("aria-selected", "true")
            }
        })
        this.$chevron.classList.toggle("rotate")
    }

    init() {
        this.$noChoiceBtn.addEventListener("click", () => { this.noChoiceBtnEvent() })
        this.$popularityBtn.addEventListener("click", () => { this.btnEvent("popularity") })
        this.$titleBtn.addEventListener("click", () => { this.btnEvent("title") })
    }
}