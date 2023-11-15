# TWO-API

为套壳AI应用提供合规支持，为您和您的企业提供合规的AI接入能力。

我们致力于为中小企业和个人提供：

- 为国产AI接入统一标准的开源生态提供桥梁，对现有的AI源应用提供转发支持；
- 为合规提供可配置的日志、存档、过滤、敏感词拒止功能；
- 收集和整理合规渠道、提供一键合规填报能力；
- 多源并行接入，让中小企业在AI时代不再踌躇选A还是选B;

我们提供以下基础功能：

- 多渠道和品牌AI接入并在接口之间互相转换
- 用户、渠道、模型、令牌管理功能
- 倍率、绘图、魔改功能
- 页面信息管理功能

## Road Map

- [x] 用户系统

  - [x] 注册
    - [x] 用户名注册
    - [ ] 邮件注册
  - [x] 登录
  - [ ] 忘记密码（邮件取回）
  - [x] 更新密码
- [ ] 转发
  - [x] OPANAI
  - [ ] Azure OPENAI
  - [ ] OPENAI Function_call
  - [ ] OPENAI Embinding
  - [x] 百度
  - [x] 讯飞
  - [x] 360
  - [x] ChatGLM
  - [x] BaiChuan
  - [x] IIM.ai
- [x] 渠道
- [x] 模型一览
- [x] 令牌
- [x] 兑换
- [x] 充值
- [x] 合规
  - [x] 敏感词
  - [x] 备案信息可设置
  - [x] 聊天记录
  - [x] IP限制
- [x] 插件
  - [x] 自定义鲁迅
  - [x] 联网查询
  - [x] god mj 魔改
  - [x] 日志
- [ ] 已知问题
  - [x] 穷举防御
  - [ ] 自动化安装部署逻辑
  - [ ] 自动化升级逻辑
  - [x] 解决手机界面 部分导航链接看不到的问题
- [ ] 优化
  - [ ] 支持选择使用Redis替代缓存 
  - [ ] 用户个性化魔改设置


## 如何使用：

把你的代理或者API host配置成您的TWO-API部署地址，如: https://twoapi.qiangtu.com

- 在token处填你生成的 令牌
- 在token页面也可以点击复制按钮把令牌复制之后用在别处
- 也可以直接选择直接点击打开 Chat Next Web 或者 AMA 这样强大的客户端。

## 测试地址：https://twoapi.qiangtu.com/

当前站点是一个测试站点，仅供内部测试使用。
本项目致力于降低AI在中小企业中的使用门槛，并帮助中小企业更容易的借助于广阔的开源生态和国际化的AI产品，助力中小企业发展。

- 下载地址：https://hub.docker.com/r/odinluo/twoapi
- 开源地址：https://github.com/520hacker/two-api (敬请期待)
- 使用指南：https://twoapi.qiangtu.com/howtouse (敬请期待)

---

## 预备集成目标：

- 百度（文心一言）https://wenxin.baidu.com
- 抖音（云雀大模型）https://www.doubao.com
- 智谱AI（GLM大模型）https://chatglm.cn
- 中科院（紫东太初大模型）https://xihe.mindspore.cn
- 百川智能（百川大模型）https://www.baichuan-ai.com
- 商汤（日日新大模型）https://www.sensetime.com
- MiniMax（ABAB大模型）https://api.minimax.chat
- 上海人工智能实验室（书生通用大模型）https://intern-ai.org.cn

## 安装

- 初始化用户名和密码 init /  k34ugfL5UkHxQ2k
- 安装好 Mysql 并初始化数据库，执行 twoapi20231115.sql 
- docker pull image odinluo/twoapi:latest
- 创建容器并设置端口映射和环境变量
- 启动容器
- 通过访问容器的暴露端口和ip就可以访问 twoapi 了

#### 端口和环境变量说明

```
   ports:
      - 7001:80
   environment:
      - MYSQL_HOST=172.17.0.1
      - MYSQL_USER=您的MYSQL用户名
      - MYSQL_PWD=您的MYSQL密码
      - MYSQL_DB=您的MYSQL数据库地址
```

