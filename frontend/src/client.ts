import  sanityClient  from "@sanity/client";
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
    projectId: 'duwb7h8s',
    dataset: 'production',
    apiVersion: '2022-03-10',
    useCdn: false,
    token: 'skSnLv77m0x8qj3o6EDtsIXTHE8eES0e70SMjQDAcjuGhGONwXDtE0ONuk6ZOgBYr8YgRTgrwo69BWnCaDsBq5amjoShskNuJhcOyKztJ1t7XzJasl5UScwFjjzxnM5xg4s5UNju09OU94FkKPRIWPFqGYFNujvTwx0Ifn9KsaM7Dvr0WMTU',
  });

  const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => builder.image(source);