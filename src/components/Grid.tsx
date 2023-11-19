import clsx from 'classnames';
import { DragEvent, DragEventHandler } from 'react';
import Sprite from './Sprite';
import { SpriteType, SpriteValue } from '../interfaces/sprite';

interface IProps {
  size: number;
  cellSize: number;
  values?: SpriteValue[];
  onDragStart?: (sprite: SpriteType) => DragEventHandler<HTMLImageElement>;
  onDrop?: (event: DragEvent<HTMLDivElement>, x: number, y: number) => void;
}

export default function Grid({ size, cellSize, values, onDragStart, onDrop }: IProps) {
  return (
    <div>
      {Array.from({ length: size }, (_, rowIndex) => (
        <div key={`grid-row-${rowIndex}`} className="flex">
          {Array.from({ length: size }, (_, colIndex) => {
            const isTopRow = rowIndex === 0;
            const isBottomRow = rowIndex === size - 1;
            const isLeftColumn = colIndex === 0;
            const isRightColumn = colIndex === size - 1;

            const index = rowIndex * size + colIndex;

            const sprite = values?.find(value => value.x === rowIndex && value.y === colIndex);

            return (
              <div
                key={`grid-cell-${index}`}
                className={clsx('flex items-center justify-center border border-gray-400', {
                  'border-t-0': isTopRow,
                  'border-b-0': isBottomRow,
                  'border-l-0': isLeftColumn,
                  'border-r-0': isRightColumn,
                })}
                style={{ width: cellSize, height: cellSize }}
                onDrop={e => {
                  if (onDrop) onDrop(e, rowIndex, colIndex);
                }}
                onDragOver={e => e.preventDefault()}
              >
                {sprite ? (
                  <Sprite
                    url={sprite.url}
                    onDragStart={e => {
                      if (onDragStart) onDragStart(sprite)(e);
                    }}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
