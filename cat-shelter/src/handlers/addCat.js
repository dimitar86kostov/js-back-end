const fs = require("fs/promises");
const { getBreeds } = require("../model");
const { readTemplate, layout } = require("../util");

function breedFragment(breed) {
    return `<option value="${breed}">${breed}</option>`
}

async function addCatHandler(req, res) {
    const template = await readTemplate('addCat');

    const breeds = await getBreeds();

    const html = template.replace('%%breed%%', breeds.map(breedFragment).join('\n'));

    res.writeHead(200, [
        'Content-Type', 'text/html'
    ]);
    res.write(await layout(html));
    res.end();
}

async function postCatHandler(req, res) {
    const data = [];
    const boundary = req.headers['Content-Type'].split('boundary=')[1].trim();

    req.on('data', chunk => data.push(chunk.toString('binary')));
    req.on('end', async () => {
        const formData = new URLSearchParams(data);
        console.log(formData);

        const upload = formData.get('upload');
        console.log(upload);

        if (upload) {
            const body = data.join('');
            const lineIndex = body.indexOf('\n');
            const fileData = body.slice(lineIndex, body.indexOf(boundary, lineIndex));

            const pattern = /filename="(.+)"/;
            const fileName = pattern.exec(fileData)[1];
            console.log(fileName);

            const windowsPattern = /\r\n\r\n/;
            const linuxPattern = /\n\n/;
            let match = windowsPattern.exec(fileData);
            if (match == null) {
                match = linuxPattern.exec(fileData);
            }

            if (match) {
                const file = fileData.slice(match.index).trim();
                const prefix = ('00000' + (Math.random() * 9999999 | 0)).slice(-5);
                await fs.writeFile(`./img${prefix}_${fileName}`, file, 'binary');
            }
        }

        res.writeHead(301, [
            'Location', '/'
        ]);
        res.end();


    })

}


module.exports = {
    addCatHandler,
    postCatHandler
}
