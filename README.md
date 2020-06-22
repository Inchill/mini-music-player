# musicplayer
用微信小程序技术开发的音乐播放器

## 展示
![avatar](https://github.com/Inchill/musicplayer/blob/master/images/show/recommend.png)
![avatar](https://github.com/Inchill/musicplayer/blob/master/images/show/player.png)
![avatar](https://github.com/Inchill/musicplayer/blob/master/images/show/playlist.png)

## 前言
自己最近在学习小程序开发，因此“依葫芦画瓢“，弄了这一个项目出来。当理论和实践一起进行时，个人的成长才是既有质量又有速度的。

## 界面
本项目分为3个界面，分为首页推荐、播放器和播放列表。以前我没有做过仿音乐播放器的项目，主要是潜意识觉得音频API不好弄。这次我采用的是GitHub一个API服务器。这个项目的工作原理是跨站请求伪造 (CSRF), 伪造请求头 , 调用官方 API，并且是用Node搭建的，只要你本地有node环境，拉取下来安装依赖包后就可以直接使用。这里我贴一下GitHub地址：[网易云音乐 Node.js API service](https://github.com/Binaryify/NeteaseCloudMusicApi).