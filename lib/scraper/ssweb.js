const fetch = require('node-fetch');

function ssweb(url) {
     return new Promise((resolve, reject) => {
        fetch(`https://shot.screenshotapi.net/screenshot?url=${url}&full_page=true&fresh=true&output=image&file_type=png&wait_for_event=load`).buffer()
               .then(({ data }) => {
                    resolve(data)
               })
               .catch(e => {
                    reject(e)
               })
     })
}


module.exports.ssweb = ssweb
