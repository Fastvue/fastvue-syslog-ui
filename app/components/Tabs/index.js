import React from 'react';
import PropTypes from 'prop-types';
import { NavItem, Nav, NavLink } from 'reactstrap';
import './style.scss';

const Tabs = (props) => (
  <Nav tabs>
    {props.tabs.map((tab) => (
      <NavItem key={tab.id}>
        <NavLink
          className={props.activeTab === tab.id ? 'active' : null}
          onClick={() => {
            props.onActiveTabChange(tab.id);
          }}
        >
          {tab.title}
        </NavLink>
      </NavItem>
    ))}
  </Nav>
);

Tabs.propTypes = {
  tabs: PropTypes.array,
  activeTab: PropTypes.string,
  onActiveTabChange: PropTypes.func
};

export default Tabs;
