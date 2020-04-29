<template>
  <div class="catalog">
    <div>
      <van-search
        v-model="searchKey"
        @search="handleSearch"
        shape="round"
        background="#ff6600"
        placeholder="搜索您想要的产品"
      />
      <!-- <van-tabs type="card" class="m_top_menus" v-model="activeTab">
        <van-tab v-for="item in menuList" :title="item.lableName" :name="item.id" :key="item.id">
        </van-tab>
      </van-tabs> -->
      <div :style="{display: 'flex'}">
        <van-sidebar v-model="activeTab" @change="activeChange" >
          <van-sidebar-item v-for="item in menuList" :title="item.lableName" :name="item.id" :key="item.id" />
        </van-sidebar>
        <menuItemList
          style="flex:1;"
          :menuId="getActive"
        />
      </div>
    </div>
  </div>
</template>
<script>
import menuItemList from '@/components/catalog/menuItemList.vue'

export default {
  components: {
    menuItemList
  },
  data() {
    return  {
      searchKey: '',
      activeTab: 0,
      menuList: [],
    }
  },
  computed: {
    getActive() {
      return this.menuList[this.activeTab] ? this.menuList[this.activeTab].id : ''
    }
  },
  methods: {
    handleSearch(value) {
      this.$router.push({
        path: '/list',
        query: {
          searchKey: value
        }
      });
    },
    getMenuList() {
      this.$axios.get(this.$url.getList, { id: -1 }).then((res) => {
          if(res.data.code == 0 && Array.isArray(res.data.result) && res.data.result.length) {
              this.menuList = res.data.result
          } else {
            this.menuList = [];
          }
      }).catch((err) => {
      })
    },
    activeChange(index) {
      this.activeTab = index
    }
  },
  mounted() {
    this.getMenuList();
  }
}
</script>
<style lang="less">
.catalog {
  .m_top_menus {
    margin: 6px 0;
    .van-tabs__nav {
      margin: 0 4px;
      // border-radius: 15px;
      // .van-tab {
      //   &:first-child {
      //     border-radius: 15px 0 0 15px;
      //   }
      //   &:last-child {
      //     border-radius: 0 15px 15px 0;
      //   }
      // }
    }
  }
}
</style>