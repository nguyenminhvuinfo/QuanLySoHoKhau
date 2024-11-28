import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseKey } from '../supabaseConfig';

const supabase = createClient(supabaseUrl, supabaseKey);

export const fetchHouseholdData = async (filters) => {
    const { data, error } = await supabase
        .from('household')
        .select('*')
        .match(filters);

    if (error) throw error;
    return data;
};

export const fetchHouseholdMembers = async (householdId) => {
    const { data, error } = await supabase
        .from('householdmember')
        .select()
        .eq('householdid', householdId)
        .order('memberid', { ascending: true });

    if (error) throw error;
    return data;
};
