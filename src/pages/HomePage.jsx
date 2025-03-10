import React from 'react'
import { GridContainer } from '../components/GridContainer/GridContainer'
import { MarginContainer } from '../components/MarginContainer/MarginContainer'
import { useGet } from '../hooks/useGet'
import { ProductCards } from '../components/ProductCards/ProductCards'
import { SectionTitle } from '../components/SectionTitle/SectionTitle'

export const HomePage = () => {

  const { isLoading: productIsLoading, data: productdata, error: productError } = useGet('http://localhost:4242/products')

  const randomArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };
  return (
    <MarginContainer>
      <SectionTitle title="Udvalgte Produkter" />
      <GridContainer columns="1fr 1fr 1fr 1fr 1fr 1fr">
        {!productIsLoading && productdata?.data &&
          randomArray(productdata.data)
            .slice(0, 6).map((data) => (
              <ProductCards
                key={data.key}
                img={data.image}
                name={data.name}
              />
            ))}
      </GridContainer>
    </MarginContainer>
  )
}
