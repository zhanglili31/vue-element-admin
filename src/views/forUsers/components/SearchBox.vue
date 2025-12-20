<template>
  <div class="search-box">
    <el-input
      v-model="searchQuery"
      placeholder="请输入关键词搜索提示词"
      prefix-icon="el-icon-search"
      size="large"
      @keyup.enter.native="handleSearch"
    >
      <el-button slot="append" type="primary" @click="handleSearch">搜索</el-button>
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'SearchBox',
  data() {
    return {
      searchQuery: ''
    }
  },
  methods: {
    handleSearch() {
      this.$emit('search', this.searchQuery)
    }
  }
}
</script>

<style scoped>
.search-box {
  margin-bottom: 20px;
}
</style>