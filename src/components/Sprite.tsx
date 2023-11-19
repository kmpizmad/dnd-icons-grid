import Image from 'next/image';
import { DragEventHandler } from 'react';

interface IProps {
  url: string;
  onDragStart?: DragEventHandler<HTMLImageElement>;
}

export default function Sprite({ url, onDragStart }: IProps) {
  return (
    <Image
      className="cursor-grab active:cursor-grabbing"
      src={url}
      alt="sprite"
      width={32}
      height={32}
      unoptimized={process.env.NODE_ENV !== 'production'}
      draggable
      onDragStart={onDragStart}
    />
  );
}
