<style lang="scss">
  .add-staff {
    .avatar {
      &__center {
        text-align: center;
        padding-top: 30px;
        color: #fff;
        font-size: 18px;
        &--img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 4px solid #ececec;
          display: inline-block;
          color: #999;
          line-height: 86px;
        }
      }
    }
    .div, .btn-change {
      margin-top: 2.5rem;
    }
    .btn-confirm {
      width: 80%;
      margin-top: 2rem;
      margin-bottom: 2rem;
    }
  }

  input {
    outline: none;
  }
</style>

<template>
  <div class="add-staff clearfix">
    <x-header :left-options="{backText: ''}" title="添加员工"
              style="background:linear-gradient(to right,#447bba,#7a88bd,#928dba);"></x-header>
    <blur :blur-amount=40 url="" style="height: 150px">
      <div class="avatar__center" style="padding-top: 39px;">
        <wx-uploader ref="wxUploader" :max-num-limit="1">
          <div slot="content">
            <img v-if="getImageList.length && getImageList[0].imageUrl !== ''" :src="getImageList[0].imageUrl"
                 class="avatar__center--img"
                 @click="chooseImage">
          </div>
        </wx-uploader>
        <span v-if="!getImageList.length" class="avatar__center--img" @click="chooseImage">选择头像</span>
      </div>
    </blur>
    <group label-width="4.5em" label-margin-right="2em" label-align="right">
      <x-input title="姓名" name="username" placeholder="请输入姓名" is-type="china-name"
               v-model="initial.userName"></x-input>
      <x-input title="邮箱" name="email" ref="email" placeholder="请输入邮箱地址" is-type="email"
               v-model="initial.email"></x-input>

      <selector v-if="sexList" title="性别" :options="sexList" v-model="initial.sex"></selector>
      <selector v-if="groupList" title="工种" placeholder="请选择工种" :options="groupList"
                v-model="initial.groupId"
                @on-change="changeGroup"></selector>

      <x-input title="积分" type="text" placeholder="" v-model="initial.score"></x-input>

      <selector v-if="userTypeList" title="员工类型" :options="userTypeList" v-model="initial.userType"></selector>

      <x-input title="员工工号" type="text" placeholder="只有普通员工有工号" v-model="initial.loginName"></x-input>

      <x-address title="地址选择" v-model="addressValue" raw-value :list="addressData" placeholder="请选择地址" ref="address"
                 @on-show="onAddressShow" @on-shadow-change="onAddressChange" value-text-align="left"
                 :hide-district="true" label-align="justify"></x-address>

      <x-input title="手机号码" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"
               v-model="initial.phoneNum"></x-input>
      <datetime title="出生年月" v-model="initial.birthday" :start-date="startDate" placeholder="请选择出生年月"
                value-text-align="left"></datetime>
      <x-input title="身份证号" type="text" placeholder="请输入身份证号" v-model="initial.cardNO"></x-input>
      <datetime title="进场时间" v-model="initial.joinTime" placeholder="请选择进场时间" value-text-align="left"></datetime>
    </group>
    <x-button type="primary" class="btn-confirm" @click.native="submitForm">确定</x-button>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import wxUploader from '@/components/wxUploader/wxUploader.vue';

  import {
    XAddress,
    Selector,
    PopupRadio,
    Datetime,
    PopupPicker,
    XHeader,
    XButton,
    XInput,
    Group,
    Blur,
    Actionsheet,
    ChinaAddressV4Data
  } from 'vux'

  export default {
    name: "AddStaff",
    components: {
      wxUploader,
      XAddress,
      Selector,
      PopupRadio,
      Datetime,
      PopupPicker,
      XHeader,
      XButton,
      XInput,
      Group,
      Blur,
      Actionsheet,
      ChinaAddressV4Data
    },
    computed: {
      ...mapGetters([
        'getImageList'
      ])
    },
    data() {
      return {
        initial: new Object({}),
        groupList: [],
        sexList: [{key: 0, value: '男'}, {key: 1, value: '女'}],
        userTypeList: [ //普通员工 2 总经理 3 安全员 4兑换员
          {key: 1, value: '普通员工'},
          {key: 2, value: '总经理'},
          {key: 3, value: '安全员'},
          {key: 4, value: '兑换员'}
        ],
        startDate: '1900-1-1',
        addressValue: [],
        addressData: [], // 地址数据
      }
    },
    mounted() {
      new ToolFunctor(this)._get();
      this.getListGroup();
    },
    destroyed() {
      this.$store.dispatch('setImageList', []);
    },
    methods: {
      chooseImage() {
        this.$refs.wxUploader.chooseImage();
      },
      onAddressShow() {
        if (!this.addressData.length) {
          this.$api.mainInterface.listProvinceAndCity()
            .then(res => {
              if (res.data.success) {
                this.addressData = res.data.data;
              }
            }).catch(err => {
            console.error(err)
          })
        }
      },
      onAddressChange(ids, names) {
        let [first, second] = ids;
        this.initial.provinceId = first;
        this.initial.cityId = second;
      },
      changeGroup(value) {
        console.log(value);
        this.initial.groupId = value;
      },
      getListGroup() {
        this.groupList.splice(0, this.groupList.length);
        this.$api.userInterface.listGroup()
          .then(res => {
            if (res.data.success) {
              [...res.data.data].map(m => {
                this.groupList.push({
                  key: m.groupId,
                  value: m.groupName
                })
              })
            }
          }).catch(err => {
          console.error(err)
        })
      },
      getWarnInfoState() {
        let state = true;

        if (this.$Global.isBlank(this.getImageList[0].imageUrl)) {
          state = false;
          return this.$vux.toast.text('请选择头像', 'top');
        }

        if (this.$Global.isBlank(this.initial.userName)) {
          state = false;
          return this.$vux.toast.text('请输入姓名', 'top');
        }
        if (!this.$Global.isBlank(this.$refs.email.valid)) {
          if (!this.$refs.email.valid) {
            state = false;
            return this.$vux.toast.text('请输入正确邮箱', 'top');
          }
        }

        if (this.$Global.isBlank(this.initial.groupId)) {
          state = false;
          return this.$vux.toast.text('请选择工种', 'top');
        }

        if (this.$Global.isBlank(this.initial.provinceId)) {
          state = false;
          return this.$vux.toast.text('请选择地址', 'top');
        }

        if (this.$Global.isBlank(this.initial.phoneNum)) {
          state = false;
          return this.$vux.toast.text('请输入手机号', 'top');
        } else if (!this.$Global.isPhoneAvailable(this.initial.phoneNum)) {
          state = false;
          return this.$vux.toast.text('请输入正确手机号', 'top');
        }

        if (this.$Global.isBlank(this.initial.birthday)) {
          state = false;
          return this.$vux.toast.text('请选择出生日期', 'top');
        }

        if (this.$Global.isBlank(this.initial.cardNO)) {
          state = false;
          return this.$vux.toast.text('请输入身份证号', 'top');
        }

        if (this.$Global.isBlank(this.initial.joinTime)) {
          state = false;
          return this.$vux.toast.text('请选择进场时间', 'top');
        }

        return state

      },
      submitForm() {
        if (!this.getWarnInfoState()) return;
        let param = new ToolFunctor(this)._set();

        this.$vux.loading.show({
          text: '正在提交'
        });
        this.$api.userInterface.saveUser(param)
          .then(res => {
            this.$vux.loading.hide();
            if (res.data.success) {
              new ToolFunctor(this)._get();
              this.$store.dispatch('setImageList', []);
              this.$vux.toast.text(res.data.data, 'top');
            }else{
              this.$vux.toast.text(res.data.retMsg, 'top');
            }
          }).catch(err => {
          console.error(err)
        })
      }
    }
  }

  class ToolFunctor {
    constructor(tis) {
      if (!tis) {
        throw new Error('[SKETCHPAD]: Missing parameters (tis)');
      }

      this.tis = typeof(tis) !== 'undefined' ? tis : null;
    }

    equal(fn) {
      return (...args) => {
        return fn.apply(this, args);
      }
    }

    _get(res) {
      let target = new Object(null);

      let form = ['userName', 'phoneNum', 'email', 'sex', 'userType', 'score', 'provinceId', 'loginName', 'cityId', 'groupId', 'birthday', 'cardNO', 'joinTime'];
      [...form].map((m, i) => {
        target[m] = (() => {
          return '';
        })();
      });

      target.score = 100;
      target.sex = 0; // 默认性别（男）
      target.userType = 1; // 默认员工类型（普通员工）
      target.groupId = '';

      return this.tis.initial = target;
    }

    _set() {
      let target = new Object(null);
      let initial = this.tis.initial;
      let imageList = this.tis.getImageList;

      Object.keys(initial).map(k => {
        target[k] = initial[k];
      });

      target.mediaIdJsonArray = (() => {
        let a = [];
        if (imageList.length) a.push(imageList[0].serverId);
        return JSON.stringify(a);
      })();

      return target;
    }
  }
</script>

