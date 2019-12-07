import Link from "next/link"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import styled from 'styled-components'

const StyledHeader = styled.header`
  border-bottom: 2px solid black;
`

export default function Header({ user }) {
  return (
    <StyledHeader>
        <Navbar.Brand>
          <Link href="/">
            <a>Main page</a>
          </Link>
          <Link href="/about">
            <a className="nav-link">About</a>
          </Link>
        </Navbar.Brand>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            {user && (
              <>
                <Link href="/profile">
                  <a className="nav-link">Profile</a>
                </Link>
                <Link href="/logout">
                  <a className="nav-link">Log out</a>
                </Link>
              </>
            )}
            {!user && (
              <Link href="/login">
                <a className="nav-link">Login</a>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
    </StyledHeader>
  );
}
