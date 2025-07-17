export { removeTVDetail } from "../reducers/tvSlice";
import axios from "../../utils/axios";
import { loadTVDetail } from "../reducers/tvSlice";

export const asyncLoadtv = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/tv/${id}`);
    const externalId = await axios.get(`/tv/${id}/external_ids`);
    const recommendations = await axios.get(`/tv/${id}/recommendations`);
    const similar = await axios.get(`/tv/${id}/similar`);
    const videos = await axios.get(`/tv/${id}/videos`);
    const watchProviders = await axios.get(`/tv/${id}/watch/providers`);
    let completeDetail = {
      detail: detail.data,
      externalId: externalId.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      videos: videos.data.results.find((m) => m.type === "Trailer"),
      watchProviders: watchProviders.data.results.IN,
    };
    dispatch(loadTVDetail(completeDetail))
  } catch (error) {
    console.log("Error:", error);
  }
};
