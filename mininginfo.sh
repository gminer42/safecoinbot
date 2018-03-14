#!/bin/bash

while true
do
    rm mininginfo.json
    ./safecoin-cli getmininginfo |& tee -a mininginfo.json
    sleep 20
done
