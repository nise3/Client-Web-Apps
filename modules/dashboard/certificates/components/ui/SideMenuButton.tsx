import React from 'react';

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon?: React.ComponentType<{className?: string}>;
  selected?: boolean;
  onClickHandler: React.MouseEventHandler<HTMLButtonElement>;
}

function SideMenuButton({
  icon: Icon,
  children,
  selected,
  disabled,
  onClick,
  className,
  onClickHandler,
  ...rest
}: Props) {
  return (
    <button onClick={onClickHandler}>
      <div className={`side-panel-tab ${selected ? 'active' : ''} `}>
        {Icon && <Icon />}
        <div>{children}</div>
      </div>
    </button>
  );
}

export default SideMenuButton;
