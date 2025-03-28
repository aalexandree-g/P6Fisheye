import { getPhotographers, getMedia } from "../utils/api.js"
import { getPhotographerFromId, displayUserProfile, displayMedia } from "../functions/photographer.js"

const photographers = await getPhotographers()
const photographer = getPhotographerFromId(photographers)
displayUserProfile(photographer)

const media = await getMedia()
displayMedia(photographer, media)