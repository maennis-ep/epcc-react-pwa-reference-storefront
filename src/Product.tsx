import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useResolve, useProductImages } from './hooks';
import { addToCart, loadProductBySlug } from './service';
import { CompareCheck } from './CompareCheck';
import { SocialShare } from './SocialShare';
import { useTranslation, useCurrency, useCartData } from './app-state';
import { isProductAvailable } from './helper';
import { Availability } from './Availability';
import { VariationsSelector } from './VariationsSelector';
import { APIErrorContext } from './APIErrorProvider';

import './Product.scss';


interface ProductParams {
  productSlug: string;
}

export const Product: React.FC = () => {
  const { productSlug } = useParams<ProductParams>();
  const { t } = useTranslation();
  const { selectedLanguage } = useTranslation();
  const { selectedCurrency } = useCurrency();
  const { updateCartItems } = useCartData();
  const { addError } = useContext(APIErrorContext);

  const [product] = useResolve(
    async () => {
      try {
        return loadProductBySlug(productSlug, selectedLanguage, selectedCurrency)
      } catch (error) {
        addError(error.errors);
      }
    },
    [productSlug, selectedLanguage, selectedCurrency, addError]
  );
  const [productId, setProductId] = useState('');

  useEffect(() => {
    product && setProductId(product.id);
  }, [product]);

  const productImageHrefs = useProductImages(product);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isPrevImageVisible = currentImageIndex > 0;
  const isNextImageVisible = currentImageIndex < (productImageHrefs?.length ?? 0) - 1;
  const productBackground = product?.background_color ?? '';

  const handlePrevImageClicked = () => {
    setCurrentImageIndex(currentImageIndex - 1);
  };

  const handleAddToCart = () => {
    const mcart = localStorage.getItem('mcart') || '';
    addToCart(mcart, productId)
    .then(() => {
      updateCartItems()
    })
    .catch ((err) => {
      addError(err.errors);
    });
  };

  const handleNextImageClicked = () => {
    setCurrentImageIndex(currentImageIndex + 1);
  };

  function handleVariationChange(childID: string) {
    setProductId(childID);
  }

  return (
    <div className="product">
      {product ? (
        <div className="product__maincontainer">
          <div className="product__imgcontainer">
            {productImageHrefs.length > 0 && (
              <>
                <img className="product__img" src={productImageHrefs?.[currentImageIndex]} alt={product.name} style={{ backgroundColor: productBackground }} />
                {isPrevImageVisible && (
                  <button className="product__previmagebtn" aria-label={t('previous-image')} onClick={handlePrevImageClicked}>
                    <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 19l-7-7 7-7"></path></svg>
                  </button>
                )}
                {isNextImageVisible && (
                  <button className="product__nextimagebtn" aria-label={t('next-image')} onClick={handleNextImageClicked}>
                    <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 5l7 7-7 7"></path></svg>
                  </button>
                )}
              </>
            )}
          </div>
          <div className="product__details">
            <h1 className="product__name">
              {product.name}
            </h1>
            <div className="product__sku">
              {product.sku}
            </div>
            <div className="product__price">
              {product.meta.display_price.without_tax.formatted}
            </div>
            <Availability available={isProductAvailable(product)} />
            <div className="product__comparecheck">
              <CompareCheck product={product} />
            </div>
            {
              product.meta.variations
                ? <VariationsSelector product={product} onChange={handleVariationChange} />
                : ''
            }
            <div className="product__moltinbtncontainer">
              {productId &&
                <button
                  className="epbtn --secondary"
                  onClick={handleAddToCart}
                >{t('add-to-cart')}</button>
              }
            </div>
            <div className="product__description">
              {product.description}
            </div>
            <div className="product__socialshare">
              <SocialShare name={product.name} description={product.description} imageHref={productImageHrefs?.[0]} />
            </div>
          </div>
        </div>
      ) : (
        <div className="loader" />
      )}
    </div>
  );
};
