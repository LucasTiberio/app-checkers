import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;500;700&family=Roboto:wght@300;500;700&display=swap');

    * {
        font-family: 'IBM Plex Mono', monospace;
        font-family: 'Roboto', sans-serif;
     
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    p {
        font-weight: 300;
    }
`