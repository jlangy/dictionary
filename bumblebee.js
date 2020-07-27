const fs = require('fs');
const yargs = require('yargs')
  .usage("node bumblebee.js -l [-p] [-r]")
  .describe("r", 'Make first letter required.')
  .describe("p", "Show only pangrams")
  .describe("l", "Required. Letters in the puzzle. If including the r flag, write the required letter first.")
  .demandOption("l", "Letters to search are required.")
  .help();

const args = yargs.argv;
let letters = args.l;

if(typeof letters !== 'string' || letters.length === 0){
  console.error('Must include letters to search');
  process.exit();
}

letters = letters.toUpperCase().split('');
let rawdata = fs.readFileSync('dictionary.json');
let data = JSON.parse(rawdata);
const words = data.words;


for(let word of words){
  let wordsLetters = word.split('');
  //Only check for pangrams if p flag provided
  if(args.p){
    if(wordsLetters.every(letter => letters.includes(letter)) && letters.every(letter => wordsLetters.includes(letter))){
      console.log(word);
    }
  } else if (args.r){
    //Must include first letter if r flag included 
    if(args.r && wordsLetters.every(letter => letters.includes(letter)) && wordsLetters.includes(letters[0])){
      console.log(word);
    } 
  }
  else if(wordsLetters.every(letter => letters.includes(letter))){
    console.log(word);
  } 
}


