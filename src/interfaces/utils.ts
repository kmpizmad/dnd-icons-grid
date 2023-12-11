import { StaticImageData } from 'next/image';

export type Prettify<T extends Record<string, unknown>> = {
  [K in keyof T]: T[K];
  // eslint-disable-next-line @typescript-eslint/ban-types
} & {};

export type IconMap = {
  [x: string]: {
    displayName: string;
    image: StaticImageData;
  };
};
