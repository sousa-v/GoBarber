import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}

body{
  background: #312E38;
  color: #FFF;
}
html{
  font-size: 62.5%;
  -webkit-font-smoothing: antialiased;
}

body, input, button  {
  font: 1.6rem 'Roboto Slab', serif;
}
/*
#root {
  max-width: 96rem;
  margin: 0 auto;
  padding: 4rem 2rem;
} */

button {
  cursor: pointer;
}

h1, h2, h3, h4, h5, h6 , strong {
  font-weight: 500;
}

`;
