import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import logo from "../../logo.svg";
import {STOCKS_ROUTE, TOOLS_ROUTE} from "../../util/routes";

export const HomePage = () => {
  const [text, setText] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const text = (await axios.get("/api")).data;
        setText(text);
      } catch {
        setText("ERROR! BACKEND IS DOWN!");
      }
    })();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>{text}</h1>
        <img src={logo as unknown as string} className="App-logo" alt="logo" />
        <section style={{ display: 'flex', gap: '20px' }}>
          <button
            className=""
            onClick={async () => {
              navigate(STOCKS_ROUTE);
            }}
          >
            Stocks
          </button>

          <button
              className="secondary"
              onClick={async () => {
                navigate(TOOLS_ROUTE);
              }}
          >
            Tools
          </button>
        </section>
      </header>
    </div>
  );
};
