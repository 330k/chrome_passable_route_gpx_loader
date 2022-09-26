#!/bin/bash

rm *.zip
zip -r passable_route_gpx_loader.zip ./ -x '.*' -x 'video/**' -x 'img/org/*' -x '.git/**' -x '*.sh' -x '*.zip'
