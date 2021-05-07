import { createGlobalStyle } from "styled-components/macro";

export const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    -ms-overflow-style: scrollbar;    
  }

  html, body, #root {
    width: 100%;
    height: 100%;
  }
  
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  body {
    font-family: "Roboto", "Open Sans", sans-serif;
    -webkit-font-smoothing: antialiased;
  }
`;

export const MEDIA_BREAK = {
  md: "767.98px",
  lg: "991.98px",
};
export const COLOR = {
  // Dark mode
  dark: {},
  // Light mode
  light: {
    mono: {
      primary: "#000000",
      secondary: "#787878",
      tinted: "#4B4B4B",
      contrast: "#FFFFFF",
    },
    bg: {
      main: "#F8FAFB",
      tinted: "#FFFFFF",
      shaded: "#EFF0F1",
    },
    divider: {
      main: "#CCCCCC",
    },
    theme: {
      main: "#7D68FF",
    },
  },
};

export const ResetStyle = createGlobalStyle`
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}

body {
  line-height: 1;
  -webkit-font-smoothing: antialiased;
}

ol,
ul {
  list-style: none;
}

blockquote,
q {
  quotes: none;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

input {
  -webkit-appearance: none;
}

a[href^="tel"] {
  text-decoration: inherit;
  color: inherit;
}

* {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -moz-tap-hightlight-color: rgba(0, 0, 0, 0);
}

`;
