import type { SlideData } from '@/types';
import type { VoteData } from '@/hooks/useSlideStore';
import { CheckInSlide } from './CheckInSlide';
import { CoverSlide } from './CoverSlide';
import { ChapterSlide } from './ChapterSlide';
import { ContentSlide } from './ContentSlide';
import { VoteSlide } from './VoteSlide';
import { VideoSlide } from './VideoSlide';
import { DemoSlide } from './DemoSlide';
import { CodeSlide } from './CodeSlide';
import { SummarySlide } from './SummarySlide';
import { ResourcesSlide } from './ResourcesSlide';
import { EndSlide } from './EndSlide';

interface SlideRendererProps {
  slide: SlideData;
  getImage: (slideId: number, slotId: string) => string | null;
  onUpload: (slotId: string, file: File) => void;
  votes: VoteData[];
  onVote: (option: number) => void;
  onResetVotes?: () => void;
}

export function SlideRenderer({
  slide,
  getImage,
  onUpload,
  votes,
  onVote,
  onResetVotes,
}: SlideRendererProps) {
  switch (slide.layout) {
    case 'checkin':
      return (
        <CheckInSlide
          title={slide.title || ''}
          subtitle={slide.subtitle || ''}
          quote={slide.quote || ''}
        />
      );
    case 'cover':
      return <CoverSlide slide={slide} />;
    case 'chapter':
      return <ChapterSlide slide={slide} />;
    case 'vote':
      return <VoteSlide slide={slide} votes={votes} onVote={onVote} onResetVotes={onResetVotes} />;
    case 'video':
      return <VideoSlide slide={slide} getImage={getImage} onUpload={onUpload} />;
    case 'demo':
      return <DemoSlide slide={slide} getImage={getImage} onUpload={onUpload} />;
    case 'code':
      return <CodeSlide slide={slide} />;
    case 'summary':
      return <SummarySlide slide={slide} />;
    case 'resources':
      return <ResourcesSlide slide={slide} />;
    case 'end':
      return <EndSlide slide={slide} />;
    case 'content':
    default:
      return <ContentSlide slide={slide} getImage={getImage} onUpload={onUpload} />;
  }
}
