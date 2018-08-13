cd ~/projects/phantom_snapshot/snaps
phantomjs ~/projects/phantom_snapshot/snapshot_mobile.js
phantomjs ~/projects/phantom_snapshot/snapshot.js
aws s3 sync ~/projects/phantom_snapshot/snaps s3://static.startribune.com/elections/image-widgets/mn-20180814/ --acl "public-read" --cache-control="public, max-age=30, must-revalidate" --metadata-directive="REPLACE"