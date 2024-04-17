import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
//import logo
import logoSm from '../assets/images/logo-sm.png';
import logoDark from '../assets/images/logo-dark.png';
import logoLight from '../assets/images/logo-light.png';

import logo from '../assets/images/logos/logo-light.png';

//Import Components
import VerticalLayout from './VerticalLayouts/index';
import TwoColumnLayout from './TwoColumnLayout';
import { Container } from 'reactstrap';
import HorizontalLayout from './HorizontalLayout';
import { layoutModeTypes } from '../Components/constants/layout';
import { useSelector } from 'react-redux';

const Sidebar = ({ layoutType }) => {
  // useEffect(() => {
  //   var verticalOverlay = document.getElementsByClassName('vertical-overlay');
  //   if (verticalOverlay) {
  //     verticalOverlay[0].addEventListener('click', function () {
  //       document.body?.classList?.remove('vertical-sidebar-enable');
  //     });
  //   }
  // });

  const { layoutModeType } = useSelector((state) => ({
    layoutModeType: state.Layout.layoutModeType,
  }));

  const addEventListenerOnSmHoverMenu = () => {
    if (
      document.documentElement.getAttribute('data-sidebar-size') === 'sm-hover'
    ) {
      document.documentElement.setAttribute(
        'data-sidebar-size',
        'sm-hover-active',
      );
    } else if (
      document.documentElement.getAttribute('data-sidebar-size') ===
      'sm-hover-active'
    ) {
      document.documentElement.setAttribute('data-sidebar-size', 'sm-hover');
    } else {
      document.documentElement.setAttribute('data-sidebar-size', 'sm-hover');
    }
  };
  return (
    <React.Fragment>
      <div
        className="app-menu navbar-menu"
        style={{
          backgroundColor:
            layoutModeType === layoutModeTypes['DARKMODE']
              ? '#16161a'
              : '#4A5056',
        }}
        // style={{
        //   background: '#23282C',
        // }}
      >
        <div className="navbar-brand-box ">
          <div className="logo logo-dark">
            <span className="logo-sm">
              <img src={logo} alt="" height="20" width="63" />
            </span>
            <span className="logo-lg">
              <img src={logo} alt="" height="25" />
            </span>
          </div>

          <div className="logo logo-light">
            <span className="logo-sm">
              <img src={logo} alt="" height="26" />
            </span>
            <span className="logo-lg">
              <img src={logo} alt="" height="26" />
            </span>
          </div>
          <button
            onClick={addEventListenerOnSmHoverMenu}
            type="button"
            className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
            id="vertical-hover"
          >
            <i className="ri-record-circle-line"></i>
          </button>
        </div>
        {layoutType === 'horizontal' ? (
          <div id="scrollbar">
            <Container fluid>
              <div id="two-column-menu"></div>
              <ul className="navbar-nav" id="navbar-nav">
                <HorizontalLayout />
              </ul>
            </Container>
          </div>
        ) : layoutType === 'twocolumn' ? (
          <React.Fragment>
            <TwoColumnLayout />
            <div className="sidebar-background"></div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <SimpleBar id="scrollbar" className="h-100 ">
              <Container fluid>
                <div id="two-column-menu"></div>
                <ul className="navbar-nav" id="navbar-nav">
                  <VerticalLayout layoutType={layoutType} />
                </ul>
              </Container>
            </SimpleBar>
            <div className="sidebar-background"></div>
          </React.Fragment>
        )}
      </div>
      <div className="vertical-overlay"></div>
    </React.Fragment>
  );
};

export default Sidebar;
