const dateFilter = require('../utils/util.js')
Page({
    data: {        
        id: '',
        newsDetail: {},
        newscontent: []
    },
    onLoad(options) {
        this.setData({
            id: options.id
        })
        this.getNewsDetail(this.data.id)
    },
    onPullDownRefresh() {
        this.getNewsDetail(this.data.id, () => {
            wx.stopPullDownRefresh()
        })
    },
    getNewsDetail(id, callback) {
        wx.request({
            url: 'https://test-miniprogram.com/api/news/detail',
            data: {
                id: id
            },
            success: res => {
                let result = res.data.result;
                result.date = dateFilter.formatTime(result.date)
                this.setData({
                    newsDetail: result
                })           
            },
            complete: () => {
                callback && callback()
            }
        })
    }
})