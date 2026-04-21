export function PromptCompare() {
  return (
    <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Bad Prompt */}
      <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(239,68,68,0.3)' }}>
        <div className="px-4 py-2.5 flex items-center gap-2" style={{ background: 'rgba(239,68,68,0.1)' }}>
          <span className="w-2 h-2 rounded-full" style={{ background: '#ef4444' }} />
          <span className="text-sm font-semibold" style={{ color: '#ef4444' }}>差的Prompt</span>
        </div>
        <div className="p-4" style={{ background: 'var(--bg-secondary)' }}>
          <pre className="text-sm whitespace-pre-wrap font-mono leading-relaxed" style={{ color: 'var(--text-secondary)', fontSize: 'var(--small-size)' }}>
{`帮我做个网站。
要好看一点。
颜色你定吧。`}
          </pre>
          <div className="mt-3 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
            <p style={{ fontSize: 'var(--small-size)', color: 'var(--text-muted)' }}>结果：AI会生成一个通用模板，可能完全不符合你的需求，需要大量返工</p>
          </div>
        </div>
      </div>

      {/* Good Prompt */}
      <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(34,197,94,0.3)' }}>
        <div className="px-4 py-2.5 flex items-center gap-2" style={{ background: 'rgba(34,197,94,0.1)' }}>
          <span className="w-2 h-2 rounded-full" style={{ background: '#22c55e' }} />
          <span className="text-sm font-semibold" style={{ color: '#22c55e' }}>好的Prompt</span>
        </div>
        <div className="p-4" style={{ background: 'var(--bg-secondary)' }}>
          <pre className="text-sm whitespace-pre-wrap font-mono leading-relaxed" style={{ color: 'var(--text-primary)', fontSize: 'var(--small-size)' }}>
{`角色：专业前端开发者
任务：开发一个个人博客网站
技术栈：React + TypeScript + Tailwind CSS
设计风格：极简主义、暗色主题、大量留白
核心功能：
- 文章列表页（支持标签筛选）
- 文章详情页（支持Markdown渲染）
- 关于页面
约束：
- 移动端优先响应式设计
- Lighthouse性能评分>90
- 支持SEO元数据
输出：直接输出完整可运行的代码`}
          </pre>
          <div className="mt-3 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
            <p style={{ fontSize: 'var(--small-size)', color: 'var(--text-muted)' }}>结果：AI能精准理解需求，一次性生成接近目标的代码，减少80%返工</p>
          </div>
        </div>
      </div>
    </div>
  );
}
