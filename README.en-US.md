# TWO-API

An API relay platform under rapid development, based on .net8 + mysql.

The current development goal is to provide compliance support for AI wrapper applications, offering compliant AI access capabilities for you and your enterprise.

![image-20231202220709387](https://memosfile.qiangtu.com/picgo/assets/2023/12/02202312_02220709.png)


#### Application Cases
- Programmer Needs: An application to add comments to all code in a folder with one click: https://github.com/520hacker/CodeCommenter

- Student Needs: Converting notes into test questions to reinforce review: https://github.com/520hacker/note2exam
  
- Web Integration: Insert the following js into any webpage to support AI chat functionality on the current page. [Example 1](https://odin.mblog.club) [Example 2](https://github.com/520hacker/markdown-AI-editor)
  Supports selecting text for dialogue and clicking the bottom right corner to pop up a chat window.

        var script = document.createElement('script');
        script.src = 'https://twoapi-ui.qiangtu.com/scripts/content.js';
        document.body.appendChild(script);

#### We are committed to providing small and medium-sized enterprises and individuals with:

- A bridge to provide a unified standard open-source ecosystem for domestic AI access, offering forwarding support for existing AI source applications;
- Configurable logs, archiving, filtering, and sensitive word rejection functions to ensure compliance;
- Collection and organization of compliant channels and one-click compliant reporting capabilities;
- Parallel access to multiple sources, so that SMEs no longer hesitate between choosing A or B in the AI era;


#### We provide the following basic functions:

- Multi-channel and multi-brand AI access with mutual conversion between interfaces.
- User, channel, model, and token management functions.
- Model mapping, file upload, token multipliers, AI drawing, and dialogue modification functions.
- Basic page information management functions.
- API-based demos.


### Related Links

- Supported APIs (Online Debugging): https://twoapi.qiangtu.com/fytapiui/index.html
- Supported API Demos (Application Cases): https://twoapi-ui.qiangtu.com/
- Demo project source code: https://github.com/520hacker/two-api/tree/main/vue-sample
- Manager project frontend source code: https://github.com/520hacker/two-api/tree/main/vue-manager

## Road Map

- [x] User System
  - [x] Registration
    - [x] Username registration
  - [x] Login
  - [x] Update Password
  
- [x] Forwarding
  - [x] OPENAI https://openai.com/
  - [x] Baidu Wenxin Qianfan https://cloud.baidu.com/doc/WENXINWORKSHOP/index.html 
  - [x] Alibaba Tongyi Qianwen https://help.aliyun.com/document_detail/2400395.html
  - [x] iFlytek Spark Model https://www.xfyun.cn/doc/spark/Web.html
  - [x] 360 ZhiNao https://ai.360.cn/
  - [x] Zhipu Official ChatGLM https://bigmodel.cn/
  - [x] Baichuan Large Model BaiChuan https://platform.baichuan-ai.com/docs/api
  - [x] IIM.ai https://iim.ai/
  - [x] gptgod https://www.gptgod.site
  
- [x] Basic Interfaces
  - [x] Text Generation Chat
  - [x] Text-to-Speech/Reading Audio
  - [x] Image Recognition gpt-4-vision-preview

- [x] Channels

- [x] Tokens

- [x] Redemption

- [x] Top-up

- [x] Logs

- [x] Compliance
  - [x] Sensitive words
  - [x] Configurable filing information
  - [x] Chat history
  - [x] IP restrictions
  
- [x] Plugins
  - [x] Online Debugging (Debug all open interfaces in the web UI)
  - [x] Model List API (Query all available models for the current key)
  - [x] Gpt4 Mask (Custom personas like Lu Xun, etc.)
  - [x] Web Search (Summarize and answer based on search results)
  - [x] Webpage Summary (Summarize and answer based on scraped webpage content)
  - [x] Upload files to OSS (Support deducting tokens to upload files to OSS and return URL, basic image hosting function)
  
- [x] gptgod Modified Interface Support
  - [x] dalle-3 drawing support
  - [x] mj drawing support and modification
  - [x] gpts support
  - [x] gpt-4-v recognition of uploaded images
  - [x] gpt-4-all dialogue based on uploaded documents

- [x] Other Optimizations
  - [x] Login brute-force defense
  - [x] High-frequency request banning (Default set to 200 requests per minute per endpoint)
  - [x] Automated installation and deployment logic (Upgrade interface address: {manager}/install)
  - [x] Resolved issues where some navigation links were invisible on mobile interfaces
  
- [ ] Enterprise Version Optimization
  - [ ] Support selecting Redis as a replacement for cache 
  - [ ] Agent profit sharing
  - [ ] Agent personalized modifications
  

## TWOAPI Derivative Verification List

- Dialogue: 【[NetWeb UI Test](https://www.8ai.link/)】Strongest models 【[o1-preview](https://twoapi-ui.qiangtu.com/chat/base/13/186)】【[Claude-3.5](https://twoapi-ui.qiangtu.com/chat/base/122/160)】【[ERNIE-Bot-Pro](https://twoapi-ui.qiangtu.com/chat/base/3/35)】【[glm-4-long](https://twoapi-ui.qiangtu.com/chat/base/12/181)】Open Source 【[Two API UI Source Code](https://github.com/520hacker/two-api)】
- Translation: 【[Grammar Optimization](https://twoapi-ui.qiangtu.com/chat/base/1/164)】【[CN-EN Mutual Translation](https://twoapi-ui.qiangtu.com/chat/base/7/164)】
- Copywriting: 【[Dong Yuhui Style](https://twoapi-ui.qiangtu.com/chat/base/118/77/dse9iXvor)】【[Xiaohongshu](https://twoapi-ui.qiangtu.com/chat/base/107/72)】【[Xiaohongshu 2](https://twoapi-ui.qiangtu.com/chat/base/108/11)】
- WeChat: List 【 [Mainstream WeChat BOT Solutions](https://github.com/520hacker/awesome-ai/blob/main/%E5%BE%AE%E4%BF%A1ChatGPT.md) 】Voice Enhancement 【 [Bonus: WeChat Cute Girl Voice](https://odin.mblog.club/%E5%B0%8F%E5%A7%90%E5%A7%90%E8%AF%AD%E9%9F%B3)】
- Voice: 【Section under construction...】
- Thesis: **Thesis Tool** 【[Free Test](https://twoapi-ui.qiangtu.com/article/generator)】Open Source 【[Thesis Tool Source Code](https://github.com/520hacker/lunwenshenqi)】【[Tutorial](https://odin.mblog.club/AI%E9%95%BF%E6%96%87%E7%94%90%E6%88%90%E5%99%A8)】
- Study Aid: 【[Note Quiz](https://note2exam.qiangtu.com/)】Open Source 【[Note Quiz Source Code](https://github.com/520hacker/note2exam)】
- File Reading: 【[Document-based Dialogue](https://twoapi-ui.qiangtu.com/chat/base/113/69)】
- Image Making: 【[Image Recognition](https://twoapi-ui.qiangtu.com/chat/base/112/70)】【[Avatar Generation](https://twoapi-ui.qiangtu.com/chat/base/139/77/Wk77jayA0)】 Open Source 【[Batch Image Generation Source Code](https://github.com/520hacker/mj-chat-autorun)】
- Song Writing: 【[SUNO](https://twoapi-ui.qiangtu.com/chat/base/127/159)】
- PPT Making: 【[GPTS](https://twoapi-ui.qiangtu.com/chat/base/131/77/Gt6Z8pqWF)】
- Video Making: High forwarding cost, unstable: 【[RUNWAY](https://twoapi-ui.qiangtu.com/chat/base/141/180)】【[LUMA](https://twoapi-ui.qiangtu.com/log/video/luma-video)】【[VIDU](https://twoapi-ui.qiangtu.com/chat/base/140/177)】
- Gaming: 【[Pamper Girlfriend](https://twoapi-ui.qiangtu.com/chat/base/120/164) 】【 [Debate Meeting](https://twoapi-ui.qiangtu.com/chat/base/143/164)】
- Cards: 【[Book of Answers](https://twoapi-ui.qiangtu.com/chat/base/142/164)】【[New Interpretation Word Cards](https://twoapi-ui.qiangtu.com/chat/base/144/164)】
- Personas: 【[Zen Master](https://twoapi-ui.qiangtu.com/chat/base/106/139)】【[Grandmother](https://twoapi-ui.qiangtu.com/chat/base/5/138)】【[Half-Immortal](https://twoapi-ui.qiangtu.com/chat/base/135/77/984qxMQkT)】
- Plugin: 【[Yibu](https://yibu.qiangtu.com/)】Open Source 【[ECHO-Yibu](https://github.com/520hacker/markdown-AI-editor/tree/main/source-vue)】 App: 【[Quick Notes](https://suishouji.qiangtu.com/)】
- Programming: Open Source 【[Project-wide Commenting Source Code](https://github.com/520hacker/CodeCommenter)】

### Summary of Open Source Modules on this site:

- Open Source 【[Project-wide Commenting Source Code](https://github.com/520hacker/CodeCommenter)】
- Open Source 【[Two API UI Source Code](https://github.com/520hacker/two-api)】
- Open Source 【[Thesis Tool Source Code](https://github.com/520hacker/lunwenshenqi)】
- Open Source 【[Note Quiz Source Code](https://github.com/520hacker/note2exam)】
- Open Source 【[Batch Image Generation Source Code](https://github.com/520hacker/mj-chat-autorun)】
- Open Source 【[Quick Notes Source Code](https://github.com/520hacker/markdown-AI-editor)】

### Other Open Source Projects

- Open Source 【[Today WordCloud Source Code](https://github.com/520hacker/Today.WordCloud)】
- Open Source 【[AI Stall Poster](https://github.com/520hacker/qrcode_maper)】
- Open Source 【[RSS Square](https://github.com/520hacker/rss-square)】
- Open Source 【[Image Protocol Transfer to OSS](https://github.com/520hacker/img2oss)】


## Domestic AI (China)

| Provider                                    | Main Site MODEL                                                    | Free                                                         | Open Source                                                         |
| ------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| [Baidu](https://aistudio.baidu.com/index)    | [ERNIE-Bot-Pro](https://twoapi-ui.qiangtu.com/chat/base/3/35),[ERNIE-Bot-turbo](https://twoapi-ui.qiangtu.com/chat/base/3/34),[ERNIE-Bot](https://twoapi-ui.qiangtu.com/chat/base/3/33) | [ERNIE-Lite](https://twoapi-ui.qiangtu.com/chat/base/3/147),[ERNIE-Speed](https://twoapi-ui.qiangtu.com/chat/base/3/146),[ERNIE-Tiny](https://twoapi-ui.qiangtu.com/chat/base/3/148) |                                                              |
| [Alibaba](https://bailian.console.aliyun.com/) | [qwen-max](https://twoapi-ui.qiangtu.com/chat/base/115/78),[qwen-2-70b](https://twoapi-ui.qiangtu.com/chat/base/115/114),[qwen-long](https://twoapi-ui.qiangtu.com/chat/base/115/192) |                                                              | [qwen2-72b-instruct](https://www.ollama.com/library/qwen2)   |
| [Tencent](https://hunyuan.tencent.com/)        | [hunyuan](https://twoapi-ui.qiangtu.com/chat/base/134/87)    | [yuanqi](https://twoapi-ui.qiangtu.com/chat/base/5/138),hunyuan-lite |                                                              |
| Moonshot AI                                    | [kimi](https://twoapi-ui.qiangtu.com/chat/base/116/127),[moonshot-v1-128k](https://twoapi-ui.qiangtu.com/chat/base/116/85) |                                                              |                                                              |
| DEEPSEEK                                   | [deepseek-chat](https://twoapi-ui.qiangtu.com/chat/base/130/131),[deepseek-coder](https://twoapi-ui.qiangtu.com/chat/base/130/132) |                                                              | [deepseek-v2.5](https://www.ollama.com/library/deepseek-v2.5) [deepseek-coder-v2](https://www.ollama.com/library/deepseek-coder-v2) |
| Zhipu                                        | [glm-4](https://twoapi-ui.qiangtu.com/chat/base/12/99)       | [GLM-4-Flash](https://twoapi-ui.qiangtu.com/chat/base/12/191) | [glm4-9B](https://www.ollama.com/library/glm4)               |
| iFlytek                                        | [generalv3.5](https://twoapi-ui.qiangtu.com/chat/base/123/108) |                                                              |                                                              |
| Baichuan                                        | Baichuan4,Baichuan3-Turbo,Baichuan3-Turbo-128k               |                                                              | [baichuan2-13b-chat-v1](https://www.ollama.com/maxkb/baichuan2) |
| 360                                         | [360gpt2-pro](https://twoapi-ui.qiangtu.com/chat/base/11/173),[360gpt-turbo](https://twoapi-ui.qiangtu.com/chat/base/11/175),[360GPT_S2_V9.4](https://twoapi-ui.qiangtu.com/chat/base/11/46) |                                                              |                                                              |
| 01.AI                                    | [yi-vl-plus](https://twoapi-ui.qiangtu.com/chat/base/124/122),[yi-34b-chat-200k](https://twoapi-ui.qiangtu.com/chat/base/124/121),yi-large,yi-large-turbo,yi-large-rag,yi-medium | Yi-1.5-6B-Chat,Yi-1.5-9B-Chat-16K                            |                                                              |
| STEP                                        | [step-2-16k](https://twoapi-ui.qiangtu.com/chat/base/128/188) |                                                              |                                                              |
| MINMAX                                      | abab6.5s-245k,abab6.5t-8k,abab6.5g-8k                        |                                                              |                                                              |
| ByteDance                                        |                                                              |                                                              |                                                              |
| Others                                        |                                                              | [wbot-2](https://twoapi-ui.qiangtu.com/chat/base/129/126)    |                                                              |

Price comparison reference: https://www.llmintro.com/

## Development and Upgrade Plan

![image-20231202220513003](https://memosfile.qiangtu.com/picgo/assets/2023/12/02202312_02220513.png)

If you wish to follow development progress or submit modification requests, please scroll to the bottom of the page to join the group and contact us.


## How to Use:

Configure your proxy or API host to your TWO-API deployment address, e.g., https://twoapi.qiangtu.com

- Enter your generated token in the token field.
- You can also click the copy button on the token page to use the token elsewhere.
- Alternatively, you can directly click to open powerful clients like Chat Next Web or AMA.


## Test Address: https://twoapi.qiangtu.com/

The current site is a test site for internal testing purposes only.
This project is dedicated to lowering the threshold for AI use in SMEs and helping them more easily leverage the broad open-source ecosystem and international AI products to boost their development.

- Download Address: https://hub.docker.com/r/odinluo/twoapi
- Open Source Address: https://github.com/520hacker/two-api 
- User Guide: https://twoapi.qiangtu.com/howtouse  

![image-20231202222043297](https://memosfile.qiangtu.com/picgo/assets/2023/12/02202312_02222043.png)


## Planned Integration Targets:

- Baidu (Wenxin Yiyan) https://wenxin.baidu.com
- Douyin (Sparrow/Doubao Model) https://www.doubao.com
- Zhipu AI (GLM Model) https://chatglm.cn
- Chinese Academy of Sciences (Zidong Taichu Model) https://xihe.mindspore.cn
- Baichuan Intelligence (Baichuan Model) https://www.baichuan-ai.com
- SenseTime (Daily New Model) https://www.sensetime.com
- MiniMax (ABAB Model) https://api.minimax.chat
- Shanghai AI Lab (InternLM Model) https://intern-ai.org.cn
- Tencent Hunyuan Model
- Moonshot AI
- Other domestic large models


## Containerized Installation

- You need to install a MySQL database first.
  - Create a `twoapi` database and obtain the database address, username (e.g., `twoapi`), password, and database name (e.g., `twoapi`).
  
- Container Image: `odinluo/twoapi:latest`   
  - (Includes API service and manager frontend)

- Initial Username and Password: `init / k34ugfL5UkHxQ2k`

- Container Initialization Command:

 ```
  docker run -d -p 7001:8080 -e UPGRADE_TOKEN={UPGRADE_TOKEN} \
  -e MYSQL_HOST={MysqlIP} -e MYSQL_USER={username} -e MYSQL_PWD={password} -e \
  MYSQL_DB=twoapi odinluo/twoapi:latest
 ```

  #### Description:

  1. * `docker run` command lets the container run in the background.
  2. * `-d` option makes the container run in detached mode and prevents it from exiting.
  3. * `-p 7001:8080` maps port 7001 of the host to port 8080 of the container.
  4. * `-e UPGRADE_TOKEN={UPGRADE_TOKEN}` sets the UPGRADE_TOKEN environment variable.
  5. * `-e MYSQL_HOST={MysqlIP}` sets the MYSQL_HOST environment variable.
  6. * `-e MYSQL_USER={username}` sets the MYSQL_USER environment variable.
  7. * `-e MYSQL_PWD={password}` sets the MYSQL_PWD environment variable.
  8. * `-e MYSQL_DB=twoapi` sets the MYSQL_DB environment variable.
  9. * `odinluo/twoapi:latest` is the name and tag of the Docker image to be run.

- Map port 7001 or reverse proxy it to port 80 of your specified domain.

- Request `http://{ip}/install` to visit the installation interface of your twoapi.

- Enter your specified `{UPGRADE_TOKEN}` for initialization. Once installation is complete, you can log in and use it.

- Note: If your database is used for a global blacklist, please add your request address to the whitelist;
  Typical error: "Access denied for user 'twoapi'@'172.17.0.3' (using password: YES)"
  Whitelist add command:
  `mysql -h {MysqlIP} -P 3306 -u {username} -p {password}`
  `GRANT ALL PRIVILEGES ON *.* TO '{username}'@'' IDENTIFIED BY '{password}';`


### Container Update Commands

```
# Pull updates
sudo docker pull odinluo/twoapi:latest
# List containers to get container ID/tag
sudo docker ps -a
# Stop container
sudo docker stop {your_container_name_or_tag}
# Remove container
sudo docker rm {your_container_name_or_tag}
# Re-run the docker run command used during installation
```


#### Port and Environment Variable Description

```
   ports:
      - 7001:8080
   environment:
      - UPGRADE_TOKEN=The password used in the install interface
      - MYSQL_HOST=Your MYSQL server address/ip
      - MYSQL_USER=Your MYSQL username
      - MYSQL_PWD=Your MYSQL password
      - MYSQL_DB=Your MYSQL database name
```


### Deploying Demo Site 

- Please refer to the tutorial: https://github.com/520hacker/two-api/tree/main/vue-sample


## Beta User Recruitment

- We are recruiting beta users. Whether you are a company or an individual, we will provide all possible support and service to complete our product and polish our service. All of this is free.
- See below for contact information.


## Contact Us

http://qr61.cn/oRUvxf/qyT8mJT
