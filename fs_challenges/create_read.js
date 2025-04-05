import * as fs from 'node:fs/promises';
import {cwd} from 'process';

async function create() {
 try{
    const message = 'Hello, this is a Node.js file!';
    await fs.writeFile('message.txt', message)
    console.log(`File created successfully!`);
 } catch(error){
    console.error(`Error occured while writting on file ${error.message}`)
 }
}

const path = `${cwd()}/message.txt`;
async function read(filePath) {
    try{
        const data = await fs.readFile(filePath, 'utf-8');
        console.log(`File content: ${data.toString()}`);
    }catch(error){
        console.error(`Error occured while reading the file ${error.message}`);
    }
}

async function excute(){
    await create();
    await read(path);
}

excute();