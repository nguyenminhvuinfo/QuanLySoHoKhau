import { supabase } from '../data/EditCitizenData';

export const addCitizen = async (citizenData) => {
    const { data, error } = await supabase
        .from('householdmember') // Tên bảng trong cơ sở dữ liệu Supabase
        .update([
            {
                householdid: citizenData.householdid,
                fullname: citizenData.fullname,
                alias: citizenData.alias,
                dateofbirth: citizenData.dateofbirth,
                placeofbirth: citizenData.placeofbirth,
                ethnicity: citizenData.ethnicity,
                occupation: citizenData.occupation,
                workplace: citizenData.workplace,
                idnumber: citizenData.idnumber,
                idissuedate: citizenData.idissuedate,
                idissueplace: citizenData.idissueplace,
                registrationdate: citizenData.registrationdate,
                previousaddress: citizenData.previousaddress,
            },
        ]);

    if (error) {
        throw new Error(`Error inserting citizen: ${error.message}`);
    }
    return data;
};
