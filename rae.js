#!/usr/bin/env node
const parseArgs = require('minimist');
const chalk = require('chalk');
const { exec } = require('child_process');
const sleep = require('sleep');

// Command to invoke drae
const DRAE_CMD = 'docker run squat/drae define';

// used colors
const colors = {
    word: chalk.cyanBright,
    etymology: chalk.reset,
    definition: chalk.reset,
    variation: chalk.cyan,
    category: chalk.yellow,
    origin: chalk.greenBright,
    notes: chalk.blueBright,
    examples: chalk.magentaBright,
};

const showHelp = () => {
    console.log(`${usedName}: Human interface for squat/drae` );
    console.log(
`Usage: ${usedName} [options] word(s)

Options:
  -h, --help         Show help
  -s, --short        Show short version
  -S, --supershort   Show super short version (one line per word)
  -a, --all          Show all available data
` );
}

// Get args
const argv = parseArgs(process.argv.slice(2), {
    boolean: [
        'a', 'all',
        's', 'short',
        'S', 'supershort',
        'h', 'help'
    ]
});

if (argv.a) { argv.all = true; }
if (argv.s) { argv.short = true; }
if (argv.S) { argv.supershort = true; }
if (argv.h) { argv.help = true; }

// Get name used to call
const usedNameParts = process.argv[1].split('/');
const usedName = usedNameParts[usedNameParts.length - 1];

// If help requested, show help and exit
if (argv.help) {
    showHelp();
    process.exit(0);
}

// Make sure we have a word
if (argv._.length < 1) {
    showHelp();
    process.exit(1);
}

const words = [];
let res = {};
let out = '';

const showDefArray = (out,data,color) => {
    if (data && data.length) {
        let txt = ' (';
        for (item of data) {
            txt += `${item} | `;
        }
        txt = txt.substring(0,txt.length-3);
        txt += ')';
        out += color(txt);
    }
    return out;
}

const showDef = (out, df) => {
    out += colors.definition(`- ${df.definition} `);

    if (df.category) {
        out += colors.category(`(${df.category})`);
    }

    out = showDefArray(out, df.origin, colors.origin);
    out = showDefArray(out, df.notes, colors.notes);
    out = showDefArray(out, df.examples, colors.examples);
    out += '\n';

    return out;
}

const showDefinitions = (out, res) => {
    for (df of res.definitions) {
        out = showDef(out, df);
    }

    return out;
}

const showVariations = (out, res) => {
    if (res.variations.length === 0) {
        return out;
    }

    for (vr of res.variations) {
        out += `${colors.variation(vr.variation)}`;
        out += `\n`;
        for (df of vr.definitions) {
            out = showDef(out, df);
        }
    }

    return out;
}

// Run squat/drae and get JSON result
for (item of argv._) {
    words.push({
        word: item,
        output: '',
        finished: false,
    });
}

for (wordIndex in words) {
    const word = words[wordIndex];

    exec(`${DRAE_CMD} ${word.word}`, (err, stdout, stderr) => {
        if (err) {
            // node couldn't execute the command
            console.log(`ERROR: ${err}`);
            process.exit(1);
        }

        // the *entire* stdout and stderr (buffered)
        // console.log(`stdout: ${stdout}`);
        // console.log(`stderr: ${stderr}`);
        res = JSON.parse(stdout)[0];

        word.output += `${colors.word(res.word)}`;

        if (argv.supershort) {
            word.output += colors.definition(` ${res.definitions[0].definition}`);
        } else {
            if (res.etymology) {
                word.output += ` ${colors.etymology('(' + res.etymology + ')')}`;
                word.output += `\n`;
            }

            if (argv.short) {
                word.output = showDef(word.output, res.definitions[0]);
            } else {
                word.output = showDefinitions(word.output, res);

                if (argv.all) {
                    word.output = showVariations(word.output, res);
                } else {
                    if (res.variations.length > 0) {
                        word.output += `${colors.variation('[variations available]\n')}`;
                    }
                }
            }
        }

        word.finished = true;
    });
}

const check = () => {
    let allFinished = true;
    for (word of words) {
        if (!word.finished) {
            allFinished = false;
            break;
        }
    }

    if (allFinished) {
        for (word of words) {
            console.log(word.output);
        }
    } else {
        wait(100);
    }
}

const wait = (time) => {
    setTimeout(() => {
        check();
    },time);
};

wait(100);
