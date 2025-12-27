import axios from "axios";

const Videosummary = async () => {
    try {
        console.log('eferf');

        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/video_summary`);
        return res.data;
    } catch (error) {
        console.error("Error generating video summary:", error);
        throw error;
    }
};

export default Videosummary