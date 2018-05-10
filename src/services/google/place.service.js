import appendQuery from "append-query"
import { authHeader } from '../api/auth_header';


export const placeService = {
    placeDetails,
    placePhoto,
};

var Host = "https://maps.googleapis.com"
var Key = 'AIzaSyAbFWCJYlKzVOrEesawE0X3qpcHaDpFHqI'

function placeDetails(placeid) {

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/google/place/details?placeid=' + placeid, requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText)
            }
            return response.json();
        })
        .then(json => {
            return json;
        })

}

function placePhoto(ref) {
    var path = "/maps/api/place/photo"
    var params = {
        maxwidth: 400,
        photoreference: ref,
        key: Key
    }
    return appendQuery(Host + path, params)
}


function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }
    return response.json();
}