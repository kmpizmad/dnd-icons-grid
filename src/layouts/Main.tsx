import { DragEvent, useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Select from 'react-select';
import Grid from '../components/Grid';
import Sprite from '../components/Sprite';
import { SpriteType, SpriteValue, isSpriteValue } from '../interfaces/sprite';
import DowloadJson from '../components/DownloadJson';
import Button from '../components/Button';

interface IProps {
  sprites: SpriteType[];
}

const options = [
  { value: 'Lorem ipsum', label: 'Lorem ipsum' },
  { value: 'dolor sit amet', label: 'dolor sit amet' },
  { value: 'consectetur adipiscing elit', label: 'consectetur adipiscing elit' },
  { value: 'Curabitur vitae volutpat erat', label: 'Curabitur vitae volutpat erat' },
  { value: 'In augue libero', label: 'In augue libero' },
  { value: 'elementum malesuada porta ac', label: 'elementum malesuada porta ac' },
];

export default function Main({ sprites }: IProps) {
  const leftBarRef = useRef<HTMLDivElement>(null);
  const rightBarRef = useRef<HTMLDivElement>(null);
  const gridCellSize = useMemo(() => 40, []);
  const [_gridSize, setGridSize] = useState<number>(0);
  const [iconSize, setIconSize] = useState<number>(0);
  const [cellValues, setCellValues] = useState<SpriteValue[]>([]);
  const [selection, setSelection] = useState<string>(options[0].value);

  // Takes up exactly the screen width
  useLayoutEffect(() => {
    if (!leftBarRef.current || !rightBarRef.current) return;
    const leftBarWidth = leftBarRef.current.offsetWidth;
    const gridWidth = window.innerWidth - leftBarWidth - rightBarRef.current.offsetWidth;
    const gridX = Math.floor(gridWidth / gridCellSize);
    const gridY = Math.floor(window.innerHeight / gridCellSize);
    setGridSize(gridX < gridY ? gridX : gridY);
    setIconSize(Math.floor(leftBarWidth / gridCellSize));
  }, [gridCellSize]);

  const onDragStart = useCallback(
    (sprite: SpriteType | SpriteValue) => {
      return (e: DragEvent<HTMLImageElement>) => {
        let value: SpriteValue;
        if (isSpriteValue(sprite)) value = { ...sprite };
        else value = { ...sprite, id: cellValues.length + 1, x: -1, y: -1 };
        e.dataTransfer.setData('sprite', JSON.stringify(value));
      };
    },
    [cellValues.length],
  );

  const onDrop = useCallback(
    (event: DragEvent<HTMLDivElement>, x: number, y: number) => {
      if (cellValues.find(value => value.x === x && value.y === y)) return;
      const sprite: SpriteValue = JSON.parse(event.dataTransfer.getData('sprite'));
      setCellValues(prev => {
        const gSprite = prev.find(value => value.id === sprite.id);
        if (gSprite) {
          gSprite.x = x;
          gSprite.y = y;
          return [...prev];
        } else {
          return [...prev, { ...sprite, x, y }];
        }
      });
    },
    [cellValues],
  );

  return (
    <div className="w-screen h-screen max-w-6xl mx-auto px-3 lg:px-6 flex justify-around items-center gap-3 lg:gap-6">
      <div
        ref={leftBarRef}
        className="w-1/4 grid place-items-center justify-center gap-y-1"
        style={{ gridTemplateColumns: `repeat(${iconSize}, ${gridCellSize}px)` }}
      >
        {sprites.map((sprite, key) => (
          <Sprite key={`sprite-${key}`} url={sprite.url} name={sprite.displayName} onDragStart={onDragStart(sprite)} />
        ))}
      </div>
      <div>
        <div className="flex items-center justify-center mb-6">
          <Select
            className="w-3/4"
            defaultValue={options[0]}
            options={options}
            onChange={value => setSelection(value?.value || options[0].value)}
          />
        </div>
        <Grid size={12} cellSize={gridCellSize} values={cellValues} onDragStart={onDragStart} onDrop={onDrop} />
        <div>
          Download file at:{' '}
          <Link
            href="https://www.example.com"
            target="_blank"
            className="text-blue-700 active:text-purple-700 visited:text-purple-700 underline"
          >
            www.example.com
          </Link>
        </div>
      </div>
      <div ref={rightBarRef} className="w-1/6 flex flex-col justify-center items-center gap-2">
        <DowloadJson data={cellValues} className="w-full" appendWith={selection} />
        <Button className="w-full" color="neutral" onClick={() => setCellValues([])}>
          Reset
        </Button>
      </div>
    </div>
  );
}
