import React, { memo, useState, useCallback, useEffect } from 'react'
import Api from '../../api'
import Board from './components/Board'
import Panel from './components/Panel'
import { ContainerStyled } from './style'
import $ from 'jquery';

function Main() 
{
  const [dataProducts, setData] = useState({})
  const [dataSellers, setDataSellers] = useState({})
  const [sellers, setSellers] = useState('0')
  const [cep, setCep] = useState('');
  const updateAt = new Date().toLocaleString()
  const [cart, setCart] = useState([])
  //const [totalValue, setTotalValue] = useState()

  const getProducts = useCallback((sellers) => 
    {
      if ( sellers.toString() !== '0' )
      {
        Api.getProducts(sellers)
          .then(dataProducts => setData(dataProducts))
      }
      else
      {
        setData({});
      }
    }, []
  )

  const getSellers = useCallback((cep) => 
    {
      Api.getSellers(cep)
        .then(dataSellers => setDataSellers(dataSellers))
        //console.log(sellers)
    }, []
  )

  useEffect(() => 
    {    
      getProducts(sellers)
    }, [getProducts, sellers]
  )

  useEffect(() => 
    {    
      if ( cep.length === 8 )
      {
        getSellers(cep)
      }
      else
      {
        setDataSellers(dataSellers => dataSellers = [{
          "id": "0",
          "name": "< Digite o CEP >",
          "logo": ""
        }]);

        setSellers(0);
      }
    }, [getSellers, cep]
  )


  const handleChangeCep = ({ target }) => 
  {
    const cep = target.value;
    setCep(cep);
  }

  const handleChange = ({ target }) => 
  {
    const sellers = target.value;
    setSellers(sellers);
  }

  const inputValue = $( "#getCep" );
  if ( inputValue !== undefined && inputValue != null )
  {
    inputValue.maxLength = 8;
    inputValue.keypress(function() {
      if(this.value.length === 8) return false;
    });
  }

  function add(item)
  {
    const newCart = cart;
    newCart.push(item);

    setCart([...newCart]);
  }

  function remove(index)
  {
    let newCart = cart.filter((item, i) => i !== index.cartProductIndex);
    setCart([...newCart])
    //console.log(index.cartProductIndex)
  }

  function removeAll(e)
  {
    let newCart = cart.filter((item, i) => item.Id !== e.product.Id);
    setCart([...newCart])
    //console.log(e.product.Id)
  }

  useEffect(() => {
    //console.log(cart);
  }, [cart])

  return (
    <ContainerStyled>
      <div className="mb-2">
        <Panel
          data={dataSellers}
          updateAt={updateAt}
          onChange={handleChange}
          onChangeCep={handleChangeCep}
          sellers={sellers}
          getProducts={getProducts}
          cart={cart}
          addCart={add}
          removeCart={remove}
          removeAll={removeAll}
        />
      </div>
      <Board 
        data={dataProducts}
        cart={cart}
        addCart={add}
        removeCart={remove}     
      />      
    </ContainerStyled>
  )
}

export default memo(Main)