# TWO-API

一款正在快速开发中的API中转平台，基于 .net8 + mysql 。

目前的开发目标为套壳AI应用提供合规支持，为您和您的企业提供合规的AI接入能力。

![image-20231202220709387](https://memosfile.qiangtu.com/picgo/assets/2023/12/02202312_02220709.png)



#### 应用案例
- 程序员需求 一键给文件夹中所有的代码添加注释的应用 https://github.com/520hacker/CodeCommenter

- 学生需求 讲笔记转为测试用的题目，用来强化复习 https://github.com/520hacker/note2exam
  
- 网页植入：在任意网页上插入以下js, 就能在当前页面支持AI对话功能,  [例子1](https://odin.mblog.club) [例子2](https://github.com/520hacker/markdown-AI-editor)
  支持选择文字对话和右下角点击弹出对话窗体。

        var script = document.createElement('script');
        script.src = 'https://twoapi-ui.qiangtu.com/scripts/content.js';
        document.body.appendChild(script);

#### 我们致力于为中小企业和个人提供：

- 为国产AI接入统一标准的开源生态提供桥梁，对现有的AI源应用提供转发支持；
- 为合规提供可配置的日志、存档、过滤、敏感词拒止功能；
- 收集和整理合规渠道、提供一键合规填报能力；
- 多源并行接入，让中小企业在AI时代不再踌躇选A还是选B;



#### 我们提供以下基础功能：

- 多渠道和品牌AI接入并在接口之间互相转换
- 用户、渠道、模型、令牌管理功能
- 模型映射、文件上传、token倍率、AI绘图、对话魔改功能
- 基础的页面信息管理功能
- 基于API的demo



### 相关链接

- 已支持API(在线调试)  https://twoapi.qiangtu.com/fytapiui/index.html
- 已支持API的demo（应用案例） https://twoapi-ui.qiangtu.com/
- demo 工程源代码 https://github.com/520hacker/two-api/tree/main/vue-sample
- manager 工程前端源代码 https://github.com/520hacker/two-api/tree/main/vue-manager

## Road Map

- [x] 用户系统

  - [x] 注册
    - [x] 用户名注册
  - [x] 登录
  - [x] 更新密码
  
- [x] 转发
  - [x] OPANAI https://openai.com/
  - [x] 百度文心千帆 https://cloud.baidu.com/doc/WENXINWORKSHOP/index.html 
  - [x] 阿里通义千问 https://help.aliyun.com/document_detail/2400395.html
  - [x] 讯飞星火大模型 https://www.xfyun.cn/doc/spark/Web.html
  - [x] 360智脑 https://ai.360.cn/
  - [x] 智谱官方 ChatGLM https://bigmodel.cn/
  - [x] 百川大模型 BaiChuan https://platform.baichuan-ai.com/docs/api
  - [x] IIM.ai https://iim.ai/
  - [x] gptgod https://www.gptgod.site
  
- [x] 基础接口
  - [x] 文字生成 Chat
  - [x] 文字转语音，朗读 Audio
  - [x] 识图  gpt-4-vision-preview

- [x] 渠道

- [x] 令牌

- [x] 兑换

- [x] 充值

- [x] 日志

- [x] 合规
  - [x] 敏感词
  - [x] 备案信息可设置
  - [x] 聊天记录
  - [x] IP限制
  
- [x] 插件
  - [x] 在线调试 （在web界面调试所有开放的接口）
  - [x] 模型一览 Api （根据key查询到当前key能用的所有模型信息）
  - [x] Gpt4面具 自定义鲁迅等
  - [x] 联网查询  （基于搜索的结果进行总结和回答）
  - [x] 网页总结  （基于抓取网页内容的结果进行总结和回答）
  - [x] 上传文件到oss（支持扣除token上传文件到oss并返回url，图床基础功能）
  
- [x] gptgod 魔改接口支持
  - [x] dalle-3 绘图支持
  - [x] mj 绘图支持和魔改
  - [x] gpts 支持
  - [x] gpt-4-v 识别上传的图片
  - [x] gpt-4-all 基于上传的文档的对话

- [x] 其他优化
  - [x] 登录穷举防御
  - [x] 高频请求禁止 （默认设置为每个端点200请求每分钟）
  - [x] 自动化安装部署逻辑 （ 升级界面地址为 {manager}/install）
  - [x] 解决手机界面 部分导航链接看不到的问题
  
- [ ] 企业版本优化
  - [ ] 支持选择使用Redis替代缓存 
  - [ ] 代理分润
  - [ ] 代理个性化魔改
  

## TWOAPI衍生验证清单

- 对话：【[NetWeb UI 测试](https://www.8ai.link/)】最强模型【[o1-preview](https://twoapi-ui.qiangtu.com/chat/base/13/186)】【[Claude-3.5](https://twoapi-ui.qiangtu.com/chat/base/122/160)】【[ERNIE-Bot-Pro](https://twoapi-ui.qiangtu.com/chat/base/3/35)】【[glm-4-long](https://twoapi-ui.qiangtu.com/chat/base/12/181)】开源【[Two API UI源码](https://github.com/520hacker/two-api)】
- 翻译：【[语法优化](https://twoapi-ui.qiangtu.com/chat/base/1/164)】【[中英互译](https://twoapi-ui.qiangtu.com/chat/base/7/164)】
- 文案：【[董宇辉风格](https://twoapi-ui.qiangtu.com/chat/base/118/77/dse9iXvor)】【[小红书](https://twoapi-ui.qiangtu.com/chat/base/107/72)】【[小红书2](https://twoapi-ui.qiangtu.com/chat/base/108/11)】
- 微信：清单【 [主流微信BOT方案](https://github.com/520hacker/awesome-ai/blob/main/%E5%BE%AE%E4%BF%A1ChatGPT.md) 】音色加持【 [福利：微信萌妹子语音](https://odin.mblog.club/%E5%B0%8F%E5%A7%90%E5%A7%90%E8%AF%AD%E9%9F%B3)】
- 语音：【板块建设中...】
- 论文：**论文神器**【[免费测试](https://twoapi-ui.qiangtu.com/article/generator)】开源【[论文神器源码](https://github.com/520hacker/lunwenshenqi)】【[教学](https://odin.mblog.club/AI%E9%95%BF%E6%96%87%E7%94%9F%E6%88%90%E5%99%A8)】
- 助学：【[笔记测验](https://note2exam.qiangtu.com/)】开源【[笔记测验源码](https://github.com/520hacker/note2exam)】
- 读文件：【[基于文档对话](https://twoapi-ui.qiangtu.com/chat/base/113/69)】
- 做图片： 【[识别图片](https://twoapi-ui.qiangtu.com/chat/base/112/70)】【[生成头像](https://twoapi-ui.qiangtu.com/chat/base/139/77/Wk77jayA0)】 开源【[批量出图源码](https://github.com/520hacker/mj-chat-autorun)】
- 写歌：【[SUNO](https://twoapi-ui.qiangtu.com/chat/base/127/159)】
- 做PPT：【[GPTS](https://twoapi-ui.qiangtu.com/chat/base/131/77/Gt6Z8pqWF)】
- 做视频： 转发成本较高,不稳定:【[RUNWAY](https://twoapi-ui.qiangtu.com/chat/base/141/180)】【[LUMA](https://twoapi-ui.qiangtu.com/log/video/luma-video)】【[VIDU](https://twoapi-ui.qiangtu.com/chat/base/140/177)】
- 游戏：【[哄哄女友](https://twoapi-ui.qiangtu.com/chat/base/120/164) 】【 [辩论会](https://twoapi-ui.qiangtu.com/chat/base/143/164)】
- 卡片：【[答案之书](https://twoapi-ui.qiangtu.com/chat/base/142/164)】【[新解词语卡](https://twoapi-ui.qiangtu.com/chat/base/144/164)】
- 人物：【[禅师](https://twoapi-ui.qiangtu.com/chat/base/106/139)】【[祖母](https://twoapi-ui.qiangtu.com/chat/base/5/138)】【[半仙](https://twoapi-ui.qiangtu.com/chat/base/135/77/984qxMQkT)】
- 插件：【[一步](https://yibu.qiangtu.com/)】开源【[ECHO-一步](https://github.com/520hacker/markdown-AI-editor/tree/main/source-vue)】应用：【[随手记](https://suishouji.qiangtu.com/)】
- 编程：开源【[给整个项目添加注释源码](https://github.com/520hacker/CodeCommenter)】

### 汇总本站点已开源模块：

- 开源【[给整个项目添加注释 源码](https://github.com/520hacker/CodeCommenter)】
- 开源【[Two API UI 源码](https://github.com/520hacker/two-api)】
- 开源【[论文神器 源码](https://github.com/520hacker/lunwenshenqi)】
- 开源【[笔记测验 源码](https://github.com/520hacker/note2exam)】
- 开源【[批量出图 源码](https://github.com/520hacker/mj-chat-autorun)】
- 开源【[随手记 源码](https://github.com/520hacker/markdown-AI-editor)】

### 其他开源项目

- 开源【[今日词云 源码](https://github.com/520hacker/Today.WordCloud)】
- 开源【[AI摆摊海报](https://github.com/520hacker/qrcode_maper)】
- 开源【[RSS广场](https://github.com/520hacker/rss-square)】
- 开源【[图片协议转存OSS](https://github.com/520hacker/img2oss)】



## 国产AI

| 厂家                                        | 主站MODEL                                                    | Free                                                         | 开源                                                         |
| ------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| [百度](https://aistudio.baidu.com/index)    | [ERNIE-Bot-Pro](https://twoapi-ui.qiangtu.com/chat/base/3/35),[ERNIE-Bot-turbo](https://twoapi-ui.qiangtu.com/chat/base/3/34),[ERNIE-Bot](https://twoapi-ui.qiangtu.com/chat/base/3/33) | [ERNIE-Lite](https://twoapi-ui.qiangtu.com/chat/base/3/147),[ERNIE-Speed](https://twoapi-ui.qiangtu.com/chat/base/3/146),[ERNIE-Tiny](https://twoapi-ui.qiangtu.com/chat/base/3/148) |                                                              |
| [阿里](https://bailian.console.aliyun.com/) | [qwen-max](https://twoapi-ui.qiangtu.com/chat/base/115/78),[qwen-2-70b](https://twoapi-ui.qiangtu.com/chat/base/115/114),[qwen-long](https://twoapi-ui.qiangtu.com/chat/base/115/192) |                                                              | [qwen2-72b-instruct](https://www.ollama.com/library/qwen2)   |
| [腾讯](https://hunyuan.tencent.com/)        | [hunyuan](https://twoapi-ui.qiangtu.com/chat/base/134/87)    | [yuanqi](https://twoapi-ui.qiangtu.com/chat/base/5/138),hunyuan-lite |                                                              |
| 月之暗面                                    | [kimi](https://twoapi-ui.qiangtu.com/chat/base/116/127),[moonshot-v1-128k](https://twoapi-ui.qiangtu.com/chat/base/116/85) |                                                              |                                                              |
| DEEPPSEEK                                   | [deepseek-chat](https://twoapi-ui.qiangtu.com/chat/base/130/131),[deepseek-coder](https://twoapi-ui.qiangtu.com/chat/base/130/132) |                                                              | [deepseek-v2.5](https://www.ollama.com/library/deepseek-v2.5) [deepseek-coder-v2](https://www.ollama.com/library/deepseek-coder-v2) |
| 智谱                                        | [glm-4](https://twoapi-ui.qiangtu.com/chat/base/12/99)       | [GLM-4-Flash](https://twoapi-ui.qiangtu.com/chat/base/12/191) | [glm4-9B](https://www.ollama.com/library/glm4)               |
| 讯飞                                        | [generalv3.5](https://twoapi-ui.qiangtu.com/chat/base/123/108) |                                                              |                                                              |
| 百川                                        | Baichuan4,Baichuan3-Turbo,Baichuan3-Turbo-128k               |                                                              | [baichuan2-13b-chat-v1](https://www.ollama.com/maxkb/baichuan2) |
| 360                                         | [360gpt2-pro](https://twoapi-ui.qiangtu.com/chat/base/11/173),[360gpt-turbo](https://twoapi-ui.qiangtu.com/chat/base/11/175),[360GPT_S2_V9.4](https://twoapi-ui.qiangtu.com/chat/base/11/46) |                                                              |                                                              |
| 零一万物                                    | [yi-vl-plus](https://twoapi-ui.qiangtu.com/chat/base/124/122),[yi-34b-chat-200k](https://twoapi-ui.qiangtu.com/chat/base/124/121),yi-large,yi-large-turbo,yi-large-rag,yi-medium | Yi-1.5-6B-Chat,Yi-1.5-9B-Chat-16K                            |                                                              |
| STEP                                        | [step-2-16k](https://twoapi-ui.qiangtu.com/chat/base/128/188) |                                                              |                                                              |
| MINMAX                                      | abab6.5s-245k,abab6.5t-8k,abab6.5g-8k                        |                                                              |                                                              |
| 字节                                        |                                                              |                                                              |                                                              |
| 其他                                        |                                                              | [wbot-2](https://twoapi-ui.qiangtu.com/chat/base/129/126)    |                                                              |

价格对比参考: https://www.llmintro.com/

## 开发和升级计划

![image-20231202220513003](https://memosfile.qiangtu.com/picgo/assets/2023/12/02202312_02220513.png)

如果希望跟进开发进度或者提出修改要求，请滚动到页面底部加群联系。



## 如何使用：

把你的代理或者API host配置成您的TWO-API部署地址，如: https://twoapi.qiangtu.com

- 在token处填你生成的 令牌
- 在token页面也可以点击复制按钮把令牌复制之后用在别处
- 也可以直接选择直接点击打开 Chat Next Web 或者 AMA 这样强大的客户端。





## 测试地址：https://twoapi.qiangtu.com/

当前站点是一个测试站点，仅供内部测试使用。
本项目致力于降低AI在中小企业中的使用门槛，并帮助中小企业更容易的借助于广阔的开源生态和国际化的AI产品，助力中小企业发展。

- 下载地址：https://hub.docker.com/r/odinluo/twoapi
- 开源地址：https://github.com/520hacker/two-api 
- 使用指南：https://twoapi.qiangtu.com/howtouse  

![image-20231202222043297](https://memosfile.qiangtu.com/picgo/assets/2023/12/02202312_02222043.png)



## 预备集成目标：

- 百度（文心一言）https://wenxin.baidu.com
- 抖音（云雀大模型）https://www.doubao.com
- 智谱AI（GLM大模型）https://chatglm.cn
- 中科院（紫东太初大模型）https://xihe.mindspore.cn
- 百川智能（百川大模型）https://www.baichuan-ai.com
- 商汤（日日新大模型）https://www.sensetime.com
- MiniMax（ABAB大模型）https://api.minimax.chat
- 上海人工智能实验室（书生通用大模型）https://intern-ai.org.cn
- 腾讯混元大模型
- 月之暗面
- 国内的其他大模型



## 容器化安装

- 您需要先安装mysql数据库
  - 并创建twoapi库，获得数据库的地址、用户名（比如twoapi）、密码、数据库名（比如twoapi）
  
- 容器地址 odinluo/twoapi:latest   
  - ( 包含api服务和manager前端 )

- 初始化用户名和密码 init / k34ugfL5UkHxQ2k

- 容器初始化命令

 ```
  docker run -d -p 7001:8080 -e UPGRADE_TOKEN={UPGRADE_TOKEN} \
  -e MYSQL_HOST={MysqlIP} -e MYSQL_USER={username} -e MYSQL_PWD={password} -e \
  MYSQL_DB=twoapi odinluo/twoapi:latest
 ```

  #### 说明：

  1. \* `docker run`命令让容器在后台运行。
  2. \* `-d`选项让容器在后台运行，并且容器不会退出。
  3. \* `-p 7001:8080`将主机的7001端口映射到容器的8080端口。
  4. \* `-e UPGRADE_TOKEN={UPGRADE_TOKEN}`设置环境变量UPGRADE_TOKEN。
  5. \* `-e MYSQL_HOST={MysqlIP}`设置环境变量MYSQL_HOST。
  6. \* `-e MYSQL_USER={username}`设置环境变量MYSQL_USER。
  7. \* `-e MYSQL_PWD={password}`设置环境变量MYSQL_PWD。
  8. \* `-e MYSQL_DB=twoapi`设置环境变量MYSQL_DB。
  9. \* `odinluo/twoapi:latest`是要运行的Docker镜像的名称和标签。

- 把7001映射或者反代到你指定的域名80端口

- 请求 http://{ip}/install 访问你的twoapi的安装界面

- 输入你指定的{UPGRADE_TOKEN} 进行初始化，安装完成即可登录使用

- 注意 如何你的数据库用于全局黑名单，请添加你的请求地址到白名单；
  典型错误 "Access denied for user 'twoapi'@'172.17.0.3' (using password: YES)"
  白名单添加命令:
  mysql -h {MysqlIP} -P 3306 -u {username} -p
  {password}
  GRANT ALL PRIVILEGES ON *.* TO '{username}'@'' IDENTIFIED BY '{password}';



### 容器更新命令

```
# 获取更新
sudo docker pull odinluo/twoapi:latest
# 列出容器 获取容器id,tag
sudo docker ps -a
# 停止容器
sudo docker stop {您的容器名称 或者tag }
# 删除容器
sudo docker rm  {您的容器名称 或者tag }
# 重新运行安装时的 docker run 命令
```



#### 端口和环境变量说明

```
   ports:
      - 7001:8080
   environment:
      - UPGRADE_TOKEN=您install界面用到的密码
      - MYSQL_HOST=您的MYSQL服务器地址/ip
      - MYSQL_USER=您的MYSQL用户名
      - MYSQL_PWD=您的MYSQL密码
      - MYSQL_DB=您的MYSQL数据库地址
```



### 部署 Demo 站点 

- 请参看教程 https://github.com/520hacker/two-api/tree/main/vue-sample



## 测试用户募集

- 我们招募测试用户，无论你是企业还是个人，我们都会为您提供一切可能的支持和服务，以完成我们的产品和打磨我们的服务，这一切都是免费的。
- 联系方式见下方



## 联系我们

http://qr61.cn/oRUvxf/qyT8mJT
