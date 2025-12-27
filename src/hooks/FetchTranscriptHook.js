import axios from "axios";

export const FetchTranscript = async (transcriptId) => {
  try {
    console.log("Transcript ID:", transcriptId);

    const res = await axios.get(  `/api/v1/fetch_youtube_script/${transcriptId}`);
    const data = res.data; 
    console.log(data);
    return data;
  } catch (error) {
    console.error(
      "Error fetching transcript:",
      error.response?.data || error.message
    );
    throw error;
  }
};
