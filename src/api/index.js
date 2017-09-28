import axios from 'axios'

// 取消请求的token，在发送请求时用 https://github.com/mzabriskie/axios#cancellation
// 尝试后才发现，可能要针对每个请求单独生成token
var CancelToken = axios.CancelToken;
var CancelSource = CancelToken.source();
var paramObj = { cancelToken: CancelSource.token };

// api参数配置
var config = {
    site: 'zhihu-agent.herokuapp.com',
    method: '/get?api='
}
const API_ROOT = 'https://'.concat( config.site, config.method )

var apiZhihu = {
    startimage: '/4/start-image/1080*1776',
    news: '/4/news/latest',
    newsbyid: '/4/news/',
    newsbydate: '/4/news/before/',
    topics: '/4/themes',
    topicbyid: '/4/theme/',
    sections: '/3/sections',
    sectionbyid: '/3/section',
}
const NewsResource = API_ROOT.concat( apiZhihu.news )
const NewsIdResource = API_ROOT.concat( apiZhihu.newsbyid )
const NewsDateResource = API_ROOT.concat( apiZhihu.newsbydate )
const TopicsResource = API_ROOT.concat( apiZhihu.topics )
const TopicsIdResource = API_ROOT.concat( apiZhihu.topicbyid )
const SectionsResource = API_ROOT.concat( apiZhihu.sections )
const SectionIdResource = API_ROOT.concat( apiZhihu.sectionbyid )

export default {
    //取消请求api
    cancel(msg) {
        CancelSource.cancel(msg || '发出取消请求');
    },
    getNews() {
        return axios.get( NewsResource, paramObj )
    },
    getNewsById( id ) {
        return axios.get( NewsIdResource + id, paramObj )
    },
    getNewsByDate( date ) {
        return axios.get( NewsDateResource + date, paramObj )
    },
    getTopics() {
        return axios.get( TopicsResource, paramObj )
    },
    getTopicsById( topicid ) {
        return axios.get( TopicsIdResource + topicid, paramObj )
    },
    getSections() {
        return axios.get( SectionsResource, paramObj )
    },
    getSectionsById( sectionid ) {
        return axios.get( SectionIdResource, {
            params: {
                sectionid: sectionid
            },
            ...paramObj
        } )
    },
};