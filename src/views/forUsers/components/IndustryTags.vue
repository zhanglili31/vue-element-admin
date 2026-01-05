<template>
  <div class="industry-tags">
    <h3>行业分类</h3>
    <div class="tags-container">
      <el-tag
        v-for="tag in industryTags"
        :key="tag.value"
        :type="activeIndustry === tag.value ? 'primary' : ''"
        @click="handleTagClick(tag.value)"
        effect="plain"
      >
        {{ tag.label }}
      </el-tag>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndustryTags',
  data() {
    return {
      activeIndustry: '',
      industryTags: [
        { label: '计算机', value: '计算机' },
        { label: '金融', value: '金融' },
        { label: '医疗', value: '医疗' },
        { label: '教育', value: '教育' },
        { label: '法律', value: '法律' },
        { label: '设计', value: '设计' }
      ]
    }
  },
  methods: {
    handleTagClick(industry) {
      this.activeIndustry = industry
      this.$emit('industry-change', industry)
    }
  }
}
</script>

<style scoped>
.industry-tags {
  margin-bottom: 20px;
}

h3 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>