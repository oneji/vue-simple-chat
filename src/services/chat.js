import axios from '@/axios'
import config from '@/config'

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

export function markMessageAsRead(messageId) {
    return axios.post('messages/markAsRead', { id: messageId });
}

export function getOrderById(id) {
    return axios({
        url: `orders/getByIdFromChat/${id}`,
        baseURL: config.apiURL
    });
}