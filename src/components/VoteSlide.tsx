import { useState, useEffect, useRef } from 'react';
import type { SlideData } from '@/types';
import type { VoteData } from '@/hooks/useSlideStore';
import gsap from 'gsap/dist/gsap';
import { BarChart3, Trash2 } from 'lucide-react';

interface VoteSlideProps {
  slide: SlideData;
  votes: VoteData[];
  onVote: (option: number) => void;
  onResetVotes?: () => void;
}

const VOTE_OPTIONS = [
  '完全没用过AI写代码',
  '尝试过，但失败了',
  '做了一些本地可用的产品',
  '上线了一个他人可用的产品',
];

export function VoteSlide({ slide, votes, onVote, onResetVotes }: VoteSlideProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.vote-inner',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out', delay: 0.15 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const total = votes.reduce((sum, v) => sum + v.count, 0) || 1;

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}>

      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,102,241,0.08) 0%, transparent 60%)' }} />

      <div className="vote-inner slide-frame relative z-10 text-center w-full" style={{ padding: 'var(--slide-padding)', opacity: 0 }}>
        <h1 className="slide-title font-bold mb-3">
          {slide.title}
        </h1>
        {slide.subtitle && <p className="slide-subtitle mb-8 font-light">{slide.subtitle}</p>}

        <div className="slide-body-scroll">
        <div className="space-y-3 mb-8 max-w-3xl mx-auto">
          {VOTE_OPTIONS.map((option, i) => {
            const pct = total > 0 ? Math.round((votes[i].count / total) * 100) : 0;
            return (
              <button key={i} onClick={() => { if (!hasVoted) { onVote(i); setHasVoted(true); } }}
                className="w-full text-left relative rounded-xl overflow-hidden transition-all duration-300"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  cursor: hasVoted ? 'default' : 'pointer',
                  opacity: hasVoted && pct === 0 ? 0.6 : 1
                }}>
                <div className="absolute left-0 top-0 bottom-0 transition-all duration-700"
                  style={{ width: hasVoted ? `${pct}%` : '0%', background: 'rgba(99,102,241,0.12)' }} />
                <div className="relative z-10 flex items-center justify-between px-5 py-4">
                  <span style={{ fontSize: 'var(--body-size)', color: 'var(--text-primary)' }}>{option}</span>
                  {hasVoted && (
                    <div className="flex items-center gap-3">
                      <span className="font-bold" style={{ color: 'var(--accent-light)', fontSize: 'var(--body-size)' }}>{votes[i].count} 票</span>
                      <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{pct}%</span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {hasVoted ? (
          <div className="flex items-center justify-center gap-2" style={{ color: 'var(--text-muted)' }}>
            <BarChart3 className="w-4 h-4" />
            <span style={{ fontSize: 'var(--small-size)' }}>共 {total} 人参与投票</span>
          </div>
        ) : (
          <p style={{ color: 'var(--text-muted)', fontSize: 'var(--small-size)' }}>点击选项投票</p>
        )}

        {/* Reset button */}
        {onResetVotes && (
          <button
            onClick={() => { if (confirm('确定清空所有投票数据吗？')) { onResetVotes(); setHasVoted(false); } }}
            className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all"
            style={{
              color: 'var(--text-muted)',
              border: '1px solid var(--border)',
              fontSize: 'var(--small-size)',
              background: 'transparent'
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
          >
            <Trash2 className="w-3.5 h-3.5" />
            清空投票数据
          </button>
        )}
        </div>
      </div>

      {slide.quote && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <p className="text-sm tracking-[0.2em] italic" style={{ color: 'var(--text-muted)' }}>「{slide.quote}」</p>
        </div>
      )}
    </div>
  );
}
