#!/bin/sh

if [ "$PROD" -eq "1" ]; then npm run build && npx serve -s build; else npm start; fi
