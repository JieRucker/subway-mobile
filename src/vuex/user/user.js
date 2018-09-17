import * as types from '../mutation-types'

const state = {
  searchType: 0, // 加减分搜索类型0：积分员工号搜索，1：积分扫码搜索,2：首页搜索
  searchKey: 0, // 加减分搜索内容
  scanUserId: '', // 扫码获取用户id
  operateDesc: '',// 事项原由详细描述
  userList: [], // 员工编号数组
  imageList: [],// 图片列表
  uploadId: null,// 上传文件Id
  uploader: null// 上传对象
};

const getters = {
  getSearchType: state => state.searchType,
  getSearchKey: state => state.searchKey,
  getScanUserId: state => state.scanUserId,
  getOperateDesc: state => state.operateDesc,
  getUserList: state => state.userList,
  getImageList: state => state.imageList,
  getUploadId: state => state.uploadId,
  getUploader: state => state.uploader,
};

const actions = {
  setSearchType({commit}, info) {
    commit(types.SET_SEARCH_TYPE, info)
  },
  setSearchKey({commit}, info) {
    commit(types.SET_SEARCH_KEY, info)
  },
  setScanUserId({commit}, info) {
    commit(types.SET_SCAN_USER_ID, info)
  },
  setOperateDesc({commit}, info) {
    commit(types.SET_OPERATE_DESC, info)
  },
  setUserList({commit}, info) {
    commit(types.SET_USER_LIST, info)
  },
  setImageList({commit}, info) {
    commit(types.SET_IMAGE_LIST, info)
  },
  setUploadId({commit}, info) {
    commit(types.SET_UPLOAD_ID, info)
  },
  setUploader({commit}, info) {
    commit(types.SET_UPLOADER, info)
  },
  setOperateInfo({commit}, info) {
    commit(types.SET_OPERATE_INFO, info)
  }
};

const mutations = {
  [types.SET_SEARCH_TYPE](state, search) {
    state.searchType = search;
  },
  [types.SET_SEARCH_KEY](state, search) {
    state.searchKey = search;
  },
  [types.SET_SCAN_USER_ID](state, scanUserId) {
    state.scanUserId = scanUserId;
  },
  [types.SET_OPERATE_DESC](state, operateDesc) {
    state.operateDesc = operateDesc;
  },
  [types.SET_USER_LIST](state, user) {
    state.userList.push(user)
  },
  [types.SET_IMAGE_LIST](state, image) {
    if(Object.prototype.toString.call(image) !== '[object Array]'){
      state.imageList.push(image)
    }else{
      state.imageList = [];
    }
  },
  [types.SET_UPLOAD_ID](state, uploadId) {
    state.uploadId = uploadId;
  },
  [types.SET_UPLOADER](state, uploader) {
    state.uploader = uploader;
  },
  [types.SET_OPERATE_INFO](state, operateInfo) {
    state.operateDesc = operateInfo['operateDesc'];
    state.userList = operateInfo['userList'];
    state.imageList = operateInfo['imageList'];
    state.uploadId = operateInfo['uploadId'];
    state.uploader = operateInfo['uploader'];
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
