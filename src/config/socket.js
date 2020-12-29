import io from 'socket.io-client'
import config from './index'

export default io(config.chatURL);