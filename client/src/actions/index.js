import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
    const response = await axios.get('/api/current_user');
        
    dispath({ type: FETCH_USER, payload: response.data })
    };


// goto package.json

// "proxy": {
//     {

//     },

//     "/api/*": {
//         "target": "http://localhost:5000"
//     }
// }