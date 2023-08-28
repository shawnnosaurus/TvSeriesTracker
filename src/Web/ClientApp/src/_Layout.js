import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './components/NavMenu';
import './_Layout.css';

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <NavMenu />
        <Container tag="main">
          {this.props.children}
        </Container>
      </div>
    );
  }
}