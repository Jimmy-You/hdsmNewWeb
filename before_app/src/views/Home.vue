<template>
  <div class="home">
    <!-- 头部搜索 -->
    
    <!-- 活动的路由 -->
    <router-view />
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
