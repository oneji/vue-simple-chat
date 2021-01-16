export default {
    getUnreadMessagesCount: state => {
        let unreadMessages = 0;

        state.rooms.map(room => {
            unreadMessages += room.unreadMessages;
        })

        return unreadMessages;
    }
}