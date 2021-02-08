import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/imgger_admin.svg";
import { FiPower } from "react-icons/fi";

import { Container, Content, Profile } from "./styles";
import { signOut } from "../../store/modules/auth/actions";

export default function HeaderAdm() {
  
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
              <Link to="/galeria">Galeria</Link>
              <Link to="/profile">Usuários</Link>
              <Link to="/upload">Upload</Link>
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
