import axios from 'axios';

const URL = "https://pixabay.com/api/";
const KEY = "38665154-d68f525a03011e5cbed0805a3";

export async function fetchPhoto(q, page, perPage) {
    const url = `${URL}?key=${KEY}&q=${q}&page=${page}&per_page=${perPage}&image_type=photo&orientation=horizontal&safesearch=true`;
    const response = await axios.get(url);
    return response.data;          
};