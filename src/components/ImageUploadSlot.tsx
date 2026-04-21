import { useRef, useCallback } from 'react';
import { Upload, ImageIcon, ExternalLink } from 'lucide-react';

interface ImageUploadSlotProps {
  label: string;
  defaultText: string;
  imageUrl: string | null;
  defaultPath?: string;
  linkUrl?: string;
  onUpload: (file: File) => void;
}

export function ImageUploadSlot({ label, defaultText, imageUrl, defaultPath, linkUrl, onUpload }: ImageUploadSlotProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const displayUrl = imageUrl || defaultPath || null;
  const isDefaultImage = !imageUrl && !!defaultPath;

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onUpload(file);
    e.target.value = '';
  }, [onUpload]);

  if (displayUrl) {
    return (
      <div className="relative group overflow-hidden card-glass"
        style={{ background: 'var(--bg-secondary)' }}>
        {isDefaultImage && linkUrl ? (
          <a href={linkUrl} target="_blank" rel="noopener noreferrer" className="block">
            <img src={displayUrl} alt={label} className="w-full h-auto max-h-[420px] object-contain" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'rgba(0,0,0,0.55)' }}>
              <div className="flex items-center gap-2 px-4 py-2.5"
                style={{ background: 'rgba(0,255,255,0.16)', color: 'var(--accent-light)', backdropFilter: 'blur(10px)', border: '1px solid rgba(0,255,255,0.55)' }}>
                <ExternalLink className="w-4 h-4" /> 点击访问
              </div>
            </div>
          </a>
        ) : (
          <img src={displayUrl} alt={label} className="w-full h-auto max-h-[420px] object-contain" />
        )}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'rgba(0,0,0,0.55)' }}>
          <button onClick={handleClick}
            className="flex items-center gap-2 px-4 py-2.5 transition-all"
            style={{ background: 'rgba(255,0,255,0.16)', color: 'var(--text-primary)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,0,255,0.55)' }}>
            <Upload className="w-4 h-4" /> {imageUrl ? '替换图片' : '上传图片'}
          </button>
        </div>
        <div className="absolute bottom-2 left-2 px-2 py-1 text-xs terminal-label" style={{ background: 'rgba(0,0,0,0.75)', color: 'var(--accent-light)' }}>
          {label}
        </div>
        <input ref={inputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      </div>
    );
  }

  return (
    <div onClick={handleClick}
      className="border-2 border-dashed p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-300 min-h-[200px]"
      style={{ borderColor: 'rgba(255,0,255,0.42)', background: 'rgba(26,16,60,0.5)' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,255,255,0.75)'; e.currentTarget.style.background = 'rgba(0,255,255,0.06)'; e.currentTarget.style.boxShadow = '0 0 22px rgba(255,0,255,0.16)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,0,255,0.42)'; e.currentTarget.style.background = 'rgba(26,16,60,0.5)'; e.currentTarget.style.boxShadow = 'none'; }}>
      <ImageIcon className="w-10 h-10" style={{ color: 'var(--accent-light)' }} />
      <p className="text-sm text-center terminal-prefix" style={{ color: 'var(--text-muted)' }}>{defaultText}</p>
      <div className="flex items-center gap-1.5 text-xs terminal-label" style={{ color: 'var(--accent)' }}>
        <Upload className="w-3.5 h-3.5" /> 点击上传
      </div>
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
    </div>
  );
}
