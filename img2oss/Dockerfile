# 使用官方Python基础镜像
FROM python:3.9-slim-buster

# 设置工作目录
WORKDIR /app

# 复制requirements.txt到工作目录
COPY requirements.txt .

# 安装Python依赖
RUN pip install --no-cache-dir -r requirements.txt

# 复制应用程序代码到工作目录
COPY . .

# 创建临时目录
RUN mkdir -p tmp

# 创建数据目录
RUN mkdir -p data

# 暴露应用程序端口(根据实际情况修改)
EXPOSE 5000

# 运行应用程序
CMD ["python", "app.py"]