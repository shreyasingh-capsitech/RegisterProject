import { FontIcon, mergeStyles, Stack } from '@fluentui/react'
import React from 'react'

const Header = () => {

  const iconClass = mergeStyles({
    height: 20,
    width: 20,
  });

  const itemStyles: React.CSSProperties = {
    alignItems: 'center',
    display: 'flex',
    height: 50,
    justifyContent: 'center',
    width: 50,
    paddingRight: 5
  };

  return (
    <div className='Header' style={{backgroundColor: '#006BFF', height: 50, width: 1450, color: '#FFFFFF'}}>
      <Stack horizontal horizontalAlign='end'>
        <span style={itemStyles}><FontIcon aria-label="UserFollowed" iconName="UserFollowed" className={iconClass} /></span>
        <span style={itemStyles}>Shreya</span>
      </Stack>
    </div>
  );
};

export default Header
