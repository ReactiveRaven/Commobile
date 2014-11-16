#!/bin/bash

while [ true ];
do
    npm run protractor-standalone > out.txt 2>/dev/null;
    if [ `cat out.txt | grep "Error communicating with the remote browser. It may have died" | wc -l | tr -d " \n"` -gt 0 ];
    then
        echo -n "?";
    else
        clear;
        cat out.txt;
    fi;
    rm out.txt;
done;
