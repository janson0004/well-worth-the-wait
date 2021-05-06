import { ThemeProvider } from "styled-components/macro";
import { COLOR, GlobalStyle, ResetStyle } from "./components/GlobalStyle";
import Place from "./views/Place";

function App() {
  return (
    <>
      <ThemeProvider theme={COLOR.light}>
        <GlobalStyle />
        <ResetStyle />
        <Place />
      </ThemeProvider>
    </>
  );
}

export default App;
