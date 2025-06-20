import axios from 'axios';

export const submitFarmData = async (data: any) => {
    try {
        await axios.post('/api/onboarding/farm', data);
        return true;

    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 500) {
                return 'server_error';
            }
            if (error.response?.status === 409) {
                return 'conflict_error';
            }
        }

        console.error('Error submitting farm data:', error);
        throw error;
    }
};
