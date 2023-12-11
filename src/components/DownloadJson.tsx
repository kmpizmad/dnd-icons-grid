import Button, { ButtonProps } from './Button';
import { groupByCharacterId } from '../utils/groupBy';
import { SpriteValue } from '../interfaces/sprite';

interface IProps extends Omit<ButtonProps, 'color' | 'onClick'> {
  data: SpriteValue[];
  appendWith?: string;
}

export default function DowloadJson({ data, appendWith = '', ...buttonProps }: IProps) {
  return (
    <Button
      {...buttonProps}
      color="primary"
      onClick={() => {
        const group = groupByCharacterId(data);
        const jsonData = Array.from(group)
          .map(([key, value]) => ({ [key]: value }))
          .reduce((prev, curr) => ({ ...prev, ...curr }), {});

        const jsonString = JSON.stringify(jsonData, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });

        const codes: string[] = [];
        group.forEach(values => {
          values.coordinates.forEach(({ x, y }) => {
            codes.push(`One ${values.displayName} at ${x};${y}`);
          });
        });
        codes.push(appendWith);

        navigator.clipboard.writeText(codes.join('\n'));
        alert(codes.join('\n'));

        const link = document.createElement('a');
        link.download = `icons-${new Date().toISOString()}.json`;
        link.href = window.URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }}
    >
      Generate
    </Button>
  );
}
