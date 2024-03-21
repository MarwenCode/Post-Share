import React from "react";
import "./socials.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faNewspaper,
  faTv,
  faFlag,
  faStore,
  faGamepad,
} from "@fortawesome/free-solid-svg-icons";

const Socials = ({ isDarkTheme }) => {
  return (
    <div className={`socials ${isDarkTheme ? "dark" : ""}`}>
      <ul className="socials-list">
        <li>
          <span>
            
            <FontAwesomeIcon icon={faNewspaper} />
          </span>

          <p>News</p>
        </li>
        <li>
          <span>
            
            <FontAwesomeIcon icon={faTv} />
          </span>

          <p>Watch</p>
        </li>
        <li>
          <span>
          
            <FontAwesomeIcon icon={faFlag} />
          </span>

          <p>Pages</p>
        </li>
        <li>
          <span>
            
            <FontAwesomeIcon icon={faStore} />
          </span>

          <p>Market</p>
        </li>
        <li>
          <span>
          
            <FontAwesomeIcon icon={faGamepad} />
          </span>

          <p>Gaming</p>
        </li>
      </ul>
    </div>
  );
};

export default Socials;
