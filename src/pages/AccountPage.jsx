import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { MarginContainer } from "../components/MarginContainer/MarginContainer";
import { SectionTitle } from "../components/SectionTitle/SectionTitle"
import { useNavigate } from "react-router-dom";
import { ProfileDashboard } from "../components/ProfileDashboard/ProfileDashboard";
import { MyListing } from "../components/MyListings/MyListings";
import { useGet } from "../hooks/useGet";

export const AccountPage = () => {
  const { userToken, userData } = useContext(UserContext);
  const { isLoading: myListingsIsLoading, data: myListingsData } = useGet('http://localhost:4242/products',
    { headers: { Authorization: `Bearer ${userToken}` } }
  );
  console.log(myListingsData);

  return (
    <>
      {userToken ? (
        <>
          <MarginContainer>
            <div>AccountPage logged in</div>
            <div><button>Min Profil</button><button>Mine Annoncer</button></div>

            <ProfileDashboard />

            {!myListingsIsLoading && myListingsData?.data?.map((data) => (
              <>
                <MyListing
                  key={data.id}
                  name={data?.name}
                  price={data?.price}
                  description={data?.description}
                  img={data?.img}
                />
                <span>
                  <button>Gå til annonce</button>
                  <button>Fjern annonce</button>
                </span>
              </>
            ))}

          </MarginContainer>
        </>
      ) : (
        <div>
          <p>AccountPage not logged in</p>
          <p>Tryk <a href="">her</a> for at gå til en login side</p>
        </div>
      )}
    </>
  );
};
