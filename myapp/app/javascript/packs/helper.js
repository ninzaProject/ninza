export let isLoggedIn = function() {
    return sessionStorage.getItem('status') != null;
}

export let fetchContainer = function(url, method = 'GET', body = '') {
    let param_hash = {
        method: method,
        credentials: 'same-origin',
        headers: {
            "X-CSRF-Token": getToken(),
            "Content-Type": "application/json"
        }
    };
    if (method == 'POST')
        param_hash['body'] = JSON.stringify(body);

    return fetch(url, param_hash).then(response => response.json());
}

window.isLoggedIn = isLoggedIn;
window.fetchContainer = fetchContainer;

function getToken() {
    return $('meta[name=csrf-token]')[0].getAttribute('content');
}

