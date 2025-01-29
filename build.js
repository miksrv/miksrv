const imageHost = 'https://api.astro.miksoft.pro/astrophotos/'
const fs = require('fs')
const axios = require('axios')
const today = new Date().toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

const result = axios.get('https://api.astro.miksoft.pro/photos').then((result) => {
    let photoContent = ''

    const items = result?.data?.items || [];
    const randomItems = items.sort(() => 0.5 - Math.random()).slice(0, 4);

    randomItems?.forEach((photo, index) => {
        photoContent += (`<img src="${imageHost}${photo.dirName}/${photo.fileName}_medium.${photo.fileExt}" alt="" style="width: 24%; height: 150px; object-fit: cover;" />`)

        if ((index + 1) < result.data.items.length) {
            photoContent += "\n"
        }
    })

    fs.readFile('./README.template.md', 'utf8', (err, data) => {
        const content = data
            .replace(/\{\{PHOTOS\}\}/, photoContent)
            .replace(/\{\{TODAY\}\}/, today)

        fs.writeFile('README.md', content, (err) => {
            if (err) {
                return console.error(err)
            }
            console.info('Writing to README.md')
        })
    })
})

