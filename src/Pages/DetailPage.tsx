import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; //sono entrambi un hook
import { getShowById, ShowDetailType } from "../Api";
import { Card, CardContent, CardMedia, Typography, CircularProgress, Button  } from '@mui/material';

const DetailPage = () => {
  const { showId } = useParams();
  const [showDetail, setShowDetail] = useState<ShowDetailType | null>(null);
  const navigate = useNavigate(); //funziona come function {navigate(index)}
  
  useEffect(() => {
    if (!!showId) { //!! si usano per vedere se showId è definito (se esiste)
      try {
        const showIdNum = parseInt(showId);
        getShowById(showIdNum).then(show => {
          setShowDetail(show);
          console.log(showDetail);
        });
      } catch (err) {
        console.error("NaN");
      }
    }
  }, [showId]); //se non metto la dipendenza [showId] (quindi lascio [] vuote) useEffect viene eseguito solo al mount, se specifico delle variabili viene eseguito al mount e all'update di showId (quindi ogni volta che showId cambia)

  return !!showDetail ? (
    <Card sx={{ maxWidth: 500, alignItems: 'center', margin: 'auto' }} style={{ marginTop:'1em'}}>
      
        <CardMedia
          component="img"
          height="500"
          image={showDetail.image}
          alt={showDetail.title}
        />
        <CardContent>
        <Typography variant="body2" color="text.secondary">
            {showDetail.startDate} - {showDetail.endDate} <hr></hr>
          </Typography>
          <Typography gutterBottom variant="h4" component="div">
            {showDetail.title}

          </Typography>
          <Typography variant="body2" color="text.secondary">
            {showDetail.summary} <hr></hr>
          </Typography>
          <Typography variant="body2" color="text.primary">
            Rating: {showDetail.avgRating} <br></br> Genres: {showDetail.genres} 
          </Typography>
        </CardContent>
  
      
    </Card>
  ) : ( 
    <CircularProgress />
  );
};

export default DetailPage;
