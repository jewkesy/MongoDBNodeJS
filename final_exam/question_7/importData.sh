#!/bin/bash
mongoimport -d question7 -c albums --drop < final7/final7/albums.json
mongoimport -d question7 -c images --drop < final7/final7/images.json
mongo question7 --eval "db.albums.ensureIndex({'images' : 1})"
mongo question7 --eval "db.images.ensureIndex({'tags' : 1})"