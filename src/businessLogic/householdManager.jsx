import { fetchHouseholdData, fetchHouseholdMembers } from '../data/householdService';

export const getHouseholdWithMembers = async (filters) => {
    try {
        const householdData = await fetchHouseholdData(filters);
        if (householdData.length === 0) return { exists: false };

        const household = householdData[0];
        const members = await fetchHouseholdMembers(household.householdid);

        return {
            exists: true,
            householdData: household,
            householdMembers: members,
        };
    } catch (error) {
        console.error('Error fetching household data:', error);
        return { exists: false, error };
    }
};
