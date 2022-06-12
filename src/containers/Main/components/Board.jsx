import React, { memo } from 'react'
import { Skeleton, Button } from '../../../components'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import 'swiper/css';
import 'swiper/css/bundle';

function Board({ data, cart, addCart, removeCart }) 
{
  var dataProducts = (Object.values(data));
  
  //console.log( JSON.stringify( dataProducts ) )

  const getValue = (value) => value ? value.toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' }) : <Skeleton variant="text" width={182} height={60} />

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={10}
      slidesPerView={6}
      autoHeight={true}
      slidesPerGroup={6}

      freeMode={true}
      mousewheel={true}
      keyboard={true}

      style={{paddingBottom: '40px' }}

      breakpoints={{
        // when window width is >= 640px
        320: {
          width: 320,
          slidesPerView: 1,
          slidesPerGroup: 1
        },
        500: {
          width: 500,
          slidesPerView: 2,
          slidesPerGroup: 2
        },
        // when window width is >= 1500
        768: {
          width: 768,
          slidesPerView: 4,
          slidesPerGroup: 4
        },
        1024: {
          width: 1024,
          slidesPerView: 5,
          slidesPerGroup: 5
        },
        1300: {
          width: 1300,
          slidesPerView: 5,
          slidesPerGroup: 5
        },
      }}

      pagination={{ clickable: true }}
      navigation={true}
      //onSlideChange={() => console.log('slide change')}
      //onSwiper={(swiper) => console.log(swiper)}
      //onSetTranslate={(swiper, translate) => console.log(swiper) }
    >
      
      {dataProducts.map((p, i) => {
          var price = (Object.values(p.items)).shift();
          price = (Object.values(price.sellers)).shift();
          price = (Object.values(price.commertialOffer) || []);

          var imgProducts = (Object.values(p.items)).shift();
          imgProducts = (Object.values(imgProducts.images)).shift();

          //console.log( JSON.stringify( "teste: " + img.imageUrl) )

          const cartProduct = cart.filter( item => item.Id === p.productId ).length;
          const cartProductIndex = cart.findIndex( item => item.Id === p.productId )

          //console.log( cartProductIndex )

          return (
            <SwiperSlide 
              key={i}
              width={225}
            >
              <div>
                <div>
                  <img alt="Imagem do Produto" src={imgProducts.imageUrl} width="200px" height="200px" className="img-product"></img>
                </div>
                <div className='product'>
                    <h3
                      style={{
                        boxSizing: 'border-box',                        
                        margin: '0px',
                        minWidth: '0px',
                        fontWeight: 400,
                        fontSize: '13px',
                        color: 'rgb(2, 41, 109)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',                       
                        minHeight: '54px',
                        lineHeight: '18px'
                        }}
                    >
                      {p.productName}
                    </h3>
                </div>
                <div className='price'
                     style={{
                      position: 'absolute',
                      bottom: '60px'
                    }}
                >
                  <h3>{getValue(price[7])}</h3>
                </div>
              </div>
              <div>
                  <Button 
                    style={{
                      display: cartProduct <= 0 ? 'block' : 'none',
                      position: 'absolute',
                      bottom: '10px'
                    }}
                    variant="contained" 
                    color="primary"
                    onClick={() => ( addCart({
                      "Id": p.productId,
                      "product": p.productName,
                      "value": price[7],
                      "img": imgProducts.imageUrl
                    }) )}
                    
                  >
                    ADICIONAR
                  </Button>

                  <ButtonGroup
                    style={{
                      display: cartProduct > 0 ? 'flex' : 'none',
                      position: 'absolute',
                      bottom: '10px'
                    }}
                  >
                    <Button
                      onClick={() => ( removeCart({ cartProductIndex }) )}
                      style={{
                        padding: '5px 0px',
                        border: '1px solid rgba(0, 0, 0, 0.23)'
                      }}
                    >
                      {" "}
                      <RemoveIcon fontSize="small" />
                    </Button>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center' 
                      }}
                    >
                      {cartProduct}
                    </div>

                    <Button
                      onClick={() => ( addCart({
                        "Id": p.productId,
                        "product": p.productName,
                        "value": price[7],
                        "img": imgProducts.imageUrl
                      }) )}
                      style={{
                        padding: '5px 0px' 
                      }}
                    >
                      {" "}
                      <AddIcon fontSize="small" />
                    </Button>
                  </ButtonGroup>

              </div>
            </SwiperSlide>
          );
        })}
      
    </Swiper>
  );

}

export default memo(Board)