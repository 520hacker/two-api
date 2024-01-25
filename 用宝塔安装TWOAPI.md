# 用宝塔安装TWOAPI

请确保您已经有了mysql，本说明基于你已经有了mysql安装的前台进行介绍，如果没有mysql，请安装一个，并准备好对应的账号和密码。

1. docker ->  项目模板 -> 添加

   ![image.png](https://2504-static.qiangtu.com/upload/2024/01/20240125061036.png)

2. 拉取镜像
   ![image-20240125141640383](https://memosfile.qiangtu.com/picgo/assets/2024/01/25202401_25141640.png)

3. 拉取成功之后点 项目
   ![image-20240125141718779](https://memosfile.qiangtu.com/picgo/assets/2024/01/25202401_25141718.png)

4. 点添加；添加一个项目
   ![image-20240125141741225](https://memosfile.qiangtu.com/picgo/assets/2024/01/25202401_25141741.png)

5. 点添加之后会自动创建容器，注意找到容器的ip地址
   ![image-20240125141810086](https://memosfile.qiangtu.com/picgo/assets/2024/01/25202401_25141810.png)

6. 把容器的ip地址添加到数据后的权限里

   ![image-20240125141901958](https://memosfile.qiangtu.com/picgo/assets/2024/01/25202401_25141901.png)
   ![image-20240125141933981](https://memosfile.qiangtu.com/picgo/assets/2024/01/25202401_25141934.png)

7. 现在进入前台网站 http://{安装的ip}:7001/install
   ![image-20240125142005736](https://memosfile.qiangtu.com/picgo/assets/2024/01/25202401_25142005.png)

8. 填写你设置的token 进入数据库升级界面，并点更新系统

   ![image-20240125142127580](https://memosfile.qiangtu.com/picgo/assets/2024/01/25202401_25142127.png)

9. 系统更新成功，是用默认账号 init / k34ugfL5UkHxQ2k 登录系统
   ![image-20240125142211609](https://memosfile.qiangtu.com/picgo/assets/2024/01/25202401_25142211.png)

10. 在个人信息页面修改密码
    ![image-20240125142447643](https://memosfile.qiangtu.com/picgo/assets/2024/01/25202401_25142447.png)





## 更新版本

1. docker , 项目模板，拉取镜像
2. docker , 项目， 删除项目 twoapi
3. docker, 容器， 删除 twoapi 容器 
4. docker , 项目，参考以上第4点；添加一个项目
   ![image-20240125141741225](https://memosfile.qiangtu.com/picgo/assets/2024/01/25202401_25141741.png)
5. 更新完成

