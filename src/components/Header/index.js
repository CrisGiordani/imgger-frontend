import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import logo from "../../assets/logo.svg";
import logoAdm from "../../assets/imgger_admin.svg";
import { FiPower } from "react-icons/fi";

import { Container, Content, Profile } from "./styles";
import { signOut } from "../../store/modules/auth/actions";

export default function Header() {
  
  const dispatch = useDispatch();

  const [id] = useState(localStorage.getItem('apiUserId'));
  const [userAdmin, setUserAdmin] = useState(false);
  
  useEffect(()=> {
    if (localStorage.getItem('apiUserAdmin') === "0") { setUserAdmin(false); };
    if (localStorage.getItem('apiUserAdmin') === "1") { setUserAdmin(true); };
  }, [])
  
  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <>
      { 
      userAdmin 
      ? (
        <Container style={{background: '#4A90E2'}}>
          <Content>
            <nav>
              <Link to="/home"><img src={logoAdm} alt="imgger" /></Link>
            </nav>

            <aside>
              <Profile>
                <div>
                  <Link style={{ color: '#FFF'}} to={"/home"}>Home</Link>
                  <Link style={{ color: '#FFF'}} to={`/galeria/${id}`}>Galeria</Link>
                  <Link style={{ color: '#FFF'}} to="/upload">Upload</Link>
                  <Link style={{ color: '#FFF'}} to="/profile">Perfl</Link>
                  <Link style={{ color: '#FFF'}} to="/admin/users">[ Usuários ]</Link>
                </div>
                <button type="button" style={{ padding: '4px' }} onClick={handleLogout}>
                  <FiPower size={15} color="#4A90E2" />
                </button>
                
              </Profile>
            </aside>
          </Content>
        </Container>

      ) : ( 
        
        <Container style={{background: '#e1e1e1'}}>
          <Content>
            <nav>
              <Link to="/home"><img src={logo} alt="imgger" /></Link>
            </nav>

            <aside>
              <Profile>
                <div>
                  <Link style={{ color: '#666'}} to={"/home"}>Home</Link>
                  <Link style={{ color: '#666'}} to={`/galeria/${id}`}>Galeria</Link>
                  <Link style={{ color: '#666'}} to="/profile">Perfil</Link>
                  <Link style={{ color: '#666'}} to="/upload">Upload</Link>
                </div>
                <button type="button" style={{ padding: '4px' }} onClick={handleLogout}>
                  <FiPower size={15} color="#4A90E2" />
                </button>
              </Profile>
            </aside>
          </Content>
        </Container>
      )}
  </>
  );
}
