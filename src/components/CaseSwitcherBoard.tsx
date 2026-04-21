import { useMemo, useState } from 'react';
import { ArrowUpRight, Newspaper, Radar, Sparkles } from 'lucide-react';

type NewsItem = {
  source: string;
  title: string;
  summary: string;
  url: string;
};

type CaseItem = {
  id: string;
  name: string;
  blurb: string;
  headline: string;
  summary: string;
  impact: string;
  tags: string[];
  news: NewsItem[];
};

const CASES: CaseItem[] = [
  {
    id: 'nick',
    name: '15岁少年 Nick',
    blurb: 'BeyondSPX 金融研究产品，月活 5 万人',
    headline: '高中生也能用 AI 做出有真实用户的金融研究平台',
    summary: 'Nick 的 BeyondSPX 之所以有代表性，不只因为年龄小，而是因为它说明产品洞察、研究框架和表达能力，正在比“会不会写底层代码”更重要。',
    impact: '信号很明确：AI 把“谁能开始做软件”这件事，大幅往前推了。',
    tags: ['金融研究', '青少年创业', 'AI 产品'],
    news: [
      {
        source: 'VnExpress',
        title: 'Teenagers are the new face of AI startups while still in school',
        summary: '报道将 Nick 列为 AI 创业青少年代表，提到 BeyondSPX 已拥有超过 5 万月活用户，能直观看到 AI 对创业起点的改变。',
        url: 'https://e.vnexpress.net/news/tech/personalities/teenagers-are-the-new-face-of-ai-startups-4997567.html',
      },
      {
        source: '今日头条',
        title: '15岁少年用 AI 搭出 BeyondSPX，产品已跑出数万用户',
        summary: '中文稿件更适合现场快速阅读，重点是产品切口、用户增长以及为什么这个案例会在创业圈被反复引用。',
        url: 'https://www.toutiao.com/article/7586622264536318515/',
      },
      {
        source: 'Modern G',
        title: 'AI時代の新星：15歳が創業した金融AI企業「BeyondSPX」の衝撃',
        summary: '从“15 岁也能做 AI 产品”的角度做了更强叙事，适合拿来支撑你这页的观点。',
        url: 'https://modern-g.com/ainews251223',
      },
    ],
  },
  {
    id: 'baifu',
    name: '大四学生 BaiFu',
    blurb: 'MiroFish 走红 GitHub，并拿到投资关注',
    headline: 'AI 让校园项目更快从作品，变成事件，再变成机会',
    summary: 'BaiFu 的案例适合讲“速度红利”：更快做出产品、更快被社区看见、更快进入更大范围的讨论与验证。',
    impact: '从 GitHub 热榜到资本关注，链路被压缩，节奏被放大。',
    tags: ['GitHub 热榜', '校园创业', '速度验证'],
    news: [
      {
        source: '搜狐',
        title: 'GitHub全球第一！大学生，用AI辅助编程，10天赚足3000万',
        summary: '文章回顾了 MiroFish 爆红的传播过程，非常适合右侧做“新闻感”预览。',
        url: 'https://www.sohu.com/a/995020950_122598633',
      },
      {
        source: '万维易源',
        title: 'MiroFish：10天斩获3000万投资的AI预测新星',
        summary: '更偏项目总结视角，适合让观众快速理解这个案例为什么会引爆关注。',
        url: 'https://www.showapi.com/news/article/69ae28f54ddd79ab67465705',
      },
      {
        source: '案例整理',
        title: 'BaiFu / MiroFish 项目背景与演化过程',
        summary: '适合做补充阅读，帮助观众理解这个案例不是单次爆发，而是连续迭代的结果。',
        url: 'https://whale3070.github.io/page/3/',
      },
    ],
  },
  {
    id: 'yang',
    name: '文科生 杨天润',
    blurb: '72 小时冲进 GitHub 全球榜前 30',
    headline: '文科生也能把想法快速推上开发者主舞台',
    summary: '这个案例最贴近你的主题，因为它天然回答了“不是程序员的人，为什么也该关注 AI 做软件”这个问题。',
    impact: 'AI 正在把表达能力、题目感、产品感觉，变成真正的软件产出。',
    tags: ['文科生', '跨界做产品', 'GitHub 排名'],
    news: [
      {
        source: '虎嗅',
        title: '72小时闯进程序员“最高学府”，不懂代码的文科生成AI时代的香饽饽？',
        summary: '文章本身就是对“文科生能否做出软件”这一问题的直接回应，非常适合做右侧预览。',
        url: 'https://www.huxiu.com/article/4841324.html',
      },
    ],
  },
  {
    id: 'yunfu',
    name: '云蝠智能',
    blurb: '40 人团队月 AI 投入 2 万，人均提效 40%',
    headline: '组织不是先被替代，而是先被重新压缩与增强',
    summary: '云蝠智能不是个人神话，而是团队级实践，它更能说明企业为什么会开始认真看待 AI 采用率这件事。',
    impact: '当 AI 投入成本可控、提效又明显，采用率就会从试验走向制度化。',
    tags: ['团队提效', '组织协同', '企业落地'],
    news: [
      {
        source: '青年观察网',
        title: 'Token预算来了，一场职场“大PK”开始了',
        summary: '文中直接提到云蝠智能 40 人团队月度 AI 投入约 2 万元，人均提效约 40%，非常适合做这页的新闻样本。',
        url: 'https://zqbcyol.com/articles/2026/04/30494/30494.html',
      },
      {
        source: '搜狐',
        title: '对话130秒的秘密：云蝠智能如何定义大模型呼叫的“人性化天花板”',
        summary: '从产品能力和业务落地的视角补充了这个团队为什么值得看，不只是“用了 AI”，而是“做成了业务能力”。',
        url: 'https://www.sohu.com/a/975492676_122273378',
      },
    ],
  },
  {
    id: 'xinheyun',
    name: '新核云',
    blurb: '制造业协同、异常处理与 AI Agent 开始落地',
    headline: 'AI 的下一个重要战场，不只是内容，而是工业协同与异常处理',
    summary: '新核云对应的是更偏制造业场景的“硬落地”案例，适合帮观众建立一个更广的行业想象。',
    impact: '从内容生成到工厂协同，AI 采用率正在穿透更传统的行业。',
    tags: ['制造业', '飞书协同', '工业 AI'],
    news: [
      {
        source: '飞书官网',
        title: '先进制造生产协同解决方案',
        summary: '飞书与新核云的联合方案，覆盖计划排程、派工、追溯、质量与设备运维，适合做案例延展阅读。',
        url: 'https://www.feishu.cn/content/advanced-manufacturing-collaboration-solution',
      },
      {
        source: '百度智能云',
        title: '新核云：离散制造业的数字化全栈解决方案',
        summary: '从更偏产业视角解释新核云的定位，能帮助观众理解制造业数字化为什么值得关注。',
        url: 'https://cloud.baidu.com/article/5661871',
      },
      {
        source: '新核云官网',
        title: '新核云 AI MES',
        summary: '官方页可以直接看到产品侧的能力边界，更适合现场观众后续自行延伸阅读。',
        url: 'https://www.xinheyun.com/features_equipment',
      },
    ],
  },
];

