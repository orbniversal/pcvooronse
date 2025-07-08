"use client";
import { useEffect } from 'react';
import app from "./app.module.css";
import window_ from "./css/window.module.css";

export default function Home() {
  useEffect(() => {
    window.app = app;
    window.window_ = window_;
    const firebase = document.createElement('script');
    firebase.src = './firebase/app.js';
    firebase.onload = function () {
      const app_ = document.createElement('script');
      app_.src = './app.js';
      app_.onload = function () {
      };
      document.head.appendChild(app_);
    };
    document.head.appendChild(firebase);

  }, []);
  return (<div id="app" className={app.body}></div>
  );
}