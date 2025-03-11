import React from 'react'
import { useParams } from "react-router-dom";
import { useGet } from "../hooks/useGet";
import { ProductDetails } from '../components/ProductDetails/ProductDetails';
import { MarginContainer } from '../components/MarginContainer/MarginContainer';
import { GridContainer } from '../components/GridContainer/GridContainer';
import { CategoryFilter } from '../components/CategoryFilter/CategoryFilter';

export const ProductPage = () => {
  const { slug } = useParams()
  const { isLoading: productIsLoading, data: productData, error: productError } = useGet(`http://localhost:4242/products/${slug}`)
  console.log(productData);
  return (
    <>
      <MarginContainer>
        <GridContainer columns="1fr 3fr">
          <CategoryFilter />
          <ProductDetails
            img={productData?.data?.image}
            name={productData?.data?.name}
            description={productData?.data?.description}
            price={productData?.data?.price}
          />
        </GridContainer>
      </MarginContainer>
    </>
  )
}
