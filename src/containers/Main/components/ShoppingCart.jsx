import React, { memo, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import {Drawer, Icon, IconButton} from '@mui/material';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Box, styled } from '@mui/system'
import { H6, Small } from '../../../components/Typography'

function ShoppingCart({openShoppingCart, cartList, addCart, removeCart, removeAll}) 
{
  //console.log('openShoppingCart: ' + JSON.stringify(openShoppingCart));
  //console.log('cartList: ' + JSON.stringify(cartList));

  const [open, setOpen] = React.useState(openShoppingCart);
  const [totalCost, setTotalCost] = useState(0);

  const handleClose = () => 
  {
    setOpen(false);
  };

  const StyledIconButton = styled(IconButton)(({ theme }) => ({
      '& span': {
          color: 'primary',
      },
      '& #disable': {
          color: 'disabled',
      },
  }))

  const MiniCart = styled('div')(({ theme }) => ({
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      width: '280px',
  }))

  const CartBox = styled('div')(() => ({
      padding: '4px',
      paddingLeft: '16px',
      display: 'flex',
      alignItems: 'center',
      boxShadow: '0px 8px 10px -5px rgb(0 0 0 / 20%), 0px 16px 24px 2px rgb(0 0 0 / 14%), 0px 6px 30px 5px rgb(0 0 0 / 12%)',
      height: '64px',
      '& h5': {
          marginTop: 0,
          marginBottom: 0,
          marginLeft: '16px',
          fontWeight: '500',
      },
  }))

  const ProductBox = styled('div')(() => ({
      display: 'flex',
      alignItems: 'center',
      padding: '8px 8px',
      transition: 'background 300ms ease',
      '&:hover': {
          background: 'rgba(0,0,0,0.01)',
      },
  }))

  const IMG = styled('img')(() => ({
    width: 48,
}))

const ProductDetails = styled('div')(() => ({
      marginRight: '8',
      textAlign: 'center',
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      '& h6': {
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: 'block',
          width: 120,
          marginBottom: '4px',
      },
  }))

  useEffect(() => {
      let total = 0

      cartList.forEach((product) => {
          total += product.value
      })
      setTotalCost(total)
  }, [cartList])
 
  let uniqueProduct = [];
  let showProduct = false;

  return (
    <div>
                 
      <React.Fragment key='right'>
        <Button>right</Button>
        <Drawer
          variant="temporary"
          anchor='right'
          open={open}
          onClose={() => handleClose}
          ModalProps={{
            keepMounted: true,
          }}
        >
          
          <MiniCart>
            <CartBox>
                <ShoppingCartIcon color="primary" />
                <h5>Carrinho</h5>
            </CartBox>
            <Box 
              flexGrow={1} 
              overflow="auto"
            >
              <ProductBox
                style={{flexDirection: 'column'}}
              >
                {cartList.map((product) => {
                  
                  const amount = cartList.filter( item => item.Id === product.Id ).length;
                  const cartProductIndex = cartList.findIndex( item => item.Id === product.Id )

                  //console.log('Teste: ' + product.Id)
                  
                  if (!uniqueProduct.includes(product.Id)) 
                  {
                    uniqueProduct.push(product.Id);
                    showProduct = true;
                    //console.log(product.Id);
                  }
                  else
                  {
                    showProduct = false;
                  }

                  
                  return (
                    showProduct &&
                    <ProductBox key={product.id}>
                        <Box
                            mr="4px"
                            display="flex"
                            flexDirection="column"
                        >
                            <StyledIconButton
                                key={product.id}
                                size="small"
                                onClick={ () => addCart({
                                  "Id": product.Id,
                                  "product": product.product,
                                  "value": product.value,
                                  "img": product.img
                                })}
                            >
                                <Icon sx={{ cursor: 'pinter' }}>
                                    keyboard_arrow_up
                                </Icon>
                            </StyledIconButton>
                            <StyledIconButton
                                disabled={!(amount - 1)}
                                size="small"
                                onClick={() => ( removeCart({ cartProductIndex }) )}
                            >
                                <Icon id={!(amount - 1) && 'disable'}>
                                    keyboard_arrow_down
                                </Icon>
                            </StyledIconButton>
                        </Box>
                        <Box mr={1}>
                            <IMG
                                src={product.img}
                                alt={product.product}
                            />
                        </Box>
                        <ProductDetails>
                            <H6>{product.title}</H6>
                            <Small sx={{ color: 'secondary' }}>
                                {product.value.toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })} x {amount}
                                <br/>
                                <b> {(product.value * amount).toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })} </b>
                            </Small>
                        </ProductDetails>
                        <StyledIconButton
                            key={product.id}
                            size="small"
                            onClick={() => ( removeAll({ product }) )}
                        >
                            <Icon fontSize="small">clear</Icon>
                        </StyledIconButton>
                    </ProductBox>
                  )
                  
                })
                }

              </ProductBox>
            </Box>

            <Button
                sx={{ width: '100%', borderRadius: 0 }}
                variant="contained"
                color="primary"
            >
                Finalizar Compra ( { totalCost.toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' }) } )
            </Button>

          </MiniCart>

        </Drawer>
      </React.Fragment>
      
    </div>

  );
}

export default memo(ShoppingCart)