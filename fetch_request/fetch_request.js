const fetch = require('node-fetch');
global.fetch=fetch;

const make_get_request = async (
    url,

) => {
    return await fetch(url)
    .then(res => res.json())
    .then(json => json);
}

const make_post_request = async (
    url,
    body
) => {
    return await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(json => json);
}



module.exports = {
    make_get_request,
    make_post_request
}