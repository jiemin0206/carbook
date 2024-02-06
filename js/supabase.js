
const supabaseUrl = 'https://wbulnqvfawsmromxlekp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndidWxucXZmYXdzbXJvbXhsZWtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY5NjE0OTIsImV4cCI6MjAyMjUzNzQ5Mn0.ZayUloWk_P1121_QycLaQ99dyzfMHxyyfJe1qXYge5Y'
const supabase = createClient(supabaseUrl, supabaseKey)

let { data, error } = await supabase
  .from('Customers')
  .select()

console.log('supabase')
console.log(data)