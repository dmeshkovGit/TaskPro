import Container from "../Container/Container";

import css from "./Layout.module.css";

export default function Layout({ children }) {
  return (
    <div>
      <Container className={css.wrapper}>{children}</Container>
    </div>
  );
}
