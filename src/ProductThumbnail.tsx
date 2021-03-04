import React, { useContext } from 'react';
import * as moltin from '@moltin/sdk';
import { createProductUrl } from './routes';
import { useResolve } from './hooks';
import { Link } from 'react-router-dom';
import { CompareCheck } from './CompareCheck';
import { ProductMainImage } from './ProductMainImage';
import { isProductAvailable } from './helper';
import { Availability } from './Availability';
import { useCurrency, useTranslation } from './app-state';
import { APIErrorContext } from './APIErrorProvider';

import './ProductThumbnail.scss';


interface ProductThumbnailProps {
  product: any;
}

export const ProductThumbnail: React.FC<ProductThumbnailProps> = (props) => {
  const productUrl = createProductUrl(props.product.attributes.slug);
  const { selectedCurrency } = useCurrency();
  const { selectedLanguage } = useTranslation();

  return (
    <div className="productthumbnail">
      <div className="productthumbnail__imgcontainer">
        <Link className="productthumbnail__imglink" to={productUrl} aria-label={props.product.attributes.name}>
          <ProductMainImage product={props.product} />
        </Link>
      </div>
      <div className="productthumbnail__name">
        <Link className="productthumbnail__namelink" to={productUrl}>
          {props.product.attributes.name}
        </Link>
      </div>
      <div className="productthumbnail__sku">
        {props.product.attributes.sku}
      </div>
      <div className="productthumbnail__price">
        {props.product.attributes.price && props.product.attributes.price[selectedCurrency] && new Intl.NumberFormat(selectedLanguage, { style: 'currency', currency: selectedCurrency }).format(props.product.attributes.price[selectedCurrency].amount/100)}
      </div>
      {/* <Availability available={isProductAvailable(props.product)}/>
      <div className={`productthumbnail__comparecheck`}>
        <CompareCheck product={props.product} />
      </div> */}
    </div>
  );
};
