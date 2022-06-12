import React, { memo, useState } from 'react'
import ShoppingCart from '../components/ShoppingCart'
import { Card, Typography, Button, MenuItem } from '../../../components'
import { CardPanelContentStyled, ItemStyled, SelectStyled, ValidatorFormStyled } from './style'
import { TextValidator } from 'react-material-ui-form-validator'
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { styled } from '@mui/system'

const StyledBadge = styled(Badge)(() => ({
  right: '10vw',
  position: 'absolute',
  padding: '0px 0px 20px'
}))

const navigatorHasShare = navigator.share

function Panel({ updateAt, onChange, onChangeCep, data, sellers, getProducts, cart, addCart, removeCart, removeAll }) 
{
  
  const [openShoppingCart, setShoppingCart] = useState(false);

  var dataSellers = (Object.values(data).map( e => e['sellers'] ));
  dataSellers = dataSellers.shift();
  

  if ( JSON.stringify( dataSellers ) === undefined ) 
  {
    dataSellers = [{
                  "id": "0",
                  "name": "< Digite o CEP >",
                  "logo": ""
              }];
  } 
  else
  {
    
    if ( dataSellers.filter( e => parseInt(e.id) === 0 ).length === 0 )
    {
      dataSellers.splice(0, 0, {"id": "0", "name": "< Selecione >", "logo": ""})
    }
    //console.log( 'defined: ' + JSON.stringify( sellers )  );
  } 
  

  const renderSellers = (seller, index) => 
  (
    <MenuItem key={`seller-${index}`} value={seller.id}>
    <ItemStyled>
      <div>{seller.name}</div>
    </ItemStyled>
    </MenuItem>
    
  )
  
  const sellers_label = dataSellers.filter( sellersLabel => sellersLabel.value === sellers ).map(sellersLabel => sellersLabel.name);

  function textSellers (sellers)
  { 
    return `Filial selecionada: ${sellers} => Última atualização em: ${updateAt}` 
  }

  const copyInfo = (valueText) => 
  {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = textSellers(sellers_label)

    if (navigator.userAgent.match(/ipad|ipod|iphone/i)) 
    {
        dummy.contentEditable = true;
        dummy.readOnly = true;
        var range = document.createRange();
        range.selectNodeContents(dummy);
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }
    else 
    {
        dummy.select();
    }

    document.execCommand("copy");
    document.body.removeChild(dummy);
    
    //navigator.clipboard.writeText(textCovid19)
  }

  const shareInfo = () => 
  {
    navigator.share
    (
      {
      title: `Mercado Online - DIO - ${sellers}`,
      text: textSellers(sellers_label),
      url: 'https://covid19-countries-dio.netlify.app'
      }
    )
  }

  const renderShareButton = (
    <div>
      <Button variant="contained" color="primary" onClick={shareInfo}>
        Compartilhar
      </Button>
    </div>
  )

  const renderCopyButton = (
    <div>
      <Button variant="contained" color="primary" onClick={copyInfo}>
        Copiar
      </Button>
    </div>
  )  

  const handleShoppingCart = ({ target }) => 
  {
    const text = JSON.stringify(target.className);
    
    if ( text.indexOf("MuiBackdrop-root") > -1 )
    {
      setShoppingCart(false);
    }
    else
    {
      setShoppingCart(true);
    }
    //console.log('handleShoppingCart: ' + JSON.stringify(text))

  };

  return (
    <Card>
      <CardPanelContentStyled>
        <div id="painel">
          <div id="titulo1">
            <Typography variant="h4" component="span" color="primary">Mercado Online - DIO</Typography>
          </div>
          <StyledBadge 
            color="secondary" 
            badgeContent={cart.length}
            overlap="rectangular"
            style={{cursor: 'pointer'}}
            onClick={handleShoppingCart}
          >
              <ShoppingCartIcon />{" "}
              {
                openShoppingCart &&
                <ShoppingCart
                openShoppingCart={openShoppingCart}
                cartList={cart}
                addCart={addCart}
                removeCart={removeCart}
                removeAll={removeAll}
                />
              }
          </StyledBadge>
          <div className="pt-2">

            <ValidatorFormStyled>
              <TextValidator
                id="getCep"
                maxLength='8'
                sx={{ mb: 3, width: '100%' }}
                variant="outlined"
                size="small"
                label="CEP"
                onChange={onChangeCep}
                name="cep"
                placeholder='00.000-000'
                type='number'
              />            
            </ValidatorFormStyled>

            <br/>
            
            <SelectStyled 
              onChange={onChange} 
              value={sellers}
              sx={{
                padding: "6px",
                borderRadius: "3px",
                border: "1px gray inset"
              }}
            >
              { JSON.stringify( dataSellers ) !== undefined ? dataSellers.map(renderSellers) : true }
            </SelectStyled>

          </div>
          <div id="titulo3">
            <Typography variant="body2" component="span" color="primary">Última atualização em: {updateAt}</Typography>
            {navigatorHasShare ? renderShareButton : renderCopyButton}
          </div>
        </div>
        
      </CardPanelContentStyled>
    </Card>
  )
}

export default memo(Panel)