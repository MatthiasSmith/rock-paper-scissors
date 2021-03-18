import { createGlobalStyle } from 'styled-components';
import {
  LG_BREAKPOINT,
  LG_CHOICE_SIZE,
  LG_CHOICE_SCALE,
  SM_CHOICE_SIZE,
  BONUS_LG_CHOICE_SCALE,
  BONUS_SM_CHOICE_SCALE,
} from './constants';

const GlobalStyles = createGlobalStyle`
  :root {
    // primary colors
    --scissors-gradient: linear-gradient(to top, hsl(39, 89%, 49%), hsl(40, 84%, 53%));
    --paper-gradient: linear-gradient(to top, hsl(230, 89%, 62%), hsl(230, 89%, 65%));
    --rock-gradient: linear-gradient(to top, hsl(349, 71%, 52%), hsl(349, 70%, 56%));
    --lizard-gradient: linear-gradient(to top, hsl(261, 73%, 60%), hsl(261, 72%, 63%));
    --spock-gradient: linear-gradient(to top, hsl(189, 59%, 53%), hsl(189, 58%, 57%));

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
    --lg-border-radius: 8px;

    // choice chips
    --sm-chip-size: ${SM_CHOICE_SIZE}px;
    --sm-chip-inner-size: ${Math.ceil(SM_CHOICE_SIZE * 0.769)}px;
    --bonus-sm-choice-scale: ${BONUS_SM_CHOICE_SCALE};
    --lg-chip-size: ${LG_CHOICE_SIZE}px;
    --lg-chip-inner-size: ${Math.ceil(LG_CHOICE_SIZE * 0.733)}px;
    --lg-choice-scale: ${LG_CHOICE_SCALE};
    --bonus-lg-choice-scale: ${BONUS_LG_CHOICE_SCALE};
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

  .relative-z-index-1 {
    position: relative;
    z-index: 1;
  }
  
  @media screen and (max-width: ${LG_BREAKPOINT - 1}px) {
    .hidden-sm {
      display: none;
    }
  }

  @media screen and (min-width: ${LG_BREAKPOINT}px) {
    .hidden-gt-sm {
      display: none;
    }
  }
`;

export default GlobalStyles;
