#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
cd $DIR/../;

if [ -f ionic_serve.pid ];
then
	kill `cat ionic_serve.pid`;
	rm ionic_serve.pid;
fi;
node_modules/ionic/bin/ionic serve --nobrowser --nolivereload --port=8100 &
echo $! > ionic_serve.pid;
node_modules/protractor/bin/protractor test/protractor.config.js;
isok=$?;
kill `cat ionic_serve.pid`;
rm ionic_serve.pid;
exit $isok;