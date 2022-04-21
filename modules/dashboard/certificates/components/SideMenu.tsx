import React from 'react';

interface Props {
  children: React.ReactNode;
}

function SideMenu({children}: Props) {
  return (
    <div className='side-panel-tabs'>
      <div className='side-tabs-container'>{children}</div>
    </div>
  );
}
export default SideMenu;
