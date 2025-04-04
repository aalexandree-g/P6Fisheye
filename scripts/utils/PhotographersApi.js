import Api from "./Api.js"
import Photographer from "../models/Photographer.js"

export default class PhotographersApi extends Api {
    constructor(url) {
        super(url)
    }

    async getPhotographers() {
        const data = await this.get()
        const photographers = data.photographers.map(photographer => new Photographer(photographer))
        return photographers
    }

    async getMedia() {
        const data = await this.get()
        return data.media
    }
}