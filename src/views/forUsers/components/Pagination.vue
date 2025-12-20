<template>
  <div class="pagination">
    <el-pagination
      background
      layout="prev, pager, next, jumper, total"
      :total="total"
      :page-size="pageSize"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    total: {
      type: Number,
      required: true
    },
    pageSize: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  methods: {
    handleCurrentChange(page) {
      this.$emit('page-change', page)
    }
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>