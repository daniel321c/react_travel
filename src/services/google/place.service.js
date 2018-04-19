import appendQuery from "append-query"
var Key = 'AIzaSyAbFWCJYlKzVOrEesawE0X3qpcHaDpFHqI'

export const placeService = {
    placeDetails,
};

function placeDetails(placeid){
    gapi.load('auth2', function() {
        // Library loaded.
      });
    var path = "https://maps.googleapis.com/maps/api/place/details/json";
    var params ={
        key: Key,
        placeid: placeid
    }

    var user = gapi.auth2.getAuthInstance().currentUser.get();
    var oauthToken = user.getAuthResponse().access_token;

    const requestOptions = {
        mode: 'cors',
        headers: { 'Authorization': 'Bearer ' + oauthToken},
    };

    var url = appendQuery(path, params);

    return fetch(url, requestOptions)
        .then(res=>{
            if(!res.ok){
                return Promise.reject(res.statusText)
            }
            console.log(res);
            return res;
        })
}