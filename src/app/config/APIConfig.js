'use strict'

const API_PROTOCOL = process.env.API_APP_PROTOCOL
const API_IP = process.env.API_APP_IP
const API_PORT = process.env.API_APP_PORT
const API_PATH = process.env.API_APP_PATH

let API_FULL_PATH=''
if (_.isUndefined(process.env.API_APP_PATH)) {
  API_FULL_PATH = `${API_PROTOCOL}://${API_IP}:${API_PORT}`
} else {
  API_FULL_PATH = `${API_PROTOCOL}://${API_IP}:${API_PORT}${API_PATH}`
}

const API_CLIENT_CREDENTIALS = {
  username: process.env.API_APP_USERNAME,
  password: process.env.API_APP_PASSWORD
}

const API_GRANT_TYPE_PASSWORD = 'password'
const API_GRANT_TYPE_REFRESH_TOKEN = 'refresh_token'

export default {
  API_FULL_PATH: API_FULL_PATH,
  API_CLIENT_CREDENTIALS: API_CLIENT_CREDENTIALS,
  API_GRANT_TYPE_PASSWORD: API_GRANT_TYPE_PASSWORD,
  API_GRANT_TYPE_REFRESH_TOKEN: API_GRANT_TYPE_REFRESH_TOKEN
}
