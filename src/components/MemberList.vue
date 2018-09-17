<style lang="scss">
  .member-list {
    .member {
      position: relative;
      overflow: hidden;
      padding: 0.6rem 0rem;
      position: relative;
      &:active {
        background-color: #f6f6f6;
      }
      .member-avatar {
        float: left;
        .member-avatar-img {
          width: 5.5rem !important;
          height: 5.5rem !important;
          margin-left: 0.4rem;
          margin-right: 1.5rem;
          border-radius: 50%;
        }
      }
      .member-desc {
        display: -webkit-flex;
        display: flex;
        overflow: hidden;
        flex-direction: column;
        float: left;
        span {
          overflow: hidden;
          text-overflow: ellipsis;
          margin-top: .2rem;
        }
        .name {
          font-size: 1.4rem !important;
        }
        .group, .id {
          color: #888;
          font-size: 1.2rem !important;
        }
        .score {
          position: absolute;
          top: 30%;
          right: 1rem;
          z-index: 1;
          font-size: 1.6rem;
          font-weight: bold;
          color: #e53935;
        }
      }
      .member-action {
        float: right;
        color: #fff;
        padding: 1.9rem 1rem;
        background-color: #f00;
      }
    }
  }

</style>

<template>
  <ul class="member-list">
    <li class="member" v-for="(item,index) in memberList" @click="handleClick(item)">
      <div class="member-avatar">
        <img :src="item.headUrl" class="member-avatar-img" alt="">
      </div>
      <div class="member-desc">
        <span class="name">{{item.userName}}</span>
        <span class="group">{{item.groupName}}</span>
        <span class="id">{{item.loginName}}</span>
        <span v-if="showScore"
              class="score">{{userScoreOperate.operateType | judgeType}}{{userScoreOperate.score}}</span>
      </div>
      <div class="member-action" v-if="showDelete" @click="handleDelete(item)">
        <span>删除</span>
      </div>
    </li>
  </ul>
</template>

<script>
  export default {
    name: "MemberList",
    components: {},
    props: {
      memberList: {},
      userScoreOperate: {},
      showScore: {
        default: true
      },
      showDelete: {
        default: false
      }
    },
    data() {
      return {}
    },
    computed: {},
    filters: {
      judgeType(value) {
        switch (value) {
          case 1:
            return "加分："
          case 2:
            return "减分："
        }
      }
    },
    methods: {
      handleClick(item) {
        this.$emit('on-handle-click', item)
      },
      handleDelete(item) {
        this.$emit('on-handle-delete', item)
      }
    }
  }
</script>

