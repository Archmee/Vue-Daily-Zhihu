import Vue from 'vue';
import Vuex from 'vuex';

import localStore from './api/store';

Vue.use(Vuex);

const FAVO_LIST = 'favo_list';
const TODO_LIST = 'todo_list';

const state = {
    titleList: {
        '/': '知乎日报',
        '/todo': '离线清单',
        '/myfavo': '我的收藏',
    },
    headerConfig: { //顶部工具栏icon配置
        showMenu: false,
        showBack: false,
        showTitle: false,
        showSearch: false,
        showFavo: false,
        showTodo: false,
        showPlay: false,
    },
    showMenu: false, //是否显示菜单
    showToast: false,
    isLoading: true,
    toastText: '加载失败',
    currentId: '',
    article: {},
    isFavo: false,
    isTodo: false,
    favoList: localStore.data(FAVO_LIST) || [],
    todoList: localStore.data(TODO_LIST) || [],
};

const getters = {
    // 下面4个getter引入了4个状态是为了更新状态时引起getter更新，否则getter会返回缓存
    isFavo(state) {
        var list = state.favoList;
        if (list.indexOf(state.currentId) < 0) {
            state.isFavo = false;
        } else {
            state.isFavo = true;
        }

        return state.isFavo;
    },
    isTodo(state) {
        var list = state.todoList;
        if (list.indexOf(state.currentId) < 0) {
            state.isTodo = false;
        } else {
            state.isTodo = true;
        }

        return state.isTodo;
    },
    getFavoList(state) {
        var list = state.favoList,
            data = [],
            index = 0;
        for (var i = list.length - 1; i >= 0; i--) {
            data[index++] = localStore.data(FAVO_LIST + '_' + list[i]);
        }

        return data;
    },
    getTodoList(state) {
        var list = state.todoList,
            data = [],
            index = 0;
        for (var i = list.length - 1; i >= 0; i--) {
            data[index++] = localStore.data(TODO_LIST + '_' + list[i]);
        }
        return data;
    }
};

const mutations = {
    TOGGLE_SHOW_MENU(state) {
        state.showMenu = !state.showMenu;
    },
    HIDE_MENU(state) {
        state.showMenu = false;
    },
    SHOW_LOADING(state) {
        state.isLoading = true;
    },
    HIDE_LOADING(state) {
        state.isLoading = false;
    },
    SHOW_TOAST(state, text) {
        state.showToast = false;
        state.showToast = true;
        state.toastText = text;
    },
    HIDE_TOAST(state) {
        state.showToast = false;
        state.toastText = '';
    },
    CONFIG_HEADER(state, config) {
        if (!Array.isArray(config)) {
            return ;
        }
        var item;
        // reset
        for (item in state.headerConfig) {
            state.headerConfig[item] = false;
        }
        // set new value
        for (item in config) {
            if (state.headerConfig.hasOwnProperty(config[item])) {
                state.headerConfig[config[item]] = true;
            }
        }
    },
    TOGGLE_FAVO(state) { //触发喜欢与否

        var list = state.favoList;
        var id = state.currentId;

        const FAVO_LIST_ID = FAVO_LIST + '_' + id;

        var index = list.indexOf(id);
        if (index < 0) { //没找到就说明列表中还未添加过
            var article = state.article;

            if (!article) { // 如果文章不存在，就提示错误
                state.showToast = true;
                state.toastText = '标记错误';
                return;
            }
            state.showToast = false;

            // 插入到列表中
            list.push(id);

            var data = {
                id: article.id,
                title: article.title,
                images: article.images,
                addTime: Date.now(),
            };

            // 存入localStorage
            localStore.data(FAVO_LIST_ID, data);

            state.isFavo = true; //更新标记状态

        } else { // 否则从localStorage移出该项数据
            list.splice(index, 1);
            localStore.remove(FAVO_LIST_ID);
            state.isFavo = false; //更新标记状态
        }

        // 不管如何操作都要重新存储数据
        localStore.data(FAVO_LIST, list);
    },
    TOGGLE_TODO(state) { //触发todo标记

        var list = state.todoList;
        var id = state.currentId;

        const TODO_LIST_ID = TODO_LIST + '_' + id;

        var index = list.indexOf(id);
        if (index < 0) { //没找到就说明列表中还未添加过
            var article = state.article;

            if (!article) { // 如果文章不存在，就提示错误
                state.showToast = true;
                state.toastText = '标记错误';
                return;
            }
            state.showToast = false;

            // 插入到列表中
            list.push(id);

            var data = {
                id: article.id,
                title: article.title,
                image: article.image,
                image_source: article.image_source,
                images: article.images,
                body: article.body,
                addTime: Date.now(),
            };

            // 存入localStorage
            localStore.data(TODO_LIST_ID, data);

            state.isTodo = true; //更新标记状态

        } else { // 否则从localStorage移出该项数据
            list.splice(index, 1);
            localStore.remove(TODO_LIST_ID);
            state.isTodo = false; //更新标记状态
        }

        // 不管如何操作都要重新存储数据
        localStore.data(TODO_LIST, list);
    }
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
});

export { TODO_LIST }; //将key导出到article