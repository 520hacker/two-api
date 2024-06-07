# 云图片自动转存Aliyun OSS服务

这是一个提供给前端调用的图片转存OSS服务，用于加速云端的图片，采用的方式是克隆到自己设定的OSS空间内，并配合OSS的CDN和文件宽高功能来提供页面加速。



## Aliyun OSS的优势和好处：

1. 纯静态存储，无安全性问题。
2. 通过简单的配置就可以设定为CDN，速度上有保障。
3. 通过简单的后缀参数就可以获取指定大小的图片，减轻页面的网络流量压力。



## 本项目的基础运作逻辑

1. 假设本项目部署地址后的访问地址是 https://static2oss.domain.com/ ， 而需要被缓存和备份文件地址是 https://filesystem.site/cdn/download/20240607/Qf6cj8ZZQDF3xPpKHclxxmsk6E1TYe.txt ， 前端页面中期望打开的图片大小是500宽。
2. 在前端的页面中，把图片地址设置为 https://static2oss.domain.com/o?plus=w_500&url=https://filesystem.site/cdn/download/20240607/Qf6cj8ZZQDF3xPpKHclxxmsk6E1TYe.txt 。
3. 用户在第一次请求该地址的时候，会跳转真实的原始地址。
4. 本服务会在后台将指定地址的内容镜像到OSS中。
5. 任意用户在第二次请求该地址的时候，会返回缓存过的OSS地址，速度大大加快。



## 参数说明（docker Compose）

```yaml
version: '3'
services:
  img2oss:
    image: odinluo/img2oss:latest
    ports:
      - 5000:5000
    environment:
      - ACCESS_KEY_ID= #「osskey」
      - ACCESS_KEY_SECRET= #「oss secret」
      - BUCKET_NAME= #「oss bucket name」
      - ENDPOINT= #「oss endpoint 如 oss-cn-hangzhou.aliyuncs.com」
      - CDN= #「oss 访问地址」
      - REGION= #「oss region 如 cn-hangzhou」
    volumes:
      - /www/img2oss:/app/data # /www/img2oss 是在服务器上创建的用来存储数据库的文件夹 
```



## 本项目的安装和部署方式

Docker run 部署

如下所示：

```sh
docker run -d \
  -p 5000:5000 \
  -e ACCESS_KEY_ID=「osskey」 \
  -e ACCESS_KEY_SECRET=「oss secret」 \
  -e BUCKET_NAME=「oss bucket name」 \
  -e ENDPOINT=「oss endpoint 如 oss-cn-hangzhou.aliyuncs.com」 \
  -e CDN=「oss 访问地址」 \
  -e REGION=「oss region 如 cn-hangzhou」 \
  -v /www/img2oss:/app/data \
  odinluo/img2oss:latest
```

在这个命令中：

- `-d` 表示容器将以分离模式运行。
- `-p 5000:5000` 将主机的5000端口映射到容器的5000端口。
- `-e` 选项用来设置环境变量，例如 `ACCESS_KEY_ID`、`ACCESS_KEY_SECRET` 等。
- `-v /www/img2oss:/app/data` 将主机上的 `/www/img2oss` 目录挂载到容器内的 `/app/data` 目录。
- `odinluo/img2oss:latest` 是要运行的镜像名称及其标签。



## 支持API

#### / 

- 同  /list

#### /list 

- 直接返回json格式的列表信息，

- 默认请求例子  https://static2oss.domain.com/list 

- 支持翻页参数 
  - offset https://static2oss.domain.com/list?offset=10
  - limit https://static2oss.domain.com/list?offset=10&limit=10

#### /o

- 支持参数 url，plus
  - url：必选，被转换的原始地址 https://static2oss.domain.com/o?url=https://filesystem.site/cdn/download/20240607/Qf6cj8ZZQDF3xPpKHclxxmsk6E1TYe.txt
  - plus：可选，附加的OSS宽高设定【如w_500,h_100】 https://static2oss.domain.com/o?plus=w_500&url=https://filesystem.site/cdn/download/20240607/Qf6cj8ZZQDF3xPpKHclxxmsk6E1TYe.txt





## License

MIT



## PR请联系

https://t.me/Odinluo
