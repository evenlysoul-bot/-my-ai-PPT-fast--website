import { useState, useCallback } from 'react';
import { slides } from '@/data/slides';

const STORAGE_KEY = 'ppt_uploaded_images';
const VOTE_KEY = 'ppt_votes';
const CHECKIN_KEY = 'ppt_checkin';

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

export function useSlideStore() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [images, setImages] = useState<Record<string, UploadedImage>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });
  const [votes, setVotes] = useState<VoteData[]>(() => {
    try {
      const stored = localStorage.getItem(VOTE_KEY);
      return stored ? JSON.parse(stored) : [
        { option: 0, count: 0 },
        { option: 1, count: 0 },
        { option: 2, count: 0 },
        { option: 3, count: 0 },
      ];
    } catch {
      return [
        { option: 0, count: 0 },
        { option: 1, count: 0 },
        { option: 2, count: 0 },
        { option: 3, count: 0 },
      ];
    }
  });
  const [checkinCount, setCheckinCount] = useState(() => {
    try {
      const stored = localStorage.getItem(CHECKIN_KEY);
      return stored ? JSON.parse(stored).count : 0;
    } catch {
      return 0;
    }
  });
  const [showUploadPanel, setShowUploadPanel] = useState(false);
  const [isPresenterMode, setIsPresenterMode] = useState(false);

  const uploadImage = useCallback((slotId: string, slideId: number, file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const newImages = {
        ...images,
        [`${slideId}-${slotId}`]: { slotId, slideId, dataUrl, timestamp: Date.now() },
      };
      setImages(newImages);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newImages));
    };
    reader.readAsDataURL(file);
  }, [images]);

  const getImage = useCallback((slideId: number, slotId: string): string | null => {
    const key = `${slideId}-${slotId}`;
    return images[key]?.dataUrl || null;
  }, [images]);

  const vote = useCallback((option: number) => {
    const newVotes = votes.map((v, i) =>
      i === option ? { ...v, count: v.count + 1 } : v
    );
    setVotes(newVotes);
    localStorage.setItem(VOTE_KEY, JSON.stringify(newVotes));
  }, [votes]);

  const resetVotes = useCallback(() => {
    const newVotes = [
      { option: 0, count: 0 },
      { option: 1, count: 0 },
      { option: 2, count: 0 },
      { option: 3, count: 0 },
    ];
    setVotes(newVotes);
    localStorage.setItem(VOTE_KEY, JSON.stringify(newVotes));
  }, []);

  const checkin = useCallback(() => {
    const newCount = checkinCount + 1;
    setCheckinCount(newCount);
    localStorage.setItem(CHECKIN_KEY, JSON.stringify({ count: newCount, lastUpdate: Date.now() }));
  }, [checkinCount]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  }, []);

  const resetAll = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(VOTE_KEY);
    localStorage.removeItem(CHECKIN_KEY);
    setImages({});
    setVotes([
      { option: 0, count: 0 },
      { option: 1, count: 0 },
      { option: 2, count: 0 },
      { option: 3, count: 0 },
    ]);
    setCheckinCount(0);
  }, []);

  return {
    currentSlide,
    images,
    votes,
    checkinCount,
    showUploadPanel,
    isPresenterMode,
    setShowUploadPanel,
    setIsPresenterMode,
    uploadImage,
    getImage,
    vote,
    resetVotes,
    checkin,
    goToSlide,
    nextSlide,
    prevSlide,
    resetAll,
  };
}
