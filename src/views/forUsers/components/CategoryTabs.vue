<template>
  <div class="category-tabs">
    <el-tabs v-model="activeTab" @tab-click="handleTabClick" type="card">
      <el-tab-pane label="热门" name="popular">
        <!-- 热门分类内容将通过父组件传递 -->
      </el-tab-pane>
      <el-tab-pane label="精选" name="featured">
        <!-- 精选分类内容将通过父组件传递 -->
      </el-tab-pane>
      <el-tab-pane label="最新" name="latest">
        <!-- 最新分类内容将通过父组件传递 -->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'CategoryTabs',
  data() {
    return {
      activeTab: 'popular'
    }
  },
  methods: {
    handleTabClick(tab) {
      this.$emit('tab-change', tab.name)
    }
  }
}
</script>

<style scoped>
.category-tabs {
  margin-bottom: 20px;
}
</style>