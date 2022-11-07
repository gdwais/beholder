```
SELECT *
FROM (SELECT ac.id, ac.name, COUNT(a.*) AS count
      FROM asset_collections ac
               LEFT JOIN assets a ON ac.id = a.collection_id
      GROUP BY ac.id, ac.name
      ORDER BY count DESC
      LIMIT 20) AS asset_count

         INNER JOIN (SELECT DISTINCT ON (collection_id) collection_id, name, mint, image
                     FROM assets
                     ORDER BY collection_id, created_at DESC) AS single_nft ON asset_count.id = single_nft.collection_id
;
```
