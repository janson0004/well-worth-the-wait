import { ThemeProvider } from "styled-components/macro";
import { COLOR, GlobalStyle, ResetStyle } from "./components/GlobalStyle";

function App() {
  return (
    <>
      <ThemeProvider theme={COLOR.light}>
        <GlobalStyle />
        <ResetStyle />
      </ThemeProvider>
    </>
  );
}

export default App;
