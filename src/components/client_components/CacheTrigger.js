'use client'

import { useState , useEffect} from "react";
import ProjectApi from '../../api/ProjectApi'

export default function CacheTrigger() {

  useEffect(() => {

    ProjectApi.getMediaFirst12().then((response) => {
      console.log("get first 12 media response trigger cache: ", response.data);
    }).catch((error) => {
      console.error("Error: ", error);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
    </>
  )
}
