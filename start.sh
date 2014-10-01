#! /bin/sh
CURPATH="/home/myftp"
SUPERVISOR="/usr/bin"
exec "$SUPERVISOR/supervisor" "$CURPATH/app.js"
