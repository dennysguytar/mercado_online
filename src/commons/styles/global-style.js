import { createGlobalStyle } from 'styled-components'

const globalStyle = createGlobalStyle`
  * {
    outline: none;
    box-sizing: border-box;
  }

  body {
    line-height: normal;
  }

  html, body {
    width: 100%;
    min-height: 100%;
    display: flex;
    padding: 0;
    margin: 0;
  }

  #root {
    height: 100%;
    width: 100%;
    background-size: cover;
    background-position: center center;
  }

  .mb-2 {
    margin-bottom: 16px;
  }

  .pt-2 {
    padding-top: 10px;
    display: flex;
  }
  
  .cursor {
    cursor: pointer;
  }

  #painel
  {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  #titulo1 span
  {
    font-size: 2.125rem;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 700;
    line-height: 1.235;
    letter-spacing: 0.00735em;
  }

  #titulo3
  {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  .MuiGrid-grid-md-3 
  {
    min-width: 33% !important;
    
  }

  .MuiGrid-container
  {
    justify-content: center;
  }

  .MuiPaper-rounded 
  {
    border-radius: 30px;
  }

  .MuiPopover-paper
  {
    border-radius: 5px;
  }

  .MuiCardContent-root 
  {  
    border-radius: 30px;
    padding: 4px 30px !important;
  }

  #panel-estado
  {
    margin-top: 20px;
    border-radius: 60px;
    background-color: white;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
  }

  .swiper 
  {
    background-color: white;
    min-height: 260px;
    order-radius: 30px;
    padding: 10px 50px;
  }

  .swiper-slide 
  {
    padding: 15px;
    border: 1px solid rgb(242, 242, 242);
    min-height: 360px;
    //width: 208px !important;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .img-product
  {
    min-width: 0px;
    max-height: 100%;
    height: auto;
    max-width: 100%;
    width: 100%;
  }

  .product {
    min-height: 54px;
  }

  .price 
  {
    bottom: 0px;
    margin: auto 0px 0px;
    min-width: 0px;
    flex-direction: column;
    justify-content: flex-end;
    padding-bottom: 10px;
    min-height: 60px;
    display: flex;
  }

  h3
  {
    margin: 0px
  }
  
`

export default globalStyle