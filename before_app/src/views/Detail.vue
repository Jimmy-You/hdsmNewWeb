<template>
  <div class="detail">
    <div class="go-back" @click="handleGoBack">
      <i class="iconfont icon-fanhui" />
    </div>
    <van-swipe class="my-swipe" :autoplay="1000" indicator-color="white">
      <van-swipe-item
         v-for="(item, index) in renderImagelist"
         :key="index"
      >
        <img :src="item" style="width: 100%;height:auto;" />
      </van-swipe-item>
    </van-swipe>
    <div class="detail-desc">
      <div class="price-num" v-for="(item, index) in priceList" :key="index">
        <div class="num">
          <span>规格:{{item.name}}</span>
        </div>
        <div class="price">
          <span>￥</span>
          <span style="font-size: 22px; ">{{item.value}}</span>
        </div>
      </div>
      <div class="bottom-desc">
        <div class="item">
          <div class="title">产品名称</div>
          <div class="desc">{{getCurrentDetail.productName || ''}}</div>
        </div>
        <div class="item">
          <div class="title">产品描述</div>
          <div class="desc" v-html="getDesc"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import defaultImg from '@/assets/imgs/default.png'
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      
    }
  },
  computed: {
    ...mapGetters(['getCurrentDetail']),
    renderImagelist() {
      let item = this.getCurrentDetail;
      if(item.productPic) {
        let originList = item.productPic.slice(item.productPic.indexOf('[') + 1, item.productPic.indexOf(']')).split(',')
        return originList.map(f => {
          return this.$imgPro + f.trim();
        })
      } else {
        return [defaultImg];
      }
    },
    getDesc() {
      const desc = this.getCurrentDetail.productDesp || '暂无描述'
      return desc.replace(/\n/g,"<br>")
    },
    priceList() {
      const priceListStr = this.getCurrentDetail.productPrice || '[]';
      return JSON.parse(priceListStr) || [];
    },
  },
  methods: {
    handleGoBack() {
      this.$router.go(-1)
    }
  },
  mounted() {
  }  
}
</script>
<style lang="less">
.detail {
  position: relative;
  .go-back {
    position: fixed;
    width: 28px;
    height: 28px;
    border-radius: 14px;
    background: rgba(0,0,0,0.7);
    top: 16px;
    left: 16px;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    i {
      color: #fff;
    }
  }
  .detail-desc {
    padding: 16px;
    .price-num {
      display: flex;
      justify-content: space-between;
      font-size: 16px;
      align-items: center;
      margin: 4px 0;
      .price {
        color: red;
      }
      .num {

      }
    }
    .bottom-desc {
      text-align: left;
      .title {

      }
      .desc {
        margin: 6px 0;
        font-size: 16px;
        color: #111;
        font-weight: 600;
      }
    }
  }
}
</style>
