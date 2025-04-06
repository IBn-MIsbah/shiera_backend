import fs from 'fs/promises';
import { cwd } from 'process';

async function update () {
    try{
        const message = ' This text is added later.'
        await fs.writeFile('./message.txt', message, {flag :'a'})
        console.log('File updated successfully!');
    }catch(error){
        console.error(`Error: ${error.message}`)
    }
}

const path = `${cwd()}/message.txt`;
async function read(filePath) {
    try{
        const data = await fs.readFile(filePath, 'utf-8');
        console.log(`Updated Content: ${data.toString()}`);
        console.log('File will be deleted in 5 seconds…' );
    }catch(error){
        console.error(`Error: ${error.message}`);
    }
}

async function deleteFile(filePath) {
    try{
        await fs.unlink(filePath);
    }catch(error){
        console.error(`Got an error trying to delete the file: ${error.message}`);
    }
}

async function excute() {
    await update();
    await read(path);
    
    await new Promise(resolve => {
        setTimeout(resolve, 5000);
    });

    await deleteFile(path);
    console.log('(File deleted)');
}


excute();