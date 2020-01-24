import Link from "next/link"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import styled from 'styled-components'

const StyledHeader = styled.header`
  border-bottom: 2px solid black;
`

const StyledNavbar = styled.header`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
`

export default function Header({ user }) {
  return (
    <StyledHeader>
        <StyledNavbar>
          <Link href="/">
            <a>Main page</a>
          </Link>
          <Link href="/about">
            <a className="nav-link">About</a>
          </Link>
          {user && (
            <>
              <Link href="/study/my">
                <a className="nav-link">Studies</a>
              </Link>
              <Link href="/record">
                <a className="nav-link">Record</a>
              </Link>
              <Link href="/profile">
                <a className="nav-link">Profile</a>
              </Link>
              <Link href="/logout">
                <a className="nav-link">Log out</a>
              </Link>
            </>
          )}
          {!user && (
            <>
              <Link href="/sign">
                <a className="nav-link">Sign up</a>
              </Link>
              <Link href="/login">
                <a className="nav-link">Login</a>
              </Link>
            </>
          )}
        </StyledNavbar>
    </StyledHeader>
  );
}
