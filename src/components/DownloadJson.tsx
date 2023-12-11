import { SpriteValue } from '../interfaces/sprite';
import Button, { ButtonProps } from './Button';

let xVal = 0;
let zVal = 0;
let xVal2 = 0;
let zVal2 = 0;
let codeToWrite = '';

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
          const newCoordinate = { x: value.y, y: value.x };
          xVal = value.y;
          zVal = value.x;
          xVal2 = value.y;
          zVal2 = value.x;

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

        // Parse the JSON data
        const dataLua = jsonData;

        // Check if "box" key is present
        if ('joystick' in dataLua) {
          // Code to be written to the text file
          codeToWrite += 'One Joystick at' + xVal + zVal;
        }

        if ('puzzle' in dataLua) {
          codeToWrite += 'One Puzzle at' + xVal + zVal;
        }

        // Write the code to a text file
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        navigator.clipboard.writeText(codeToWrite);
        alert(codeToWrite);

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
