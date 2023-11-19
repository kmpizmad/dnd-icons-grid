import { SpriteValue } from '../interfaces/sprite';
import Button, { ButtonProps } from './Button';

interface IProps extends Omit<ButtonProps, 'color' | 'onClick'> {
  data: SpriteValue[];
}

export default function DowloadJson({ data, ...buttonProps }: IProps) {
  return (
    <Button
      {...buttonProps}
      color="primary"
      onClick={() => {
        const group = new Map<string, { x: number; y: number }[]>();
        data.forEach(value => {
          const newCoordinate = { x: value.x, y: value.y };
          if (group.has(value.characterId)) {
            const current = group.get(value.characterId);
            if (current) group.set(value.characterId, [...current, newCoordinate]);
          } else {
            group.set(value.characterId, [newCoordinate]);
          }
        });

        const jsonData = Array.from(group)
          .map(([key, value]) => ({ [key]: value }))
          .reduce((prev, curr) => ({ ...prev, ...curr }), {});

        const jsonString = JSON.stringify(jsonData, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const link = document.createElement('a');
        link.download = `icons-${new Date().toISOString()}.json`;
        link.href = window.URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }}
    >
      Calculate
    </Button>
  );
}
