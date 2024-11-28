import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://akanejbovkcionftceem.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrYW5lamJvdmtjaW9uZnRjZWVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5MTgyNTMsImV4cCI6MjA0NzQ5NDI1M30.Agqs-lyFaD2n3R16o4Mcd7ePhclTBsOc1R2IUmEcNoE';

const supabase = createClient(supabaseUrl, supabaseKey);

export const insertHousehold = async (household) => {
  const { data, error } = await supabase.from('household').insert([household]);
  if (error) {
    throw error; // Ném lỗi để xử lý ở lớp logic
  }
  return data;
};
