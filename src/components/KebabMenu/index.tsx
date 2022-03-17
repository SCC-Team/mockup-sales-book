import React, { useState } from "react";
import useOnClickOutside from "react-cool-onclickoutside";

import './KebabMenu.scss'

interface KebabMenuProps {
  /**
   * items que despliega el menu
   */
  items: string[],
  /**
  * call back cada vez que el clickea un item
  */
  onClick?: (options: any) => void
}

export const KebabMenu = ({ items }: KebabMenuProps) => {
  const [expanded, setExpanded] = useState(false);
  const ref = useOnClickOutside(() => {
    setExpanded(false);
  });

  return (
    <div className="dropdown mt-1" ref={ref} onClick={() => setExpanded((prev) => !prev)} >
      <svg className="mt-0" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 16 16" version="1.1" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
        <circle cx="8" cy="2.5" r=".75" />
        <circle cx="8" cy="8" r=".75" />
        <circle cx="8" cy="13.5" r=".75" />
      </svg>
      {expanded && <div className="dropdown-content">
        {items.map((o, index) => <a key={index} href="#">{o}</a>)}
      </div>
      }
    </div>
  );
};
