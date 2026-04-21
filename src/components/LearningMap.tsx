import { ExternalLink, Palette, Wrench, Code, Users, BookOpen } from 'lucide-react';

const categories = [
  {
    icon: <Palette className="w-5 h-5" />,
    title: '视觉设计',
    color: 'rgba(236,72,153,0.2)',
    colorBorder: 'rgba(236,72,153,0.4)',
    items: [
      { name: 'DesignPrompt', url: 'https://designprompt.vercel.app/' },
      { name: 'Pinterest', url: 'https://pinterest.com' },
      { name: 'Land-book', url: 'https://land-book.com' },
    ],
  },
  {
    icon: <Wrench className="w-5 h-5" />,
    title: '开发工具',
    color: 'rgba(99,102,241,0.2)',
    colorBorder: 'rgba(99,102,241,0.4)',
    items: [
      { name: 'Cursor', url: 'https://cursor.com' },
      { name: 'Claude Code', url: 'https://claude.ai' },
      { name: 'Kimi', url: 'https://kimi.moonshot.cn' },
      { name: 'Figma', url: 'https://figma.com' },
      { name: 'Supabase', url: 'https://supabase.com' },
    ],
  },
  {
    icon: <Code className="w-5 h-5" />,
    title: '教程资源',
    color: 'rgba(34,197,94,0.2)',
    colorBorder: 'rgba(34,197,94,0.4)',
    items: [
      { name: 'Easy-Vibe (清华+Datawhale)', url: 'https://datawhalechina.github.io/easy-vibe' },
      { name: 'Vibe-Vibe', url: 'https://www.vibevibe.cn' },
      { name: 'vibe-prd模板', url: 'https://github.com/stulogy/vibe-prd' },
      { name: 'vibe-coding-prompt', url: 'https://github.com/KhazP/vibe-coding-prompt-template' },
      { name: 'web-to-design-md', url: 'https://github.com/Paidax01/web-to-design-md' },
    ],
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: '关注博主',
    color: 'rgba(245,158,11,0.2)',
    colorBorder: 'rgba(245,158,11,0.4)',
    items: [
      { name: '张咋啦 @zarazhangrui', url: 'https://x.com/zarazhangrui' },
      { name: 'Z派大鑫 (小红书)', url: 'https://www.xiaohongshu.com/user/profile/5f7d3c0a000000000101e9a7' },
      { name: '小史多喝水 (小红书)', url: 'https://www.xiaohongshu.com/user/profile/5c8f8e5a000000001102b0e1' },
      { name: '六六 (小红书)', url: 'https://www.xiaohongshu.com/user/profile/5c8f8e5a000000001102b0e2' },
    ],
  },
  {
    icon: <BookOpen className="w-5 h-5" />,
    title: '文档协作',
    color: 'rgba(6,182,212,0.2)',
    colorBorder: 'rgba(6,182,212,0.4)',
    items: [
      { name: '飞书文档', url: 'https://gwrdluzl9j9.feishu.cn/wiki/GVHywtdn6iDaHjk1so9c77CCnxh' },
      { name: '飞书OpenClaw', url: 'https://open.feishu.cn/' },
    ],
  },
];

export function LearningMap() {
  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((cat, i) => (
        <div key={i} className="card-glass rounded-xl p-4" style={{ borderColor: cat.colorBorder }}>
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: cat.color, color: 'var(--text-primary)' }}>
              {cat.icon}
            </div>
            <h4 className="font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{cat.title}</h4>
          </div>
          <div className="space-y-1.5">
            {cat.items.map((item, j) => (
              <a key={j} href={item.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 group py-1"
                style={{ fontSize: 'var(--small-size)', color: 'var(--text-secondary)' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent-light)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; }}>
                {item.name}
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity" />
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
