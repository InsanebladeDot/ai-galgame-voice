import router from '@/router'

// 搜索页跳转函数
export const RouteJumpSearch = (
  routerName: string, // 路由名称
  keyword?: string, // 关键词（可选）
  classify?: string, // 分类（可选）
) => {
  if (classify !== undefined) {
    router.push({ name: routerName, query: { classify } })
  } else router.push({ name: routerName, query: { keyword } })
}
