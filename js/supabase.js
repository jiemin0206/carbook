(async function() {
  const supabaseUrl = 'https://wbulnqvfawsmromxlekp.supabase.co'
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndidWxucXZmYXdzbXJvbXhsZWtwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNjk2MTQ5MiwiZXhwIjoyMDIyNTM3NDkyfQ.b3MRLGGI4LV9jIBu46vJcHiralh-qhnL3IEFxXhgRLk'
  const sup = supabase.createClient(supabaseUrl, supabaseKey)
  let { data, error } = await sup
    .from('Customers')
    .select()
    .eq('customer_name', 'Alex')
  
  
  console.log('supabase')
  console.log(data)
  async function insertMockDate() {
    const { data, error } = await sup
      .from('Orders')
      .insert([
        { customer_ID: 1, vehical_ID: 1, depoit: 1000 },
      ])
      .select()
    console.log(data)
    if(error) {
      console.log(error)
    }
  }
  
  //customer place order
  // 1. take customer input, insert customer data to customer table
  // 2. check if the customer exists, 
  // 3. vehicle dropdown preselect from database
  // 4. create order based on customer data
  // 5. create payment via stripe
})();

