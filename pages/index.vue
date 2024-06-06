<template>
  <!-- 公共头部 -->
  <AppHeader />
  <!-- 频道模块 -->
  <van-tabs>
    <van-tab v-for="item in channelList" :key="item.id" :title="item.name" />
  </van-tabs>
 <!-- 视频列表 -->
 <van-list
    v-model:loading="loading"
    :finished="finished"
    finished-text="去 bilibili App 看更多"
    @load="onLoad"
  >
    <div class="video-list">
      <AppVideo v-for="item in list" :key="item.bvid" :item="item" />
    </div>
  </van-list>
</template>
<script setup lang="ts">
//获取频道列表
const { data: channelList } = await useFetch('/api/channel')
//获取视频列表
const { data: videoList } = await useFetch('/api/video')

// 显示的列表
const list = ref<any[]>([])
// 加载状态
const loading = ref(false)
// 是否加载完成
const finished = ref(false)

// 页码 和 页容量
let page = 1
let pageSize = 20

// 滚动触底触发
const onLoad = () => {
  // 表示正在加载
  loading.value = false
  // 根据当前页码提取数据
  const data = videoList.value?.slice(
    (page - 1) * pageSize,
    page * pageSize,
  ) as any[]
  // 追加到用于渲染的数组中
  list.value.push(...data)
  // 页码累加
  page++
  // 加载结束
  if (videoList.value?.length === list.value.length) {
    finished.value = true
  }
}

// 初始化加载 - 主动请求前 20 条数据，用于服务端首屏渲染，方便 SEO 抓取到数据
onLoad()
</script>
<style scoped lang="scss">
.video-list {
  display: flex;
  flex-wrap: wrap;
  padding: 10px 5px;
}
</style>