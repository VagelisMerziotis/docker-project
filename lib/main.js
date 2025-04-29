#!/usr/bin/env node

import { describe, hideBin } from 'yargs';
import yargs from 'yargs';

const argv = yargs(hideBin(process.argv))
    .usage('Usage: pull or push -[options]')
    .command(
        'pull', 
        'A command that executes the pull.js function that fetches data from the remote database and saves it in the local databse.',
        (yargs) => {
            yargs
                .option('sheet', {
                    alias: '-s',
                    describe: 'Defines the Google sheet ID to push data to',
                    type: 'string'
                },
                (argv) => {
                    // google sheet push logic
                })
                .option('kafka',{
                    alias: '-kafka',
                    describe: 'Declare if need to pull from kafka',
                    type: 'string'§
                },
                (argv) => {
                    // kafka pull logic
                })
                .option('database',{
                    alias: '-db',
                    describe: 'Declare if need to pull from postgres database',
                    type: 'string'
                }, 
                (argv) =>{
                    //postgres pull logic
                })
        })