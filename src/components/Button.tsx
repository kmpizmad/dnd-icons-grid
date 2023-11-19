import { PropsWithChildren, DetailedHTMLProps, ButtonHTMLAttributes, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'classnames';

interface IProps
  extends PropsWithChildren<unknown>,
    DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  color: 'primary' | 'neutral';
}

export default function Button({ color, children, className, type = 'button', ...props }: IProps) {
  const colors = useMemo(() => {
    return {
      primary: 'bg-green-400 hover:bg-green-500 border-green-500 hover:border-green-600',
      neutral: 'bg-slate-300 hover:bg-slate-400 border-slate-400 hover:border-slate-500',
    };
  }, []);

  return (
    <button
      className={twMerge(clsx('py-1 px-3 border rounded transition-all', colors[color]), className)}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

export type ButtonProps = IProps;
