import React from "react";
import { Link } from "react-router-dom";
import {
  Nav,
  INavLink,
  INavStyles,
  INavLinkGroup,
} from "@fluentui/react/lib/Nav";

import { initializeIcons } from "@fluentui/react";

const Navbar = () => {
  const navStyles: Partial<INavStyles> = {
    root: {
      width: 208,
      height: 900,
      color: 'blue',
      boxSizing: "border-box",
      border: "1px solid #eee",
      overflowY: "auto",
      transition: "width 0.3s",
    },
  };

  const navLinkGroups: INavLinkGroup[] = [
    {
      links: [
        {
          name: "Dashboard",
          url: "/dashboard",
          key: "key7",
          iconProps: {
            iconName: "ViewDashboard",
            styles: {
              root: {
                fontSize: 20,
                color: "#106ebe",
              },
            },
          },
          //target: "_blank",
        },
        {
          name: "Leaves",
          url: "/dashboard/leaves",
          key: "key7",
          iconProps: {
            iconName: "EventDateMissed12",
            styles: {
              root: {
                fontSize: 20,
                color: "#106ebe",
              },
            },
          },
          //target: "_blank",
        },
        {
          name: "Attendance Request",
          url: "/dashboard/attendance-request",
          key: "key7",
          iconProps: {
            iconName: "AddEvent",
            styles: {
              root: {
                fontSize: 20,
                color: "#106ebe",
              },
            },
          },
          //target: "_blank",
        },
        {
          name: "Reports",
          url: "/dashboard/reports",
          key: "key7",
          iconProps: {
            iconName: "ReportAdd",
            styles: {
              root: {
                fontSize: 20,
                color: "#106ebe",
              },
            },
          },
          //target: "_blank",
        },
        {
          name: "Events",
          url: "/dashboard/events",
          key: "key7",
          iconProps: {
            iconName: "SpecialEvent",
            styles: {
              root: {
                fontSize: 20,
                color: "#106ebe",
              },
            },
          },
          //target: "_blank",
        },
        {
          name: "Company policies",
          url: "/dashboard/company-policies",
          key: "key7",
          iconProps: {
            iconName: "AddToShoppingList",
            styles: {
              root: {
                fontSize: 20,
                color: "#106ebe",
              },
            },
          },
          //target: "_blank",
        },
      ],
    },
  ];

  function _onLinkClick(ev?: React.MouseEvent<HTMLElement>, item?: INavLink) {
  }

  initializeIcons();

  return (
    <Nav
      onLinkClick={_onLinkClick}
      selectedKey="key1"
      ariaLabel="Nav basic example"
      styles={navStyles}
      groups={navLinkGroups}
    />
  );
};

export default Navbar;
