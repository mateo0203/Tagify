// AXIOS MODULE TO CONNECT THE SERVER WITH THE CLIENT
import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:4000/api/v1'
})