import React from 'react';
import './SubBanner.css';

// @ts-ignore
import Screencap from '../../../img/sample-photo.png';

const SubBanner = () => (
  <div className="subBanner-wrapper">
    <h2 className="subBanner-h2">The Quick Start</h2>
    <div className="quick-start-cards">
      <div className="start-card">
        <i className="fas fa-user-plus"></i>
        <p>
          Sign up for free with your email and password, enjoy unlimted note
          storage
        </p>
      </div>
      <div className="start-card">
        <i className="fas fa-feather-alt"></i>
        <p>
          Easily customize rich-text notes, save and update with single a single
          click
        </p>
      </div>
      <div className="start-card">
        <i className="fas fa-folder-open"></i>
        <p>
          Organize your notes into notebooks for a neater, more accessible
          collection
        </p>
      </div>
    </div>
    <div className="screencap-wrapper">
      <img
        className="screencap"
        src={Screencap}
        alt="dashboard-screencap-sample"
      />
      <div className="text-box">
        <h4>
          “I go through dozens of notebooks every year and write down everything
          that occurs to me each day, an idea not written down is an idea lost.
          When inspiration calls, you’ve got to capture it.” –{' '}
          <span>Richard Branson</span>
        </h4>
      </div>
    </div>
    <div className="newsletter-social-wrapper">
      <div className="social-wrapper">
        <i className="fab fa-facebook-f"></i>
        <i className="fab fa-instagram"></i>
        <i className="fab fa-twitter"></i>
      </div>
      <div className="newsletter-wrapper">
        <h2>Sign for our monthly newsletter</h2>
        <p>Except not really because there is no actual newsletter</p>
        <div className="input-wrapper">
          <button>Sign Up</button>
          <input placeholder="Your Email Address" />
        </div>
      </div>
    </div>
    <div className="footer">
      <ul>
        <li>Additional</li>
        <li>Options Here</li>
        <li>Merely</li>
        <li>Serving</li>
        <li>As Aesthetic</li>
      </ul>
      <div className="footer-sentence">
        <p>
          Take note was built by Spencer Kenealy in order to gain experience in
          the MERN stack ©2020
        </p>
      </div>
    </div>
  </div>
);

export default SubBanner;
