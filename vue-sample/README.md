# TWO-AI-DEMO
因为在使用 ONE-API 的过程中有一些疑惑，所以干脆再造一个轮子, 本工程是纯前端的apidemo 。

## 一、Docker 安装教程

先pull 镜像

```
docker pull odinluo/twoapidemo:latest
```

然后使用 docker run 命令

```
docker run -d -p 80:80 \
  -e proxy_url=http://172.17.0.1:7001 \
  --name twoapidemo \
  odinluo/twoapidemo:latest
```

注意  http://172.17.0.1:7001 是您部署的twoapi的地址和端口。



## 二、自己编译安装教程

#### 安装依赖

```
npm install
```

#### 运行本地测试

```
npm run serve
```

#### 编译发布文件

```
npm run build 
```

发布好的文件 会出现在 dist 目录，请通过合适的工具复制到您的站点中。

### 添加反代和配置

在站点中您还需要做一些优化，以保证访问的通畅。

设置反代到您的twoapi站点，比如您的twoapi部署在服务器的7001端口，以宝塔为例，您需要添加配置如下：![image-20231202194936231](https://memosfile.qiangtu.com/picgo/assets/2023/12/02202312_02194943.png)

需要检查的是，您需要确保配置文件中的proxy_pass 是 http://127.0.0.1:7001 而不是 http://127.0.0.1:7001/

 ![image-20231202195145431](https://memosfile.qiangtu.com/picgo/assets/2023/12/02202312_02195145.png)

然后，为了保障您的nginx 能支持vue-route的目录参数，您还需要编辑全局的配置文件![image-20231202195424819](https://memosfile.qiangtu.com/picgo/assets/2023/12/02202312_02195424.png)

即添加内容：

    # 支持vue 的/path 和 #/path 访问
    location / {
        try_files $uri $uri/ /index.html;
    }

完成之后，您就可以通过您的demo站点，开心快乐的测试twoapi带来的全面AI支持啦。



## 三、 自定义您自己的DOCKER

您可以根据您自身的需求调整nginx.conf文件和Dockerfile。

#### nginx.conf

```yaml
server {
  listen 80;
  server_name localhost;
  root /usr/share/nginx/html;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  # 反向代理配置
  location /public {
    proxy_pass $proxy_url;
  }

  location /v1 {
    proxy_pass $proxy_url;
  }
}
```

#### DockerFile

```cmd
# 基于nginx镜像作为基础
FROM nginx:alpine

# 设置环境变量
ENV proxy_url http://127.0.0.1:7001

# 删除nginx默认配置
RUN rm /etc/nginx/conf.d/default.conf

# 将自定义配置文件复制到容器中
COPY nginx.conf /etc/nginx/conf.d/

# 设置工作目录
WORKDIR /usr/share/nginx/html

# 复制构建后的项目文件到容器中
COPY dist/ .

# 暴露容器端口
EXPOSE 80

# 启动nginx服务
CMD ["nginx", "-g", "daemon off;"]
```

