import React, { useState } from 'react';
import { useGet } from '../hooks/useGet';
import { ProductsOfCategory } from '../components/ProductsOfCategory/ProductsOfCategory';
import { useParams } from 'react-router-dom';
import { MarginContainer } from '../components/MarginContainer/MarginContainer';
import { GridContainer } from '../components/GridContainer/GridContainer';
import { CategoryFilter } from '../components/CategoryFilter/CategoryFilter';
import { Splitter } from '../components/Splitter/Splitter';
import { Pagination } from '../components/Pagination/Pagination';
import s from './PageStyles/CategoriesPage.module.scss'
import { usePageTitle } from '../hooks/usePageTitle';

export const CategoriesPage = () => {
  const { slug } = useParams();
  const { isLoading: categoryIsLoading, data: categoryData, error: categoryError } = useGet(
    `http://localhost:4242/products/category/${slug}`
    );
    console.log(categoryData);
    const [currentPage, setCurrentPage] = useState(1); // holder styr på hvor man er i pagination page
    const productsPerPage = 2; // sætter max produkter per page
    // Beregn rækken af ​​produkter, der skal vises på den aktuelle side
    const indexOfLastProduct = currentPage * productsPerPage; // index af den sidste produkt på den page
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage; // Index af den firste produkt på pagen
    // Get produkter til den nuværende page
    const currentProducts = categoryData?.data.slice(indexOfFirstProduct, indexOfLastProduct);
    
    usePageTitle(`${slug} - Den Grønne Avis`);


  return (
    <>
      <MarginContainer>
        <Splitter marginTop={20} marginBottom={10} width={90} />
        <GridContainer columns="1fr 3fr" gap={"0"}>
          <CategoryFilter />
          <GridContainer columns="1fr 1fr 1fr">
            {!categoryIsLoading &&
              currentProducts?.map((data) => (
                <ProductsOfCategory
                  key={data?.id}
                  img={data?.image}
                  price={data?.price}
                  name={data?.name}
                  description={`${data?.description.slice(0, 20)}...`}
                  link={`/products/${data?.slug}`}
                />
              ))}
          </GridContainer>
        </GridContainer>
        {!categoryIsLoading && categoryData && (
          <Pagination
            totalProducts={categoryData.data.length}
            productsPerPage={productsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        )}
      </MarginContainer>
    </>
  );
};
