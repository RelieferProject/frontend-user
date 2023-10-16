import React from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import styled from 'styled-components';

const colorMap = {
  primary: 'background: linear-gradient(90deg, #5364c9 0%, #64479c 100%);',
  secondary: 'background: linear-gradient(90deg, #a200ff 0%, #ff7c6e 100%);',
  yellow: 'background: linear-gradient(90deg, #f9d423 0%, #ff4e50 100%);',
};

const ButtonStyledWrapper = styled.div<{ theme: string; disabled: boolean }>`
  position: relative;

  * {
    color: white;
    font-size: 1.2rem;
  }

  ${({ theme, disabled }) => {
    return !disabled
      ? colorMap[theme]
        ? colorMap[theme]
        : colorMap.primary
      : 'background-color: #829aa6;';
  }}

  overflow: hidden;
  transition: all 0.3s ease-in-out;
  :hover {
    * {
      transition: all 0.3s ease-in-out;
      ${({ disabled }) => {
        return !disabled ? 'color: #000000;' : '';
      }}
    }
    .overlay {
      ${({ theme }) => {
        return theme === 'secondary' ? 'transform: translateY(0);' : 'transform: translateX(0);';
      }}
    }
  }
  button {
    padding: 0.4rem 0.4rem;
    position: relative;
  }
  .overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    transition: all 0.3s ease-in-out;
    transform: translateY(100%);
    ${({ theme, disabled }) => {
      // console.log('theme', theme);
      return !disabled
        ? colorMap[theme]
          ? colorMap[theme]
          : colorMap.primary
        : 'background-color: transparent;';
    }}
    ${({ theme }) => {
      return theme === 'secondary'
        ? 'transform: translateY(101%);'
        : 'transform: translateX(-101%);';
    }}
  }
`;

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  style?: React.CSSProperties;
  onClick?: (e: any) => any;
  children: React.ReactNode;
  disabled?: boolean;
  tone?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  loading?: any;
  color?: 'primary' | 'secondary' | string;
}

function ButtonStyled({
  className,
  disabled,
  onClick,
  style,
  color,
  children,
  type,
  loading,
  ...others
}: Props) {
  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      console.log('enter press here! ');
    }
  };

  return (
    <ButtonStyledWrapper
      className={'w-full text-xl relative rounded-lg overflow-hidden cursor-pointer font-bold'}
      theme={color}
      style={style}
      disabled={disabled || loading}
    >
      <div className="overlay"></div>
      <button
        onClick={onClick}
        className={className || ''}
        disabled={disabled || loading}
        type={type}
        {...others}
      >
        {loading ? <AiOutlineLoading className="animate-spin mx-auto" /> : children}
      </button>
    </ButtonStyledWrapper>
  );
}

export default ButtonStyled;
