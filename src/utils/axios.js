import axios from 'axios'
import * as url from './key'

const instance = axios.create({
    baseURL: url.FIREBASEURL
})

export default instance