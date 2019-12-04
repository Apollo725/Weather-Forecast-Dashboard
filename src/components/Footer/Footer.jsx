import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
  render() {
    return (
      <footer
        className={'footer' + (this.props.transparent !== undefined ? ' footer-transparent' : '')}
      >
        <div className={'container' + (this.props.fluid !== undefined ? '-fluid' : '')}>
          <nav className="pull-left">
            <ul>
              <li>
                <a href="#pablo">Home</a>
              </li>
              <li>
                <Link to="/about_us">AboutUs</Link>
              </li>
              <li>
                <Link to="/services">Services</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
            </ul>
          </nav>
          <p className="copyright pull-right">
            &copy; {1900 + new Date().getYear()}{' '}
            <a href="https://www.creative-tim.com">Apollo725</a>, made with{' '}
            <i className="fa fa-heart heart" /> for a Weather Web
          </p>
        </div>
      </footer>
    );
  }
}
export default Footer;
