wget http://www2.census.gov/geo/tiger/GENZ2017/shp/cb_2017_us_cd115_500k.zip && \
  unzip cb_2017_us_cd115_500k.zip && \
  shp2json cb_2017_us_cd115_500k.shp | \
  ndjson-join --left 'd.properties.GEOID' 'd.GEOID' <(ndjson-split 'd.features') <(csv2json -n races.csv) | \
  ndjson-map 'Object.assign(d[0].properties, d[1]), d[0]' | \
  ndjson-reduce 'p.features.push(d), p' '{type: "FeatureCollection", features: []}' | \
  geoproject 'd3.geoAlbersUsa()' | \
  geoproject 'd3.geoIdentity().reflectY(false).fitSize([960, 500], d)' | \
  geo2topo districts=- | \
  topomerge states=districts -k 'd.properties.STATEFP' | \
  topomerge nation=states -k '1' | \
  toposimplify -f -p 0.05 | \
  topoquantize 1e5 > ./districts-albers-d3.json && \
  rm cb_2017_us_cd115_500k.*
