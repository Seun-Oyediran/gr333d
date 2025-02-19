import React from "react";
import { Logo, Music } from "../svgs/icon";

export function Content() {
  return (
    <div className="app_ui_content">
      <div className="app_ui_content__header">
        <Logo />

        <Music />
      </div>

      <div className="app_ui_content__footer">
        <div></div>
        <div className="app_ui_content__footer__authors">
          <p className="app_ui_content__footer__authors__text">
            making the web fun again.{" "}
          </p>
          <div className="app_ui_content__footer__authors__links">
            <a
              href="https://x.com/shawn_kel"
              target="_blank"
              className="app_ui_content__footer__authors__links__text"
            >
              SEUN OYEDIRAN
            </a>
            <a
              href="https://x.com/Gravetwit"
              target="_blank"
              className="app_ui_content__footer__authors__links__text"
            >
              JASON UDI
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
