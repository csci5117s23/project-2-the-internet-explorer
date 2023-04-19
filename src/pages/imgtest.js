const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";


export default function ImageTest() {
  const [images, setImages] = useState();
  const [loading, setLoading] = useState(true);

  const { isLoaded, userId, sessionId, getToken } = useAuth();

  useEffect(() => {
    const getAllMemories = async () => {
      if (userId) {
        try {
          const token = await getToken({ template: "codehooks" });

          const response = await fetch(backend_base + `/getTripMemories?trip=643d6998019fd477141f4108&category=place`, {
            'method': 'GET',
            'headers': {
              'Authorization': 'Bearer ' + token
            }
          });

          const data = await response.json();
          console.log('data: ', data);
          setImages(data);
          setLoading(false);
        } catch (error) {
          console.error('Error: ', error);
        } 
      }
    }
    getAllMemories();
  }, [isLoaded]);

  if (loading) {
    return <h1>LOADING...</h1>
  } else {
    let imageList = images.map(
      (image) => <img key={image._id} src={image.image} alt="error"></img>
    )

    return (
      <>{imageList}</>
    );
  }
}