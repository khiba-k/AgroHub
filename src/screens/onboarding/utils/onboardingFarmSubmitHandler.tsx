// utils/submitFarmData.ts (or define it in same file)
export const submitFarmData = async (data: any) => {
    try {
        const res = await fetch('/api/onboarding/farm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await res.json();
        if (result.success === false) {
            if (result.status === 500) {
                return "server_error";
            }
            if (result.status === 409) {
                return "conflict_error";
            }
        }

        return true;

    } catch (error) {
        console.error('Error submitting farm data:', error);
        throw error;
    }
};
