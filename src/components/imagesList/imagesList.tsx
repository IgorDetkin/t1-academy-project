import React, { useEffect, useState } from 'react';
import classes from "./imagesList.module.css";
import { ImagesProductItem } from '../../store/services/oneProductService';


const ImagesList: React.FC<ImagesProductItem> = ({images}) => {

  const [mainPhoto, setMainPhoto] = useState<string>('');
  
  useEffect(() => {
        if (images && images.length > 0) {
          setMainPhoto(images[0]);
        }
    }, [images]);
 
  return (
    <section className={classes.pictures}>
                <img src={mainPhoto} alt="main photo" className={classes.mainPic} />
                <div className={classes.miniPics}>

                    {images 
                    && images.length > 1 
                    && images?.map((item, index) => (
                        <img 
                            key={index}
                            src={item} 
                            alt="other photo of product" 
                            className={`${classes.miniPic} ${mainPhoto === item ? classes.activePic : ''}`}
                            onClick={() => setMainPhoto(item)}
                        />
                        )
                        )
                    }
                </div>
            </section>
  )
}

export default ImagesList