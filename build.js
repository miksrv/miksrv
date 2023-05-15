const imageHost = 'https://astro.miksoft.pro/api/photos/'
const fs = require('fs')
const axios = require('axios')
const today = new Date().toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

const result = axios.get('https://astro.miksoft.pro/api/photo?order=random&limit=4').then((result) => {
    let photoContent = ''

    result.data.items.forEach((photo, index) => {
        photoContent += (`<img src="${imageHost}${photo.image_name}_thumb.${photo.image_ext}" alt="" style="width: 24%; height: 150px; object-fit: cover;" />`)

        if (result.data.items.length < (index + 1)) {
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

