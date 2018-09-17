import * as types from '../mutation-types'

const state = {
	loading: false,
	appId:'',
	openId:'',
	userId:'',
	userType:'',
	userInfo:'',
}
const getters = {
	loading: state => state.loading
}

const mutations = {
	[types.SHOW_LOADING] (state, payload) {
		state.loading = payload.status
	},
	[types.HIDE_LOADING] (state, payload) {
		state.loading = payload.status
	},
	addUserInfo(state,obj){
		state.appId = obj.appId,
		state.openId = obj.openId,
		state.userId = obj.userId
	},
	addUserBaseInfo(state,obj){
		state.userInfo = obj.userInfo,
		state.userType = obj.userType
	},
}


const actions = {
	showLoading({commit,state}){
		commit({
			type: types.SHOW_LOADING, 
			status: true
		})
	},
	hideLoading({commit,state}){
		commit({
			type: types.HIDE_LOADING, 
			status: false
		})
	}
}


export default {
	state,
	getters,
	mutations,
	actions
}