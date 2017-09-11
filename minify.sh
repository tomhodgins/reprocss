#!/bin/sh

# Remove old files
mkdir ./min
rm ./min/* -v;

# Minify reproCSS
echo "Minifying reproCSS...";
echo "/* reproCSS / Tommy Hodgins / MIT License / version 0.0.9 */" > ./min/reprocss.min.js;
uglifyjs reprocss.js >> ./min/reprocss.min.js;

# Minify Mixins
echo "Minifying mixins...";
cd mixins;
for f in *.js;
do
  echo "/* ${f%.*} / Tommy Hodgins / MIT License / version 0.0.9 */" > ../min/"${f%.*}.min.js";
  uglifyjs ./"$f" >> ../min/"${f%.*}.min.js";
done