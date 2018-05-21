const dateFilter = require( '../utils/util.js')
Page({
    data: {
        newsType: [{
                id:'gn',
                name: '国内'
            },{
                id:'gj',
                name: '国际'
            },{
                id:'cj',
                name: '财经'
            },{
                id:'yl',
                name: '娱乐'
            },{
                id:'js',
                name: '军事'
            },{
                id: 'ty',
                name: '体育'
            }, {
                id: 'other',
                name: '其他'
            }], //新闻类型
        newsData: [],
        currentTab: 0,
        defaultImage: '../../images/default.png', //默认图片
    },
    onLoad() {
        wx.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: '#349fe1'
        })
        this.getNewsCategories(this.data.newsType[this.data.currentTab].id)
    },
    onPullDownRefresh() {
        this.getNewsCategories(this.data.newsType[this.data.currentTab].id, () => {
            wx.stopPullDownRefresh()
        })
    },
    getNewsCategories(type, callback) {
        wx.request({
            url: 'https://test-miniprogram.com/api/news/list',
            data: {
                type: type
            },
            success: res => {
                let result = res.data.result;
                result.map(i => {
                  i.date = dateFilter.formatTime(i.date)
                })
                this.setData({
                    newsData: result
                })            
            },
            complete: () => {
                callback && callback()
            }
        })
    },
    clickTap(e) {
      if (this.data.currentTab === e.currentTarget.dataset.current){
            return false;
        }else {
            this.setData({
              currentTab: e.currentTarget.dataset.current
            })
            this.getNewsCategories(e.currentTarget.dataset.id)
        }
    },
    onTapNews(e) {
        wx.navigateTo({
          url: '/pages/detail/detail?id=' + e.currentTarget.dataset.id
        })
    }
})