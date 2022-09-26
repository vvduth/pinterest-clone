export const searchQuery = (searchTerm: string) => {
  const query = `*[_type== "pin" && title match '${searchTerm}' || category match '${searchTerm}' || about match '${searchTerm}']{
        image {
            asset -> {
                url
            }
        },
        _id, 
        destination, 
        postedBy -> {
            _id,
            userName, 
            image
        },
        save[] {
            _key, 
            postedBy -> {
                _id, 
                userName, 
                image
            },
        },        
    }`;

  return query;
};

// fetch all the pins

export const feedQuery = `*[_type == "pin"] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
        _id,
        destination,
        postedBy->{
          _id,
          userName,
          image
        },
        save[]{
          _key,
          postedBy->{
            _id,
            userName,
            image
          },
        },
      } `;
  
