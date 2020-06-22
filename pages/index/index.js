Page({
  data: {
    item: 0,
    tab: 0,
    playlist: [
      {
        id: 1,
        title: 'shots',
        singer: 'imagine dragons',
        src: '',
        coverImgUrl: '/images/cover/shots.jpg'
      },
      {
        id: 2,
        title: '稻香',
        singer: '周杰伦',
        src: '',
        coverImgUrl: '/images/cover/稻香.jpg'
      },
      {
        id: 3,
        title: '夏天的风',
        singer: '元卫觉醒',
        src: '',
        coverImgUrl: '/images/cover/夏天的风.jpg'
      },
      {
        id: 4,
        title: '平凡之路',
        singer: '朴树',
        src: '',
        coverImgUrl: '/images/cover/平凡之路.jpg'
      }
    ],
    state: 'paused',
    playIndex: 0,
    play: {
      currentTime: '00:00',
      duration: '00:00',
      percent: 0,
      title: '',
      singer: '',
      coverImgUrl: '/images/cover/shots.jpg'
    }
  },
  audioCtx: null,
  onLoad: function() {
    // 获取歌单
    wx.request({
      url: 'http://localhost:3000/song/url?id=31789010',
      success: res => {
        this.data.playlist.forEach((item, index) => {
          var src = 'playlist[' + index + '].src'
          this.setData({
            [src]: res.data.data[0].url
          })
        })
      }
    })
  },
  onReady: function() {
    this.audioCtx = wx.createInnerAudioContext()
    // 播放器失败检测
    this.audioCtx.onError(() => {
      // 音频地址为空就播放失败
      console.log('播放失败：' + this.audioCtx.src)
    })
    // 播放完成自动换下一曲
    this.audioCtx.onEnded(() => {
      this.next()
    })
    // 自动更新播放进度
    this.audioCtx.onPlay(() => {

    })
    this.audioCtx.onTimeUpdate(() => {
      this.setData({
        'play.duration': formatTime(this.audioCtx.duration),
        'play.currentTime': formatTime(this.audioCtx.currentTime),
        'play.percent': this.audioCtx.currentTime / this.audioCtx.duration * 100
      })
    })
    // 默认选择第一曲
    this.setMusic(0)
    // 格式化时间
    function formatTime(time) {
      var minute = Math.floor(time / 60) % 60;
      var second = Math.floor(time) % 60;
      return (minute < 10 ? '0' + minute : minute) + ':' + (second < 10 ? '0' + second : second)
    }
  },
  setMusic: function(index) {
    var music = this.data.playlist[index]
    this.audioCtx.src = music.src
    this.setData({
      playIndex: index,
      'play.title': music.title,
      'play.singer': music.singer,
      'play.coverImgUrl': music.coverImgUrl,
      'play.currentTime': '00:00',
      'play.duration': '00:00',
      'play.percent': 0
    })
  },
  // 点击tab切换
  changeItem: function(e) {
    this.setData({
      item: e.target.dataset.item
    })
  },
  // 滑动swiper-item切换
  changeTab: function(e) {
    this.setData({
      tab: e.detail.current
    })
  },
  // 播放
  play: function() {
    this.audioCtx.play()
    this.setData({
      state: 'running'
    })
  },
  // 暂停
  pause: function() {
    this.audioCtx.pause()
    this.setData({
      state: 'paused'
    })
  },
  // 下一曲
  next: function() {
    var index = this.data.playIndex >= this.data.playlist.length - 1 ? 0 : this.data.playIndex + 1
    this.setMusic(index)
    if (this.data.state === 'running') this.play()
  },
  // 更改播放进度条
  sliderChange: function(e) {
    var second = e.detail.value * this.audioCtx.duration / 100
    this.audioCtx.seek(second)
  },
  // 切换到播放列表
  changePage: function(e) {
    this.setData({
      tab: 2,
      item: e.target.dataset.page
    })
  },
  // playlist换曲
  change: function(e) {
    this.setMusic(e.currentTarget.dataset.index)
    this.play()
  }
})