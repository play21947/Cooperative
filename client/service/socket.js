import io from 'socket.io-client/dist/socket.io'
const url = 'http://play2api.ddns.net:3001'

export const socket = io(url, {autoConnect: false})