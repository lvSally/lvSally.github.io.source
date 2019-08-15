### 还原盒子至支付

``` sql
UPDATE box set status='7',ChangeSize=0 where ID in('288358');
UPDATE boxdetail set status='6',Type='0' where boxID in('288358');
delete from boxdetailfeedback where BoxDetailID in(select ID from boxdetail where BoxID in('288358')and changedetailid !=0);
delete from payment where objectid in('288358');
delete from boxdetail  where boxid='288358' and changedetailid !=0;
delete from boxproductreserve where BoxID='288358';
```

### 商品价格信息
商品价格信息记录在boxdetail表中