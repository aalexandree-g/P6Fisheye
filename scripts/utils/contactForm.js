export default class ContactForm {
    constructor() {
        
    }
    displayModal() {
        const $modal = document.querySelector(".modal")
        $modal.classList.add("visible")
        document.querySelector(".photographer_header").classList.add("hidden")
        document.querySelector(".media_section").classList.add("hidden")
    }

    closeModal() {
        const $modal = document.querySelector(".modal")
        $modal.classList.remove("visible")
    }

    init() {
        const btn = document.querySelector(".contact_button")
        btn.addEventListener("click", () => {
            this.displayModal()
        })
    }
}