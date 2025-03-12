import React from 'react'
import { useGet } from '../hooks/useGet'
import { ProductsOfCategory } from '../components/ProductsOfCategory/ProductsOfCategory'
import { useParams } from 'react-router-dom'
import { MarginContainer } from '../components/MarginContainer/MarginContainer'
import { GridContainer } from '../components/GridContainer/GridContainer'
import { CategoryFilter } from '../components/CategoryFilter/CategoryFilter'


export const CategoriesPage = () => {
  const { slug } = useParams();
  const { isLoading: categoryIsLoading, data: categoryData, error: categoryError } = useGet(`http://localhost:4242/products/category/${slug}`)
  console.log(categoryData);
  return (
    <>
      <MarginContainer>
        <GridContainer columns="1fr 3fr">
          <CategoryFilter />
          <GridContainer columns="1fr 1fr 1fr">
            {!categoryIsLoading && categoryData?.data.map((data) => (
              <ProductsOfCategory
                key={data?.id}
                img={data?.image}
                price={data?.price}
                name={data?.name}
                description={data?.description}
                link={`/products/${data?.slug}`}
              />
            ))}
          </GridContainer>
        </GridContainer>
      </MarginContainer>
    </>
  )
}
