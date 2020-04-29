<template>
	<div class="catalogMenuList">
		<van-grid :column-num="3" :border="false">
			<van-grid-item
				v-for="listItem in listData"
				:key="listItem.id"
			>
			<div @click="handleMenuItemClick(listItem)" class="menu-item">
				<img
					class="menu-item-img"
					:src="getImage(listItem)"
				/>
				<div>{{listItem.lableName || listItem.productName}}</div>
			</div>
			</van-grid-item>
		</van-grid>
	</div>	
</template>
<script>
export default {
	props: ['menuId'],
	data() {
		return {
			listData: [],
		}
	},
	methods: {
		getImage(item) {
      if(item.productPic) {
        let picList = item.productPic.slice(item.productPic.indexOf('[') + 1, item.productPic.indexOf(']')).split(',')
        return `${this.$imgPro}${picList[0].trim()}`
      } else if(item.picPath) {
        return `${this.$imgFol}${item.picPath}`
      } else {
        return defaultImg
      }
    },
		initListData() {
			if(!this.menuId) return;
			this.$axios.get(this.$url.getList, { id: this.menuId }).then((res) => {
          if(res.data.code == 0 && Array.isArray(res.data.result) && res.data.result.length) {
              this.listData = res.data.result
          } else {
            this.listData = [];
          }
      }).catch((err) => {
      })
		},
		handleMenuItemClick(item) {
			// 菜单项目点击 链接跳转
			const{ isDir = '-1', id = '' } = item;
			if(isDir == '0') {
				// 这个类目是产品集合
				this.$router.push({
					path: '/list',
					query: {
						menuId: id
					}
				});
			} else {
				// 产品
				this.$store.dispatch('changeCurrentDetail', item);
				this.$router.push({
					path: '/detail',
				});
			}
		}
	},
	watch: {
		menuId(oldId, newId) {
			if(oldId != newId) {
				this.initListData();
			}
		}
	},
	mounted() {
		this.initListData();
	}
}
</script>
<style lang="less">
.catalogMenuList {
	.menu-item {
		.menu-item-img {
			width: 100%;
			height: auto;
		}
	}
}
</style>