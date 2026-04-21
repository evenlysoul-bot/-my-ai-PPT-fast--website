export interface SlideData {
  id: number;
  section?: string;
  layout: 'cover' | 'chapter' | 'content' | 'video' | 'demo' | 'summary' | 'end' | 'checkin' | 'vote' | 'code' | 'resources';
  title?: string;
  subtitle?: string;
  quote?: string;
  content?: SlideContent[];
  links?: { text: string; url: string }[];
  videoQr?: { label: string; url: string }[];
  stats?: { label: string; value: string }[];
  imageSlots?: { id: string; label: string; defaultText?: string; defaultPath?: string; linkUrl?: string }[];
  tips?: { title: string; desc: string }[];
  steps?: { step: string; desc: string }[];
  bgImage?: string;
}

export interface SlideContent {
  type: 'text' | 'heading' | 'list' | 'link' | 'code' | 'stat' | 'image' | 'card';
  text?: string;
  items?: string[];
  url?: string;
  label?: string;
  value?: string;
  cards?: { title: string; desc: string }[];
}

export interface UploadedImage {
  slotId: string;
  slideId: number;
  dataUrl: string;
  timestamp: number;
}

export interface VoteData {
  option: number;
  count: number;
}

export interface CheckInData {
  count: number;
  names: string[];
}
