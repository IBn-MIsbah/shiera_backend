import path from 'node:path';
import {cwd} from 'node:process';

const files = ['message.txt','append_delete.js', 'directory.js' ]

for(let i = 0; i < files.length ; i++ ){
    console.log(`Absolute Path of ${files[i]}: \n${path.resolve(cwd(), files[i])}`);
}
