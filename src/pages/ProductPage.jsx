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
import { Splitter } from '../components/Splitter/Splitter';
import s from './PageStyles/ProductPage.module.scss'

export const ProductPage = () => {
  //useParams til at lave dynamisk value i ${slug}
  const { slug } = useParams()
    //useGet til at henter api
  const { isLoading: productIsLoading, data: productData, error: productError } = useGet(`http://localhost:4242/products/${slug}`)
    // alle usestate til at holde styr på state [gemmer, opdater]
  const [newComment, setNewComment] = useState("")
  const { userToken, userData } = useContext(UserContext);
  const productID = productData?.data?.id;
  // console.log(productData);


  //submit comment function
  function submitComment() {
    const body = new URLSearchParams();
    body.append("comment", newComment);

    //sender en post request til API med access token i header
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

  //delete en comment som passer med id
  function deleteComment(id) {
    //sender en deletet crud request med access token i header
    const options = {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${userToken}` },
    };

    fetch(`http://localhost:4242/comment/${id}`, options)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }


  return (
    <>
      <MarginContainer>
        <Splitter marginTop={20} marginBottom={10} width={90} />
        <GridContainer columns="1fr 3fr">
          <CategoryFilter />
          <ProductDetails
            img={productData?.data?.image}
            name={productData?.data?.name}
            description={productData?.data?.description}
            price={productData?.data?.price}
          />
        </GridContainer>
        <Splitter marginTop={20} marginBottom={10} width={90} />

        <SectionTitle title="Kontakt Sælger" textAlign='center' color={"green"} fontSize={30} fontWeight="200" padding="20px 0"/>
        <section className={s.commentSection}>
          <CommentInput
            name="newComment"
            placeholder="Skriv en besked til en sælger"
            action={setNewComment}
          />
          <button className={s.commentBtn} onClick={() => submitComment()}>send</button>
        </section>
        <div className={s.commentFeed}>
          {!productIsLoading &&
            productData?.data?.comments?.map((item) => (
              <>
                <Comments
                  text={item.comment}
                  name={`${item.user?.firstname} (${new Date(item.createdAt).toLocaleString()})`}
                />
                <button className={s.deleteCommentBtn} onClick={() => deleteComment(item.id)}>slet kommentar</button>
              </>
            ))}
        </div>



      </MarginContainer>
    </>
  )
}
