import {createGlobalStyle} from 'styled-components';
import Colors from './colors';
import Inter from '/fonts/Inter.woff2';

const {
  success100,
  error100,
  warning100,
  work100,
} = Colors;

export const OverrideStyles = createGlobalStyle`
  // ------------ Inter Variable font ------------ //
  @font-face {
    font-family: 'Inter';
    src: url(${Inter}) format('woff2');
    font-weight: 400 700;
    font-style: normal;
    font-display: swap;
  }
  
  *, *::before, *::after {
    box-sizing: border-box;
  }
  
  html {
    font-size: 14px;

    @media (min-width: 1921px) {
      font-size: 18px;
    }
  }
  
  body {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    margin: 0;
    padding: 0;
  }
  
  // ------------- BaseNotification ------------- //
  .Toastify {
    &__toast {
      padding: 0 0.5rem 0.275rem 0.5rem !important;
      width: 25rem;
      white-space: pre-line;

      svg:nth-child(2) {
        position: absolute;
        right: 10px;
        top: 5px;
        width: 1.25rem;
        height: 1.25rem;
        cursor: pointer;
      }

      &-body {
        background: rgb(255, 255, 255) !important;
        padding: 0.75rem 2.5rem 1.5rem 1rem !important;
      }

      &-container--top-right {
        top: 0.8em !important;
        right: 6em !important;
      }

      &-icon {
        margin-right: 1rem;
      }
    }

    .Toastify__progress-bar--bg {
      opacity: 0;
    }

    .Toastify__progress-bar--success {
      background-color: ${success100};
    }

    .Toastify__progress-bar--error {
      background-color: ${error100};
    }

    .Toastify__progress-bar--warning {
      background-color: ${warning100};
    }

    .Toastify__progress-bar--info {
      background-color: ${work100};
    }

    .Toastify__toast--success {
      --toastify-icon-color-success: ${success100};
    }

    .Toastify__toast--error {
      --toastify-icon-color-error: ${error100};
    }

    .Toastify__toast--warning {
      --toastify-icon-color-warning: ${warning100};
    }

    .Toastify__toast--info {
      --toastify-icon-color-info: ${work100};
    }
  }

  // ------------- Animations ------------- //
  @keyframes bounce {
    0%, 75%, 100% {
      transform: translateY(0);
    }

    25% {
      transform: translateY(-6px);
    }
  }
`;
