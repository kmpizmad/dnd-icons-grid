import Image from 'next/image';
import { DragEventHandler } from 'react';

interface IProps {
  url: string;
  name?: string;
  onDragStart?: DragEventHandler<HTMLImageElement>;
}

export default function Sprite({ url, name, onDragStart }: IProps) {
  return (
    <div className="relative group">
      {!!name && (
        <div className="absolute -top-[110%] left-1/2 -translate-x-1/2 pointer-events-none px-2 py-1 bg-black/75 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-all">
          {name}
        </div>
      )}
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
    </div>
  );
}
