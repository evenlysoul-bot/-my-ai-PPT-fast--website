import type { SlideData } from '@/types';

export const slides: SlideData[] = [
  // ========== P0: 签到页 ==========
  {
    id: 0, layout: 'checkin', title: '软件即表达', subtitle: '玩着就能把想法做出来', quote: '请扫码签到',
  },
  // ========== P1: 封面 ==========
  {
    id: 1, layout: 'cover', title: '软件即表达', subtitle: '玩着就能把想法做出来', quote: '软件即表达',
    content: [{ type: 'text', text: '易文婷 | 云通数达' }],
  },
  // ========== P2: 破冰投票 ==========
  {
    id: 2, layout: 'vote', title: '你和AI编程的距离有多远？', subtitle: '点击投票，看看大家的分布', quote: '不只是用户，更是创造者',
    content: [{ type: 'list', items: ['完全没用过AI写代码', '尝试过，但失败了', '做了一些本地可用的产品', '上线了一个他人可用的产品'] }],
  },
  // ========== P3: 章节页（带右侧图表） ==========
  {
    id: 3, layout: 'content', title: '不是程序员的人，也在用AI做软件', subtitle: '产品经理、设计师、文科生、互联网从业者...各行各业的人正在用Vibe Coding创造自己的工具', quote: 'AI编程，已经不只是程序员的专利',
    content: [
      { type: 'text', text: 'chart-industry-impact' },
    ],
  },
  // ========== P4: 张咋啦 ==========
  {
    id: 4, layout: 'video', title: '张咋啦：AI产品经理的Vibe Coding', subtitle: 'AI产品经理@湾区 | 前飞书产品营销负责人 | 哈佛本科', quote: '技术没有那么神秘，关键是动手去做',
    content: [
      { type: 'heading', text: '关于她' },
      { type: 'text', text: 'X: @zarazhangrui | GitHub: github.com/zarazhangrui | 小红书18万粉丝AI博主' },
      { type: 'heading', text: '案例1：用Vibe Coding做PPT Skill（GitHub 6k+ Stars）' },
      { type: 'heading', text: '案例2：东京旅游地图 - 炫酷的交互攻略网站' },
    ],
    links: [
      { text: '案例1: PPT Skill', url: 'http://xhslink.com/o/45KYGVRQpiw' },
      { text: '案例2: 东京地图', url: 'https://www.xiaohongshu.com/discovery/item/69b4a227000000002300430d?source=webshare&xhsshare=pc_web&xsec_token=ABQWoZ1YzQ8mMisQkQhoBrUwT80gTCo9Owvxto7Cufj2Q=&xsec_source=pc_share' },
    ],
    imageSlots: [{ id: 'zhangzala-preview', label: '张咋啦视频截图', defaultText: '点击上传视频截图' }],
  },
  // ========== P5: Z派大鑫 ==========
  {
    id: 5, layout: 'video', title: 'Z派大鑫：设计师的Vibe Coding', subtitle: '兴趣使然的设计师 | B端&AI行业 | 8年经验 | AIGC创作者', quote: '设计+AI，创造无"AI味"的作品集',
    content: [
      { type: 'heading', text: '关于他' },
      { type: 'text', text: '原创AIGC创作者 | 设计管理 | 分享有趣又有用的设计经验和AI工具' },
      { type: 'heading', text: '案例：设计师如何打造无"AI味"的作品集网页' },
      { type: 'text', text: '用Vibe Coding的方式，让设计师的个人作品集既有品味又有技术感' },
      { type: 'heading', text: '推荐网页设计灵感网站' },
      { type: 'list', items: ['pinterest.com - 全球设计灵感收集平台', 'land-book.com - 精选网站设计案例库'] },
    ],
    links: [
      { text: '小红书: 作品集网页案例', url: 'https://www.xiaohongshu.com/discovery/item/69e5e351000000001b022cd4?source=webshare&xhsshare=pc_web&xsec_token=CB73iVU0-ZZTp80BCpbRmu1q_eGp2VwXBdEreYMZzhlcU=&xsec_source=pc_share' },
      { text: 'GitHub: web-to-design-md', url: 'https://github.com/Paidax01/web-to-design-md' },
      { text: '飞书文档', url: 'https://gwrdluzl9j9.feishu.cn/wiki/GVHywtdn6iDaHjk1so9c77CCnxh' },
      { text: 'Pinterest', url: 'https://pinterest.com' },
      { text: 'Land-book', url: 'https://land-book.com' },
    ],
    imageSlots: [{ id: 'zpaishen-preview', label: 'Z派大鑫视频截图', defaultText: '点击上传视频截图' }],
  },
  // ========== P6: 小史多喝水 ==========
  {
    id: 6, layout: 'video', title: '小史多喝水：文科生的Vibe Coding', subtitle: '互联网从业者 | 北京大学 | Make 文科生 great again!', quote: '文科生也能做出自己的产品',
    content: [
      { type: 'heading', text: '关于她' },
      { type: 'text', text: '互联网从业者，北京大学毕业，用Vibe Coding打破"文科生不会编程"的刻板印象' },
      { type: 'heading', text: '案例1：1分钟Vibe Coding - 春天花花收集器' },
      { type: 'heading', text: '案例2：文科生做了个App - 收集地球上所有好消息' },
      { type: 'text', text: '"为什么新闻里的坏消息总是比好消息多？我们太需要为昨天加一点滤镜，才能在明天有心气儿继续前行。"' },
    ],
    links: [
      { text: '案例1: 春天花花收集器', url: 'https://www.xiaohongshu.com/discovery/item/69c78b2b000000001f00034c?source=webshare&xhsshare=pc_web&xsec_token=ABqkIK-9sI-OoYFY08pCaGD4I8P_yj53lw15zlO5ryPrc=&xsec_source=pc_share' },
      { text: '案例2: 昨日头条App', url: 'https://www.xiaohongshu.com/discovery/item/6988ae6f000000001a02375f?source=webshare&xhsshare=pc_web&xsec_token=ABvVs04P1d5oUbN-6LygSCUh88C00A53gBAkHCCGwnYcU=&xsec_source=pc_share' },
    ],
    imageSlots: [{ id: 'xiaoshi-preview', label: '小史多喝水视频截图', defaultText: '点击上传视频截图' }],
  },
  // ========== P7: 六六 ==========
  {
    id: 7, layout: 'video', title: '怎么快速让网页变得更有设计', subtitle: '文科生的小技巧', quote: '审美不是设计师的专利，好工具让每个人都能做出好看的东西',
    content: [
      { type: 'heading', text: '六六：文科生博主，零基础用AI做网站' },
      { type: 'text', text: '核心方法：UI提示词优化 — 用精准的描述让AI生成更美的界面' },
      { type: 'heading', text: '推荐工具：DesignPrompt' },
      { type: 'text', text: 'Monochrome / Bauhaus / Modern-Dark / Newsprint / SaaS / Luxury / Terminal / Swiss-Minimalist' },
    ],
    links: [
      { text: 'DesignPrompt 工具', url: 'https://designprompt.vercel.app/' },
    ],
    imageSlots: [{ id: 'liuliu-preview', label: '六六教程截图', defaultText: '点击上传教程截图' }],
  },
  // ========== P8: Easy-Vibe ==========
  {
    id: 8, layout: 'content', title: 'Easy-Vibe：首个系统化Vibe Coding教程', subtitle: '清华大学 × Datawhale 联合开发', quote: '从"会用大模型"到"能上线产品"的完整路径',
    content: [
      { type: 'heading', text: '三阶段路径' },
      { type: 'list', items: ['基础工具', '前后端交互', '完整产品开发上线'] },
      { type: 'heading', text: '核心工具' },
      { type: 'list', items: ['Claude Code（MCP协议）', 'Cursor / Windsurf', 'Figma / MasterGo', 'Supabase 数据库'] },
      { type: 'heading', text: '工作流程' },
      { type: 'text', text: '中文描述需求 → AI生成代码 → 对话迭代优化 → 部署上线' },
    ],
