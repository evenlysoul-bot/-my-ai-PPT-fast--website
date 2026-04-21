export function IndustryChart() {
  const data = [
    { industry: '互联网/科技', adoption: 92, label: '92%' },
    { industry: '金融服务', adoption: 78, label: '78%' },
    { industry: '教育', adoption: 71, label: '71%' },
    { industry: '医疗健康', adoption: 65, label: '65%' },
    { industry: '制造业', adoption: 58, label: '58%' },
    { industry: '媒体/内容', adoption: 85, label: '85%' },
    { industry: '零售/电商', adoption: 74, label: '74%' },
    { industry: '政府机构', adoption: 52, label: '52%' },
  ];

  return (
    <div className="mt-6">
      <div className="space-y-3">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-right shrink-0 w-24" style={{ fontSize: 'var(--small-size)', color: 'var(--text-secondary)' }}>{item.industry}</span>
            <div className="flex-1 h-6 rounded-full overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
              <div
                className="h-full rounded-full flex items-center justify-end px-2 transition-all duration-1000"
                style={{
                  width: `${item.adoption}%`,
                  background: `linear-gradient(90deg, rgba(99,102,241,0.6), rgba(129,140,248,0.8))`,
                }}
              >
                <span className="text-xs font-bold text-white">{item.label}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {[
          { value: '3.2x', label: '平均生产力提升' },
          { value: '40%', label: '团队AI投入回报' },
          { value: '$180亿', label: '2026市场规模' },
        ].map((stat, i) => (
          <div key={i} className="card-glass rounded-xl p-3 text-center">
            <p className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent-light)' }}>{stat.value}</p>
            <p style={{ fontSize: 'var(--small-size)', color: 'var(--text-muted)' }}>{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
