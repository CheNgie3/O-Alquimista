# Docker + Jenkins 实现自动化打包部署

> 5.28-6.2 学习docker，利用docker与jenkins实现代码自动打包部署的功能
>
> ①利用 git push钩子，当有代码push到gitlab时，jenkins自动部署。
>
> ②学习jenkins pipeline语法，编写流水线脚本
>
> ③学习docker命令，编写dockerfile创造镜像容器，利用镜像缓存、分阶段构建减少镜像构建时间和镜像大小。

# 1、docker安装

> Docker 是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的容器中，该容器包含了应用程序的代码、运行环境、依赖库、配置文件等必需的资源，通过容器就可以实现方便快速并且与平台解耦的自动化部署方式，无论你部署时的环境如何，容器中的应用程序都会运行在同一种环境下。

1、[Windows安装](https://docs.docker.com/docker-for-windows/install/)  暂时在本地电脑上安装，学习docker命令。

问题一：

![image-20210531105329522](C:\Users\hspcadmin\AppData\Roaming\Typora\typora-user-images\image-20210531105329522.png)

```
net localgroup docker-users username /add
或者Add-LocalGroupMember -Group "docker-users" -Member "username "`
```

然后重启

问题二：

docker pull failed

设置源镜像

{
  "experimental": false,
  "features": {
    "buildkit": true
  },
  "registry-mirrors": [
    "[https://h3j9xv2v.mirror.aliyuncs.com](https://h3j9xv2v.mirror.aliyuncs.com/)"
  ]
}

2、服务器安装

```
yum install docker-ce
```



# 2、构建应用镜像

参考：[Docker 部署 vue 项目](https://juejin.cn/post/6844903837774397447#heading-10)

[如何使用 docker 部署前端应用](https://juejin.cn/post/6844903793348329486#heading-1)

[Docker——从入门到实践](https://yeasy.gitbook.io/docker_practice/)

## 创建 nginx config配置文件

在项目根目录下创建`nginx`文件夹，该文件夹下新建文件`default.conf`

```
server {
    listen       80;
    server_name  localhost;

    #charset koi8-r;
    access_log  /var/log/nginx/host.access.log  main;
    error_log  /var/log/nginx/error.log  error;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```

该配置文件定义了首页的指向为 `/usr/share/nginx/html/index.html`，所以我们可以一会把构建出来的index.html文件和相关的静态资源放到`/usr/share/nginx/html`目录下。

## 在应用项目下创建dockerfile文件

``````js
FROM node:alpine as builder 
ENV NODE_ENV production    

WORKDIR /code
ADD package.json /code
RUN npm install --registry=https://registry.npm.taobao.org  --production 
ADD . /code
RUN npm run build

FROM nginx
COPY --from=builder /code/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /code/build/ /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]    
``````

- 自定义构建镜像的时候基于Dockerfile来构建。

- dockerfile指令

  ```
  FROM：基础镜像，当前新镜像是基于哪个镜像的
  MAINTAINER：镜像维护者的姓名和邮箱地址
  RUN：容器构建时需要运行的命令
  EXPOSE：当前容器对外暴露出的端口
  WORKDIR：指定在创建容器后，终端默认登陆的进来工作目录，一个落脚点
  ENV：用来在构建镜像过程中设置环境变量
  ADD：将宿主机目录下的文件拷贝进镜像且 ADD 命令会自动处理 URL 和解压 tar 压缩包
  COPY：类似 ADD，拷贝文件和目录到镜像中。（COPY src dest 或 COPY ["src","dest"]）
  VOLUME：容器数据卷，用于数据保存和持久化工作
  CMD：指定一个容器启动时要运行的命令，Dockerfile 中可以有多个 CMD 指令，但只有最后一个生效，CMD 会被 docker run 之后的参数替换
  ENTRYPOINT：指定一个容器启动时要运行的命令，ENTRYPOINT 的目的和 CMD 一样，都是在指定容器启动程序及参数
  ONBUILD：当构建一个被继承的 Dockerfile 时运行命令，父镜像在被子继承后父镜像的 onbuild 被触发
  ```

## 基于该Dockerfile构建应用镜像

``````
docker build -t documentcontainer .
``````

> `-t` 是给镜像命名 `.` 是基于当前目录的Dockerfile来构建镜像

查看本地镜像，运行命令

```
docker image ls | grep documentcontainer
```

![docker grep image vuenginxcontainer](https://user-gold-cdn.xitu.io/2019/5/5/16a85d541a2c7f1a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

到此时我们的应用镜像 documentcontainer已经成功创建。接下来，我们基于该镜像启动一个`docker`容器。

## 基于镜像启动容器

```
docker run \
-p 3000:80 \
-d --name documentApp \
documentcontainer
```

> - `docker run` 基于镜像启动一个容器
> - `-p 3000:80` 端口映射，将宿主的3000端口映射到容器的80端口
> - `-d` 后台方式运行
> - `--name` 容器名 查看 docker 进程

```
docker ps
```

![vueApp container](https://user-gold-cdn.xitu.io/2019/5/5/16a85d542b7c40fe?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

可以发现名为 documentApp的容器已经运行起来。



# 3、使用docker安装Jenkins

略

# 4、新建一个流水线项目

![img](https://upload-images.jianshu.io/upload_images/1194677-98dd0d4fd42a2bce?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)



## 利用 git push钩子

当有代码push到gitlab时，jenkins自动部署。

![172.27.24.217_8080_job_document-docker_configure](C:\Users\hspcadmin\Desktop\172.27.24.217_8080_job_document-docker_configure.png)

![image-20210603102951320](C:\Users\hspcadmin\AppData\Roaming\Typora\typora-user-images\image-20210603102951320.png)

## 编写流水线脚本

为了做到pipeline的版本化，我们让Jenkins从Git仓库拉取pipeline并执行

![image-20210603103129731](C:\Users\hspcadmin\AppData\Roaming\Typora\typora-user-images\image-20210603103129731.png)

> 这里使用SSH的 clone方式拉取代码，需要把Git私钥放在Jenkins上。

在项目下创建Jenkinsfile文件

Jenkins pipeline支持两种语法: 

**脚本式语法**

```
import java.text.SimpleDateFormat
node {
    try{
        def dockerName='documentcontainer'      
        def dateFormat = new SimpleDateFormat("yyyyMMddHHmm")
        def dockerTag = dateFormat.format(new Date())

        stage('Docker build') {
            sh 'pwd'
            sh 'ls'
            def imageUrl = "${dockerName}:${dockerTag}"
            def customImage = docker.build(imageUrl)
            sh "docker rm -f ${dockerName} | true"
            customImage.run("-it -p 8900:80 --name ${dockerName}")
            //only retain last 3 images
            sh """docker rmi \$(docker images | grep ${dockerName} | sed -n  '4,\$p' | awk '{print \$3}') || true"""
        }
        currentBuild.result="SUCCESS"
    }catch (e) {
        currentBuild.result="FAILURE"
        throw e
    }
}
```

**声明式语法**

```
import java.text.SimpleDateFormat
def dateFormat = new SimpleDateFormat("yyyyMMddHHmm")
def dockerTag = dateFormat.format(new Date())
pipeline {
    agent any
    environment {
        dockerName='documentcontainer'
    }
    stages { 
        stage('Docker build') {
            steps {
                sh 'pwd'
                sh 'ls'
                sh "docker stop ${dockerName}"
                sh "docker rm -f ${dockerName} | true"
                sh "docker build -t  ${dockerName}:${dockerTag} ."
                sh "docker run -it -p 8901:80 -d --name ${dockerName} ${dockerName}:${dockerTag}"
                //only retain last 3 images
                sh """docker rmi \$(docker images | grep ${dockerName} | sed -n  '4,\$p' | awk '{print \$3}') --force || true"""
            }
        }
    }
    post{
        success{
            echo "========pipeline executed successfully ========"
        }
        failure{
            echo "========pipeline execution failed========"
        }
    }
}
```

 我们在Jenkinsfile里构建docker镜像、运行容器，构建镜像基于项目下的Dockerfile，实现在docker中打包项目的功能，然后把打包好的build文件夹放到nginx下运行。

![image-20210603105729755](C:\Users\hspcadmin\AppData\Roaming\Typora\typora-user-images\image-20210603105729755.png)

至此，我们已利用docker与jenkins实现代码自动打包部署的功能，终于不用每次手动build再push到代码仓库然后利用jenkins拉取代码部署了！！