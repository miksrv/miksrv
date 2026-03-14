const imageHost = 'https://api.astro.miksoft.pro/astrophotos/'
const fs = require('fs').promises
const axios = require('axios')

const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
})

async function buildReadme() {
    const response = await axios.get('https://api.astro.miksoft.pro/photos?limit=4&order=rand')
    const items = response.data?.items ?? []

    const photoContent = items
        .map(photo => `<img src="${imageHost}${photo.dirName}/${photo.fileName}_medium.${photo.fileExt}" alt="${photo.dirName}" width="23%" />`)
        .join('\n')

    const template = await fs.readFile('./README.template.md', 'utf8')
    const readme = template
        .replace('{{PHOTOS}}', photoContent)
        .replace('{{TODAY}}', today)

    await fs.writeFile('README.md', readme)
    console.log('README.md written successfully')
}

buildReadme().catch(err => {
    console.error('Failed to build README:', err.message)
    process.exit(1)
})
