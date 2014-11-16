#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
cd $DIR/../;

echo $! > ionic_serve.pid;
output=`node_modules/protractor/bin/protractor test/protractor.config.js`;
clear;
echo -e "$output";
isok=$?;
exit $isok;
