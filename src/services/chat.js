import axios from '@/axios'

export function getRooms() {
    return axios.get('rooms');
}

export function getRoomById(id) {
    return axios.get(`rooms/getById/${id}`);
}

export function sendMessage(data) {
    return axios.post(`rooms/sendMessage`, data);
}