import axios from '@/axios'

export function startChat(data) {
    return axios.post('rooms', data);
}

export function getRooms(userId) {
    return axios.get(`rooms?user_id=${userId}`);
}

export function getRoomById(id) {
    return axios.get(`rooms/getById/${id}`);
}

export function sendMessage(data) {
    return axios.post(`rooms/sendMessage`, data);
}