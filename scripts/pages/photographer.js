import { getPhotographers } from "../utils/api.js"
import { displayUserProfile } from "../functions/photographer.js"

// get photographers' data from JSON file
const photographers = await getPhotographers()

// display one photographer's profile
displayUserProfile(photographers)