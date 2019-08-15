/* eslint-env browser */
import React, { Fragment } from 'react';

import DemoIFrame from './DemoIFrame';
import DemoLink from './DemoLink';
import DemoView from './DemoView';
import GitHubLink from './GitHubLink';
import Header from './Header';
import Headline from './Headline';
import Logo from './Logo';
import MainLayout from './MainLayout';
import SideNav from './SideNav';
import SideNavContent from './SideNavContent';
import SideNavHamburger from './SideNavHamburger';
import SideNavShadow from './SideNavShadow';
import Title from './Title';

import DEMOS from './demos';

import { BREAKPOINT_SHOW_HAMBURGER } from './constants';

class AppShell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDemo: null,
      demoUrl: null,
      demoSourceUrl: null,
      isSideNavCollapsed: true,
    };
  }

  runDemo(selectedDemo, demoUrl, demoSourceUrl) {
    this.toggleSideNav(true);

    const switchDemo = () => this.setState({
      selectedDemo,
      demoUrl,
      demoSourceUrl,
    });

    if (window.innerWidth < BREAKPOINT_SHOW_HAMBURGER) {
      setTimeout(switchDemo, 200);
    } else {
      switchDemo();
    }
  }

  toggleSideNav(collapse) {
    if (typeof collapse === 'boolean') {
      this.setState({ isSideNavCollapsed: collapse });
    } else {
      this.setState(currentState => ({ isSideNavCollapsed: !currentState.isSideNavCollapsed }));
    }
  }

  render() {
    return (
      <MainLayout>
        <SideNavShadow show={!this.state.isSideNavCollapsed} onClick={() => this.toggleSideNav(true)} />
        <SideNav collapsed={this.state.isSideNavCollapsed}>
          <Header>
            <Logo src="/images/picimo-logo-original.png" alt="picimo" />
            <Title>/ examples</Title>
          </Header>
          <SideNavContent>
            {DEMOS.map(({ section, demos }) => (
              <Fragment key={section}>
                <Headline>{section}</Headline>
                {demos.map(({ title, url, sourceUrl }) => (
                  <DemoLink
                    key={title}
                    url={url}
                    active={this.state.selectedDemo === title}
                    onClick={() => this.runDemo(title, url, sourceUrl)}
                  >
                    {title}
                  </DemoLink>
                ))}
              </Fragment>
            ))}
          </SideNavContent>
          <SideNavHamburger active={!this.state.isSideNavCollapsed} onClick={() => this.toggleSideNav()} />
        </SideNav>
        <DemoView>
          {this.state.demoUrl && (
            <Fragment>
              <DemoIFrame
                title={this.state.selectedDemo}
                src={this.state.demoUrl}
                scrolling="no"
                frameborder="0"
              />
              <GitHubLink href={this.state.demoSourceUrl} target="_blank" />
            </Fragment>
          )}
        </DemoView>
      </MainLayout>
    );
  }
}

export default AppShell;
