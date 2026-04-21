export function MultiAgentFlow() {
  return (
    <div className="mt-4 w-full">
      <div className="flex flex-col items-center gap-2 relative">
        {/* User */}
        <div className="card-glass rounded-xl px-6 py-3 text-center glow-border z-10" style={{ minWidth: 200 }}>
          <p className="font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>你</p>
          <p style={{ fontSize: 'var(--small-size)', color: 'var(--text-muted)' }}>发出任务指令</p>
        </div>

        {/* Arrow down */}
        <div className="flex flex-col items-center" style={{ color: 'var(--accent)' }}>
          <svg width="20" height="24" viewBox="0 0 20 24"><line x1="10" y1="0" x2="10" y2="20" stroke="currentColor" strokeWidth="1.5"/><polyline points="5,16 10,22 15,16" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
        </div>

        {/* Director */}
        <div className="card-glass rounded-xl px-6 py-3 text-center z-10" style={{ minWidth: 240, borderColor: 'rgba(99,102,241,0.4)' }}>
          <p className="font-bold" style={{ color: 'var(--accent-light)', fontFamily: 'var(--font-display)' }}>统筹总监 Agent</p>
          <p style={{ fontSize: 'var(--small-size)', color: 'var(--text-muted)' }}>Claude / GPT-4 | 拆解任务</p>
        </div>

        {/* Arrow down */}
        <div className="flex flex-col items-center" style={{ color: 'var(--accent)' }}>
          <svg width="20" height="24" viewBox="0 0 20 24"><line x1="10" y1="0" x2="10" y2="20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4,3"/><polyline points="5,16 10,22 15,16" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
        </div>

        {/* Parallel agents */}
        <div className="grid grid-cols-4 gap-3 w-full max-w-3xl z-10">
          {[
            { label: '调研专员', tool: 'Kimi / Perplexity', icon: '🔍' },
            { label: '文案策划', tool: 'Claude / Kimi', icon: '✍️' },
            { label: '审核专员', tool: 'GPT-4 / Claude', icon: '✓' },
            { label: '设计助手', tool: 'Midjourney', icon: '🎨' },
          ].map((agent, i) => (
            <div key={i} className="card-glass rounded-xl p-3 text-center">
              <p className="text-lg mb-1">{agent.icon}</p>
              <p className="font-semibold text-xs" style={{ color: 'var(--text-primary)' }}>{agent.label}</p>
              <p style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{agent.tool}</p>
            </div>
          ))}
        </div>

        {/* Arrows converging */}
        <div className="flex items-center justify-center gap-2" style={{ color: 'var(--accent)' }}>
          <svg width="20" height="24" viewBox="0 0 20 24"><line x1="10" y1="0" x2="10" y2="20" stroke="currentColor" strokeWidth="1.5"/><polyline points="5,16 10,22 15,16" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
        </div>

        {/* Output */}
        <div className="card-glass rounded-xl px-8 py-3 text-center glow-border z-10" style={{ minWidth: 200 }}>
          <p className="font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>汇总输出</p>
          <p style={{ fontSize: 'var(--small-size)', color: 'var(--text-muted)' }}>最终结果</p>
        </div>
      </div>
    </div>
  );
}
