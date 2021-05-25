
import React from "react";
import "./header.css"
function Header() {
    const menus = [
        {name:"Home",src:"/home"},
        {name:"documention",src:"/document"},
        {name:"about",src:""},
        {name:"api",src:""}
    ];
    const menuItems = menus.map((m) =>
      <li className="menu" key={m.name}>
        <a href={m.src}>{m.name}</a>
      </li>
    );
    return (
      <ul className="headerContainer">{menuItems}</ul>
    );
}
export default Header;