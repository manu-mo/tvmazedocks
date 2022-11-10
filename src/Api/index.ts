const BASE_URL = "https://api.tvmaze.com";

type ShowApiResType = {
  show: {
    id: number;
    name: string;
    image?: {
      medium: string;
    };
  };
}; //qua tipizzo quello che mi risponde il server

export type ShowType = {
  id: number;
  title: string;
  image?: string;
}; //qua tipizzo quello che voglio mandare io al frontend

export const getShowsBySearch = async (query: string) => {
  query = query.trim();

  if (query.length === 0) {
    return [];
  }

  const res = await fetch(`${BASE_URL}/search/shows?q=${query}`);

  const data: ShowApiResType[] = (await res.json()) as ShowApiResType[];

  const mappedData: ShowType[] = data.map(el => ({
    id: el.show.id,
    title: el.show.name,
    image: el.show.image?.medium,
  }));

  return mappedData;
};


type ShowDetailApiResType = {
    id: number;
    name: string;
    genres: string[];
    premiered: string;          
    ended?: string;
    rating?: {
        average: number;
    };
    image?: {
        original: string;
    };
    summary?: string;
};

export type ShowDetailType = {
    id: number;
    title: string;
    genres: string[];
    startDate : string;
    endDate?:  string;
    avgRating?: number;
    image?: string;
    summary?: string;
};

export const getShowById = async (id: number) => {
    if(id<0) {
        return null
    }

    const res = await fetch(`${BASE_URL}/shows/${id}`);

    const data: ShowDetailApiResType = (await res.json()) as ShowDetailApiResType;

//qui finisce la mia dipendeza dal server e inizio a modellare i dati come li voglio

    const mappedData: ShowDetailType = {
        id: data.id,
        title: data.name,
        genres: data.genres,
        startDate: data.premiered,
        endDate: data.ended,
        avgRating: data.rating?.average,
        image: data.image?.original,
        summary: data.summary?.replace(/<\/?[\w\s]*>|<.+[\W]>/g, ''), //regEx per togliere i tag
    };

    return mappedData;
}
