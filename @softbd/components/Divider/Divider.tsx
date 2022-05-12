import React, {FC} from 'react';
interface DividerProps {
  sx?: any;
}
const Divider: FC<DividerProps> = ({sx}) => {
  return <div style={{...sx, borderTop: '1px solid #e9e9e9'}} />;
};

export default Divider;
