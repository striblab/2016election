#!/bin/bash

# Creates a simpfied, d3-friendly topojson map of Minnesota counties
# Requires a few tools:
#  - wget: https://www.gnu.org/software/wget/
#  - shp2json: https://github.com/mbostock/shapefile
#  - mapshaper: https://github.com/mbloch/mapshaper
#  - topojson: https://github.com/topojson/topojson-client

# One way to do this on OSX is:
# brew install wget
# npm install -g topojson shapefile d3-geo-projection mapshaper

wget https://www2.census.gov/geo/tiger/GENZ2017/shp/cb_2017_us_county_500k.zip && \
  unzip cb_2017_us_county_500k.zip && \
  shp2json cb_2017_us_county_500k.shp | \
  mapshaper - -filter "STATEFP == '27'" -quiet -o ./cb_2017_us_county_500k.json format=geojson && \
  cat cb_2017_us_county_500k.json | \
  geoproject 'd3.geoAlbersUsa()' | \
  geoproject 'd3.geoIdentity().reflectY(false).fitSize([400, 400], d)' | \
  geo2topo counties=- | \
  toposimplify -f -p 0.05 | \
  topoquantize 1e5 > ./mncounties.json && \
  rm cb_2017_us_county_500k.*
