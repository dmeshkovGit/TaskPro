import styled from "styled-components";

export const DarkBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${(p) => p.theme.currentTheme.sidebarBackdrop};
  z-index: 998;
`;

export const StyledSidebar = styled.aside`
  width: 225px;
  height: 100vh;
  background-color: ${(p) => p.theme.currentTheme.sidebarBgn};
  z-index: 999;
  position: absolute;
  top: 0;
  left: 0;

  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 768px) {
    width: 260px;
  }

  @media screen and (min-width: 1440px) {
    z-index: 0;
    position: static;
    top: 0;
    left: 0;
  }
`;
