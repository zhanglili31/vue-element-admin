<template>
  <div class="prompt-collection">
    <div class="container">
      <!-- 页面标题 -->
      <div class="page-header">
        <h1>提示词汇总</h1>
        <p class="subtitle">收集和分享各类高质量的AI提示词</p>
      </div>

      <!-- 搜索框 -->
      <search-box @search="handleSearch"></search-box>

      <!-- 分类标签 -->
      <category-tabs @tab-change="handleTabChange"></category-tabs>

      <!-- 行业分类 -->
      <industry-tags @industry-change="handleIndustryChange"></industry-tags>

      <!-- 提示词列表 -->
      <div class="prompt-list">
        <prompt-item
          v-for="prompt in prompts"
          :key="prompt.id"
          :prompt="prompt"
        ></prompt-item>
      </div>

      <!-- 分页 -->
      <pagination
        :total="totalPrompts"
        :page-size="pageSize"
        :current-page="currentPage"
        @page-change="handlePageChange"
      ></pagination>
    </div>

    <!-- 页脚 -->
    <Footer></Footer>
  </div>
</template>

<script>
import SearchBox from './components/SearchBox'
import CategoryTabs from './components/CategoryTabs'
import IndustryTags from './components/IndustryTags'
import PromptItem from './components/PromptItem'
import Pagination from './components/Pagination'
import Footer from './components/Footer'
import { mockPrompts } from './mockData'

export default {
  name: 'PromptCollection',
  components: {
    SearchBox,
    CategoryTabs,
    IndustryTags,
    PromptItem,
    Pagination,
    Footer
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      totalPrompts: 100,
      searchQuery: '',
      activeTab: 'popular',
      activeIndustry: '',
      prompts: mockPrompts
    }
  },
  methods: {
    handleSearch(query) {
      this.searchQuery = query
      // 这里可以添加搜索逻辑
      console.log('搜索关键词:', query)
    },
    handleTabChange(tab) {
      this.activeTab = tab
      // 这里可以添加分类切换逻辑
      console.log('切换到分类:', tab)
    },
    handleIndustryChange(industry) {
      this.activeIndustry = industry
      // 这里可以添加行业分类切换逻辑
      console.log('切换到行业:', industry)
    },
    handlePageChange(page) {
      this.currentPage = page
      // 这里可以添加分页逻辑
      console.log('切换到页码:', page)
    }
  }
}
</script>

<style scoped>
.prompt-collection {
  background-color: #f5f7fa;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 30px;
  padding-top: 30px;
}

.page-header h1 {
  font-size: 36px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 16px;
  color: #666;
}

.prompt-list {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 20px;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .prompt-list {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    grid-gap: 16px;
  }
  
  .container {
    padding: 16px;
  }
}

@media (max-width: 480px) {
  .prompt-list {
    grid-template-columns: 1fr;
  }
}
</style>
