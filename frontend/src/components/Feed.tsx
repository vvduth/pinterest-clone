import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { client } from "../client";
import { searchQuery, feedQuery } from "../utils/data";

import MasonryLayout from "./MasonryLayour";
import Spinner from "./Spinner";

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState<any[]|any>(null);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      const query = searchQuery(categoryId);

      client.fetch(query).then((data) => {
        setPins(data);
        console.log(data)
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data)=> {
        setPins(data);
        console.log(data)
        setLoading(false);
      })
    }
  }, [categoryId]);
  if (loading) return <Spinner message="Loading..." />;
  return (<div>

    {pins && <MasonryLayout pins={pins} /> }
  </div>);
};

export default Feed;
