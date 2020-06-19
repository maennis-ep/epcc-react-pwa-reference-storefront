import React from 'react';
import { useParams } from 'react-router-dom';
import { useResolve } from './hooks';
import { loadProductBySlug } from './service';
import { CompareCheck } from './CompareCheck';

import './Product.scss';
import { ProductMainImage } from './ProductMainImage';


interface ProductParams {
  productSlug: string;
}

export const Product: React.FC = () => {
  const { productSlug } = useParams<ProductParams>();
  const [product] = useResolve(async () => loadProductBySlug(productSlug), [productSlug]);

  return (
    <div className="product">
      {product && (
        <div className="product__maincontainer">
          <div className="product__imgcontainer">
            <ProductMainImage product={product} size={400} />
          </div>
          <div className="product__details">
            <h1 className="product__name">
              {product.name}
            </h1>
            <div className="product__price">
              {product.meta.display_price.without_tax.formatted}
            </div>
            <div className="product__availability">
              {product.meta.stock.availability === 'in-stock' ? 'Available' : 'Out of stock'}
            </div>
            <div className="product__comparecheck">
              <CompareCheck product={product} />
            </div>
            <div className="product__separator"></div>
            <div className="product__moltinbtncontainer">
              <span
                className="moltin-buy-button"
                data-moltin-product-id={product.id}
              ></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};