export function CaseSwitcherBoard() {
  const [activeId, setActiveId] = useState(CASES[0].id);
  const activeCase = useMemo(() => CASES.find((item) => item.id === activeId) ?? CASES[0], [activeId]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-8 items-start">
      <div className="space-y-4">
        <div className="flex items-center gap-3 terminal-label text-sm">
          <Radar className="w-4 h-4" />
          关键案例
        </div>

        <div className="space-y-3">
          {CASES.map((item) => {
            const isActive = item.id === activeCase.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveId(item.id)}
                className="w-full text-left card-glass p-5 transition-all duration-200"
                style={{
                  borderColor: isActive ? 'rgba(0,255,255,0.76)' : 'rgba(255,0,255,0.22)',
                  boxShadow: isActive
                    ? 'inset 0 0 0 1px rgba(0,255,255,0.55), 0 0 24px rgba(0,255,255,0.16), 0 0 30px rgba(255,0,255,0.12)'
                    : undefined,
                  background: isActive ? 'rgba(18, 10, 44, 0.95)' : undefined,
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[1.25rem] font-bold mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                      {item.name}
                    </p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--body-size)' }}>{item.blurb}</p>
                  </div>
                  <span className="terminal-label text-xs shrink-0" style={{ color: isActive ? 'var(--accent-warm)' : 'var(--text-muted)' }}>
                    {isActive ? '已选中' : '点击查看'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <div className="card-glass p-6">
          <div className="flex items-center gap-3 mb-4 terminal-label text-sm">
            <Sparkles className="w-4 h-4" />
            案例情报看板
          </div>

          <p className="text-[1.7rem] mb-3" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)', lineHeight: 1.2 }}>
            {activeCase.headline}
          </p>
          <p className="mb-4" style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 'var(--body-size)' }}>
            {activeCase.summary}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {activeCase.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs terminal-label"
                style={{ border: '1px solid rgba(255,0,255,0.36)', background: 'rgba(255,0,255,0.08)', color: 'var(--accent-light)' }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="p-4" style={{ border: '1px solid rgba(0,255,255,0.36)', background: 'rgba(4, 2, 16, 0.85)', boxShadow: 'inset 0 0 0 1px rgba(255,0,255,0.12)' }}>
            <p className="terminal-prefix terminal-label text-xs mb-2">观察结论</p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: 'var(--body-size)' }}>{activeCase.impact}</p>
          </div>
        </div>

        <div className="card-glass p-6">
          <div className="flex items-center gap-3 mb-4 terminal-label text-sm">
            <Newspaper className="w-4 h-4" />
            相关新闻预览
          </div>

          <div className="space-y-3">
            {activeCase.news.map((item) => (
              <a
                key={`${activeCase.id}-${item.url}`}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 transition-all duration-200"
                style={{ border: '1px solid rgba(255,0,255,0.22)', background: 'rgba(10,4,28,0.78)' }}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="terminal-label text-xs">{item.source}</span>
                  <ArrowUpRight className="w-4 h-4 shrink-0" style={{ color: 'var(--accent-light)' }} />
                </div>
                <p className="mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)', lineHeight: 1.3 }}>
                  {item.title}
                </p>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, fontSize: 'var(--small-size)' }}>{item.summary}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
