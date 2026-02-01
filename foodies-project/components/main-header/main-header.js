import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import MainHeaderBg from "./main-header-bg";
import classes from "./main-header.module.css";
import NavLink from "./nav-link";
export default function MainHeader() {
  return (
    <>
      <MainHeaderBg />
      <header className={classes.header}>
        <Link href="/" className={classes.logo}>
          <Image src={logo} alt="A plate with food on it" loading="eager" />
          NextLevel Food
        </Link>
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href="/meals">Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href="/community">Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
