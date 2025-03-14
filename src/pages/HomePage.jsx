import React from 'react'
import { GridContainer } from '../components/GridContainer/GridContainer'
import { MarginContainer } from '../components/MarginContainer/MarginContainer'
import { useGet } from '../hooks/useGet'
import { ProductCards } from '../components/ProductCards/ProductCards'
import { SectionTitle } from '../components/SectionTitle/SectionTitle'
import { Banner } from '../components/Banner/Banner'
import { CategoryCards } from '../components/CategoryCards/CategoryCards'
import { Donation } from '../components/Donation/Donation'
import { Splitter } from '../components/Splitter/Splitter'
import { usePageTitle } from '../hooks/usePageTitle';

export const HomePage = () => {
  usePageTitle('Home - Den Grønne Avis');
  // useget til at henter data fra api
  const { isLoading: productIsLoading, data: productdata, error: productError } = useGet('http://localhost:4242/products')
  const { isLoading: categoryIsLoading, data: categorydata, error: categoryError } = useGet('http://localhost:4242/categories')

//ramdom array som randomly skifter produkter i array
  const randomArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };
  return (
    <>
      <MarginContainer>
        <Splitter marginTop={20} marginBottom={10} width={100}/>
        <SectionTitle title="Udvalgte Produkter" padding="1rem 0 1rem 0 "/>
        <GridContainer columns="1fr 1fr 1fr 1fr 1fr 1fr" tabletColumns='1fr 1fr 1fr' mobileColumns=' 1fr 1fr'>
          {!productIsLoading && productdata?.data &&
            randomArray(productdata.data)
              .slice(0, 6).map((data) => (
                <ProductCards
                  key={data.id}
                  img={data.image}
                  name={data.name}
                  link={`/products/${data.slug}`}
                />
              ))}
        </GridContainer>
        <Splitter marginTop={30} marginBottom={30} width={100}/>
        <Banner
          img='./images/banner_image4.jpg'
          title='Den Grønne Avis'
          text='Vi går forest i kampen om klimaet ved at give 2 kr. til klima-venlige formål, hver gang du handler brugt på Den Grønne Avis'
        />
        <Splitter marginTop={30} marginBottom={30} width={100}/>
        <SectionTitle title="Populære Kategorier" padding="0 0 1rem 0 "/>
        <GridContainer columns="1fr 1fr 1fr 1fr 1fr 1fr" tabletColumns='1fr 1fr 1fr' mobileColumns=' 1fr 1fr'>
          {!categoryIsLoading && categorydata?.data &&
            randomArray(categorydata.data)
              .slice(0, 6).map((data) => (
                <CategoryCards
                  key={data.id}
                  img={data.category_image}
                  name={data.name}
                  link={`/products/category/${data.slug}`}
                />
              ))}
        </GridContainer>
        <Splitter marginTop={40} marginBottom={30} width={100}/>
        <GridContainer columns="1fr 1fr" tabletColumns='1fr' mobileColumns='1fr'>
          <Donation
            img='./images/banner_image2.jpg'
            title="Donationer til Dato"
            text="Sammen med dig har vi siden starten indsamlet:"
            money="452.231,50 kr"
            ending="Tak fordi du handler med omtanke for klimaet"
          />
          <Donation
            img='./images/banner_image3.jpg'
            title="Donationer i år"
            text="Sammen med dig har vi i år indsamlet:"
            money="112.452,75 kr"
            ending="Tak fordi du handler med omtanke for klimaet"
          />
        </GridContainer>

      </MarginContainer>
    </>
  )
}
