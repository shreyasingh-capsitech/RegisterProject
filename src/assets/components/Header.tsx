import { ContextualMenu, FontIcon, IContextualMenuItem, mergeStyles, Stack } from '@fluentui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'

const Header = () => {
  const [showContextualMenu, setShowContextualMenu] = React.useState(false);
  const linkRef = React.useRef(null);
  const navigate = useNavigate();
  const { name } = useAuth();
  
  const onShowContextualMenu = React.useCallback((ev: React.MouseEvent<HTMLElement>) => {
    ev.preventDefault(); // don't navigate
    setShowContextualMenu(true);
  }, []);
  const onHideContextualMenu = React.useCallback(() => setShowContextualMenu(false), []);

  const menuItems: IContextualMenuItem[] = [
    {
      key: 'Log Out',
      text: 'Log Out',
      iconProps: {iconName: 'SignOut', styles: {root: {color: 'red'}}},
      onClick: () => navigate('/login'),
    }
  ];

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
    paddingRight: 10,
    cursor: 'pointer',
  };

  const iconStyles: React.CSSProperties = {
    alignItems: 'center',
    display: 'flex',
    height: 50,
    justifyContent: 'center',
    width: 20,
    paddingRight: 5,
    cursor: 'pointer',
  };

  return (
    <div className='Header' style={{backgroundColor: '#006BFF', height: 50, width: 1450, color: '#FFFFFF'}}>
      <Stack horizontal horizontalAlign='end'>
        <span ref={linkRef} style={iconStyles}><FontIcon aria-label="UserFollowed" iconName="UserFollowed" className={iconClass} onClick={onShowContextualMenu} /></span>
        <span ref={linkRef} style={itemStyles} onClick={onShowContextualMenu}>{name}</span>
      </Stack>
      <ContextualMenu
          items={menuItems}
          hidden={!showContextualMenu}
          target={linkRef}
          onItemClick={onHideContextualMenu}
          onDismiss={onHideContextualMenu}
      />
    </div>
    
  );
};

export default Header
