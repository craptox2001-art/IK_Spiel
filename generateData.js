const fs = require('fs');
const path = require('path');

const audioFolder = path.join(__dirname, 'Audio Files');
const partiturFolder = path.join(__dirname, 'Partituren');

function getFiles(folder, extensions) {
    return fs.readdirSync(folder).filter(file => {
        return extensions.includes(path.extname(file).toLowerCase());
    });
}

const audioFiles = getFiles(audioFolder, ['.mp3']).map((file, index) => ({
    id: (index + 1).toString(),
    title: path.basename(file, path.extname(file)),
    fileUrl: path.join('Audio Files', file).replace(/\\/g, '/')
}));

const partiturFiles = getFiles(partiturFolder, ['.png']).map((file, index) => ({
    id: (index + 1).toString(),
    title: path.basename(file, path.extname(file)),
    fileUrl: path.join('Partituren', file).replace(/\\/g, '/')
}));

const data = { audio: audioFiles, partitur: partiturFiles };

fs.writeFileSync('data.json', JSON.stringify(data, null, 2), 'utf8');

console.log('✅ data.json erfolgreich erstellt!');
