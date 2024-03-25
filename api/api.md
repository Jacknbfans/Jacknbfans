
### API

<!--
#生成一个公钥密钥对
openssl genpkey -algorithm rsa -out rsa_private.key
#从该文件中，提取出公钥
openssl rsa -pubout -in rsa_private.key  -out rsa_pub.key
#非对称加密，用私钥加密，用公钥解密。
#注意:私钥加密在openssl中对应的是-sign这个选项，公钥解密对应的是-verify这个选项
#先生成一个测试文件：
$echo "this is a test" > text
#用私钥对文件进行加密（签名）
$openssl rsautl -sign -in text -inkey rsa_private.key -out text.en
#用公钥对文件进行解密（校验）
$openssl rsautl -verify -in text.en -inkey rsa_pub.key -pubin
this is a test




$ openssl ecparam -name prime256v1 -genkey -out eckey.pem

$ openssl pkcs8 -in eckey.pem -topk8 -nocrypt -out eckey.p8
-->
=======
# 

