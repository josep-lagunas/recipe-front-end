async function get(url) {
    const request = buildRequest(url, 'GET');
    const response = await fetch(request);
    const result = await response.json();
    return result;
}

async function post(url, payload) {
    const request = buildRequest(url, 'POST', payload);
    const response = await fetch(request);
    const result = await response.json();
    return result;
}

async function put(url, payload) {
    const request = buildRequest(url, 'PUT', payload);
    const response = await fetch(request);
    const result = await response.json();
    return result;
}

async function remove(url, id) {
    const request = buildRequest(`${url}/${id}/`, 'DELETE');
    const response = await fetch(request);
    return response.status;
}

function buildRequest(url, method, payload) {
    const header = {'Content-Type': 'application/json'};
    switch (method) {
        case 'GET':
            return new Request(url, {
                method: 'GET',
                headers: header
            });
        case 'POST':
        case 'PUT':
        case 'PATCH':
            return new Request(url, {
                method: method,
                headers: header,
                body: JSON.stringify(payload)
            });
        case 'DELETE':
            return new Request(url, {
                method: 'DELETE'
            });
        default:
            throw new Error(`Unknown method ${method}`);
    }
}

export {get, post, put, remove};