import React, { useState, useContext } from 'react'
import { useParams } from "react-router-dom";
import { useGet } from "../hooks/useGet";
import { ProductDetails } from '../components/ProductDetails/ProductDetails';
import { MarginContainer } from '../components/MarginContainer/MarginContainer';
import { GridContainer } from '../components/GridContainer/GridContainer';
import { CategoryFilter } from '../components/CategoryFilter/CategoryFilter';
import { Comments } from '../components/Comments/Comments';
import { CommentInput } from '../components/CommentInput/CommentInput';
import { SectionTitle } from '../components/SectionTitle/SectionTitle';
import { UserContext } from '../context/UserContext';

export const ProductPage = () => {
  const { slug } = useParams()
  const { isLoading: productIsLoading, data: productData, error: productError } = useGet(`http://localhost:4242/products/${slug}`)
  const [newComment, setNewComment] = useState("")
  const { userToken, setUserData, setUserToken } = useContext(UserContext);
  const productID = productData?.data?.id
  console.log(productData);

  function submitComment() {
    const body = new URLSearchParams();
    body.append("comment", newComment); //henter email fra email usestate

    const options = {
      method: "POST",
      body: body,
      headers: { Authorization: `Bearer ${userToken}` }
    }

    fetch(`http://localhost:4242/comment/${productID}`, options)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }


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
        <SectionTitle title="Kontakt Sælger" />
        <CommentInput
          name="newComment"
          placeholder="Skriv en besked til en sælger"
          action={setNewComment}
        />
        <button onClick={() => submitComment()}>send</button>
        {!productIsLoading && productData?.data?.comments?.map((comment) => (
          <Comments
            key={comment.id}
            text={comment.comment} 
            name={`${comment.user?.firstname} (${comment.createdAt})`}
          />
        ))}
      </MarginContainer>
    </>
  )
}
