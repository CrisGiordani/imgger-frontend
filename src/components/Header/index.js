import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/logo.svg";
import { FiPower } from "react-icons/fi";

import { Container, Content, Profile } from "./styles";
import { signOut } from "../../store/modules/auth/actions";

export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="imgger" />
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{user.name}</strong>
              <Link to="/profile">Perfil</Link>
            </div>
            <button type="button" onClick={handleLogout}>
              <FiPower size={15} color="#4A90E2" />
            </button>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
