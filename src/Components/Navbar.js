import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

import Logo from "../assets/img/logo-pegueleve.png";
import { FaBoxes } from "react-icons/fa";
import { IoPersonAdd } from "react-icons/io5";
import { RiChatNewFill } from "react-icons/ri";

export default function Navbar(props) {
  return (
    <header>
      <img src={Logo} alt="logo" />
      <nav>
        <NavLink to="/signup">
          <IoPersonAdd />
        </NavLink>
        <NavLink to={`/${props.user}/products`}>
          <FaBoxes />
        </NavLink>
        <NavLink to={`/${props.user}/newProduct`}>
          <RiChatNewFill />
        </NavLink>
      </nav>
    </header>
  );
}
