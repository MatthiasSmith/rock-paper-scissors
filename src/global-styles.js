import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    // primary colors
    --scissors-gradient: linear-gradient(to top, hsl(39, 89%, 49%), hsl(40, 84%, 53%));
    --paper-gradient: linear-gradient(to top, hsl(230, 89%, 62%), hsl(230, 89%, 65%));
    --rock-gradient: linear-gradient(to top, hsl(349, 71%, 52%), hsl(349, 70%, 56%));
    --lizard-gradient: linear-gradient(to top, hsl(261, 73%, 60%), hsl(261, 72%, 63%));
    --cyan: linear-gradient(to top, hsl(189, 59%, 53%), hsl(189, 58%, 57%));

    // neutral colors
    --dark-text: hsl(229, 25%, 31%);
    --score-text: hsl(229, 64%, 46%);
    --header-outline: hsl(217, 16%, 45%);

    // bg gradient
    --bg-radial-gradient: radial-gradient(circle at top, hsl(214, 47%, 23%), hsl(237, 49%, 15%));

    // fonts
    --font-family: 'Barlow Semi Condensed', sans-serif;
    --font-weight-bold: 700;
    --font-weight-semi-bold: 600;

    --border-radius: 6px;
    --desktop-border-radius: 8px;

    // chips
    --sm-chip-size: 130px;
    --sm-chip-inner-size: 100px;
    --lg-chip-size: 300px;
    --lg-chip-inner-size: 220px;
  }

  html {
    color: white;
    font-family: var(--font-family);
    font-size: 16px;
    height: -webkit-fill-available;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    display: flex;
    flex-flow: column;
    min-height: 100vh;
    min-height: -webkit-fill-available;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  main {
    background: var(--bg-radial-gradient);
    display: flex;
    flex: 1;
    flex-flow: column;
    align-items: center;
    padding: 0 1.75rem;
    text-transform: uppercase;
  }

  .container {
    width: 100%;
  }

  // layout
  .flex-row {
    display: flex;
  }

  .flex-column {
    display: flex;
    flex-flow: column;
  }

  .flex-1 {
    flex: 1;
  }

  .space-between {
    justify-content: space-between;
  }

  .justify-center {
    justify-content: center;
  }

  .align-center {
    align-items: center;
  }

  // typography
  .text-center {
    text-align: center;
  }

  .text-uppercase {
    text-transform: uppercase;
  }

  // utility
  .sr-only:not(:focus):not(:active) {
    clip: rect(0 0 0 0); 
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap; 
    width: 1px;
  }

  .fade-in {
    opacity: 0;
  }
  
  @media screen and (max-width: 1023px) {
    .hidden-sm {
      display: none;
    }
  }

  @media screen and (min-width: 1024px) {
    .hidden-gt-sm {
      display: none;
    }
  }
`;

export default GlobalStyles;
