import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    // primary colors
    --scissors-gradient: linear-gradient(hsl(39, 89%, 49%), hsl(40, 84%, 53%));
    --paper-gradient: linear-gradient(hsl(230, 89%, 62%), hsl(230, 89%, 65%));
    --rock-gradient: linear-gradient(hsl(349, 71%, 52%), hsl(349, 70%, 56%));
    --lizard-gradient: linear-gradient(hsl(261, 73%, 60%), hsl(261, 72%, 63%));
    --cyan: linear-gradient(hsl(189, 59%, 53%), hsl(189, 58%, 57%));

    // neutral colors
    --dark-text: hsl(229, 25%, 31%);
    --score-text: hsl(229, 64%, 46%);
    --header-outline: hsl(217, 16%, 45%);

    // bg gradient
    --radial-gradient: radial-gradient(hsl(214, 47%, 23%), hsl(237, 49%, 15%));
  }

  html {
    font-family: 'Barlow Semi Condensed', sans-serif;
    font-size: 16px;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    min-height: 100vh;
    text-rendering: optimizelegibility;
  }

  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default GlobalStyles;
