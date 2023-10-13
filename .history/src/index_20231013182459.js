import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { DarkModeProvider } from "./context/themeContext";
import { BsTwitter } from "react-icons/bs";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DarkModeProvider>
      <div className=" bg-slate-100 dark:bg-slate-900 text-black dark:text-white">
        <App />
        <footer className=" text-center">
          <span style={{ fontFamily: "Kalam" }}>Made with</span>
          {"\u2764"} <span style={{ fontFamily: "Kalam" }}>by </span>
          <a href="https://twitter.com/Fideltodayy" target="blank">
            Fideltodayy
          </a>
          <BsTwitter />
        </footer>
      </div>
    </DarkModeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
