import fs from 'fs/promises';
import path from 'path';
import { cwd } from 'process';

const dir = '/myFolder';

async function newDir(fileName) {
    try{
        await fs.mkdir(fileName, {recursive : true })
        console.log('Directory created successfully!');
    }catch(error){
        console.log(`Error: ${error.message}`);
    }
}

async function addFiles(filePath) {
    try{
        await fs.writeFile(`${filePath}/file1.txt`, '');
        await fs.writeFile(`${filePath}/file2.txt`, '');
        await fs.writeFile(`${filePath}/file3.txt`, '');
    }catch(error){
        console.error(`Error: ${error}`)
    }
}
const file = `${cwd()}${dir}`
async function list() {
    const data = await fs.readdir(file);
    console.log('Files in myFolder:', data);
}

async function excute() {
    await newDir(dir);
    await addFiles(dir);
    await list();
};

excute();