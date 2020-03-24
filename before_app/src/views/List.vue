<template>
  <div class="list">
    <!-- 顶部返回操做 -->
    <div class="list-top-ops">
      <i class="iconfont icon-fanhui" @click="handleGoBack" />
      <van-search
        shape="round"
        placeholder="搜索您想要的产品"
        v-model="searchKey"
        @search="handleSearch"
      />
    </div>
    <!-- 添加过滤条件 -->
    <div class="list-wrapper">
      <van-grid :gutter="4" :column-num="2" v-if="listData.length">
        <van-grid-item
          v-for="listItem in listData"
          :key="listItem.id"
        >
        <div @click="handleMenuItemClick(listItem)" class="list-item">
          <img
            class="list-item-img"
            :src="getImage(listItem)"
          />
          <div class="list-item-desc">
            <div class="list-item-name">
              {{ listItem.productName }}
            </div>
            <div class="list-item-price">
              ￥{{ getProductPrice(listItem.productPrice) || 0 }}
            </div>
          </div>
        </div>
        </van-grid-item>
      </van-grid>
      <div v-else style="margin-top: 16px;">
        暂无数据
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    let searchKey = this.$route.query.searchKey || ''
    return {
      listData: [], // 列表数据
      searchKey
    }
  },
  methods: {
    getImage(item) {
      let picList = item.productPic.slice(item.productPic.indexOf('[') + 1, item.productPic.indexOf(']')).split(',')
      return `${this.$imgPro}${picList[0].trim()}`
    },
    getProductPrice(priceStr) {
      if(!priceStr) return 0;
      const priceList = JSON.parse(priceStr);
      return priceList[0].value || 0 + '元起'
    },
    handleSearch(value) {
      this.$axios.get(this.$url.search, { name : value }).then((res) => {
        if(res.data.code == 0) {
            this.listData = res.data.result
        } else {
            this.listData = [];
        }
      }).catch((err) => {
          // this.$Message.error('未知错误，联系管理员')
      })
    },
    getListData() {
      if(this.$route.query.menuId) {
        this.$axios.get(this.$url.getList, { id: this.$route.query.menuId }).then((res) => {  
          if(res.data.code == 0 && Array.isArray(res.data.result) && res.data.result.length) {
              this.listData = res.data.result
          } else {
            this.listData = [];
          }
          }).catch((err) => {
        })
      } else if(this.$route.query.searchKey) {
        this.$axios.get(this.$url.search, { name : this.$route.query.searchKey }).then((res) => {
          if(res.data.code == 0) {
              this.listData = res.data.result
          } else {
              this.listData = [];
          }
        }).catch((err) => {
            // this.$Message.error('未知错误，联系管理员')
        })
      }
    },
    handleMenuItemClick(item) {
      // 某个项目的点击 跳转
      this.$store.dispatch('changeCurrentDetail', item);
      this.$router.push({
        path: '/detail',
      });
    },
    // 返回上一级
    handleGoBack() {
      this.$router.push('/catalog')
    }
  },
  mounted() {
    this.getListData();
  }  
}
</script>
<style lang="less">
.list {
  background: #f5f5f5;
  padding-top: 4px;
  .list-top-ops {
    display: flex;
    align-items: center;
    background: #fff;
    justify-content: space-around;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
  }
  .van-search {
    width: 85vw;
  }
  .list-wrapper {
    margin-top: 54px;
    .van-grid-item {
      .van-grid-item__content {
        border-radius: 6px;
      }
    }
    .list-item {
      .list-item-img {
        width: 100%;
        height: auto;
      }
      .list-item-desc {
        padding: 0 6px;
        text-align: left;
        >div {
          overflow: hidden;
          word-break: break-all;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin: 1px 0;
        }
        .list-item-price {
          color: red;
        }
      }
    }
  }
}
</style>