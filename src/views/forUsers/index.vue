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
      prompts: [
        {
          id: 1,
          title: '生成高质量文章',
          description: '用于生成结构清晰、内容丰富的高质量文章',
          content: '请写一篇关于人工智能发展前景的文章，要求结构清晰，包含引言、现状分析、未来展望和结论四个部分，每个部分不少于300字，语言要专业但通俗易懂。'
        },
        {
          id: 2,
          title: '创建创意海报文案',
          description: '用于生成吸引人的海报文案',
          content: '请为一个科技产品发布会设计海报文案，主题是"未来已来"，需要包含主标题、副标题和3个核心卖点，风格要科技感十足，同时简洁有力。'
        },
        {
          id: 3,
          title: '编写Python函数',
          description: '用于生成Python编程函数',
          content: '请编写一个Python函数，用于计算列表中所有元素的平均值，要求函数接受一个列表参数，返回平均值，同时处理空列表的情况。'
        }
      ]
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
}
</style>
