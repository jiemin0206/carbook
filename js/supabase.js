(async function () {
  const supabaseUrl = 'https://wbulnqvfawsmromxlekp.supabase.co'
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndidWxucXZmYXdzbXJvbXhsZWtwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNjk2MTQ5MiwiZXhwIjoyMDIyNTM3NDkyfQ.b3MRLGGI4LV9jIBu46vJcHiralh-qhnL3IEFxXhgRLk'
  const sup = supabase.createClient(supabaseUrl, supabaseKey)
  // let { data, error } = await sup
  //   .from('Customers')
  //   .select()
  //   .eq('customer_name', 'Alex')


  // console.log('supabase')
  // console.log(data)

  async function insertCustomerData(customerName, email, mobile) {
    const { data, error } = await sup
      .from('Customers')
      .insert([
        { customer_name: customerName, email: email, mobile: mobile },
      ])
      .select()
    console.log(data)
    if (error) {
      console.log(error)
    }
    return data[0];
  }

  async function getVehichleData() {
    let { data, error } = await sup
    .from('Vehicles')
    .select()
    return data;
  }

  async function insertOrderData(customerId, vehicleId, deposit, status) {
    const { data, error } = await sup
      .from('Orders')
      .insert([
        { customer_ID: customerId, vehicle_ID: vehicleId, deposit: deposit, status: status },
      ]);
    console.log(data);
    if (error) {
      console.error(error);
    }
  }

  // vehicle dropdown preselect from database
  await renderVehicleDataToDropdown();
  async function renderVehicleDataToDropdown() {
    // get vechicle data
    var data = await getVehichleData();
    //get dropdown element
    var vechicleDropdown = document.getElementById('vehicle-dropdown')
    //bulid template and attach
    data.map(item => {
      var template = `
      <option value="${item.id}">${item.brand}</option>
      `
      vechicleDropdown.insertAdjacentHTML('beforeend',template)
    })
  }

  //customer place order
  // 1. take customer input, insert customer data to customer table
  const btn = document.getElementById('submitButton');

  document.getElementById('order-form')
    .addEventListener('submit', async function (event) {
      event.preventDefault();
      btn.value = 'Sending...';
      btn.disabled = true;

          // Get form data
    const formData = new FormData(event.target);

    // Create an object to store form values
    const formValues = {};
    formData.forEach((value, key) => {
      formValues[key] = value;
    });
    // Example: Accessing the full name entered by the user
    const fullName = formValues['fullName'];
    const contactNumber = formValues['contactNumber'];
    const emailAddress = formValues['emailAddress'];
    const vehicleId = formValues['vehicle'];
    const depositAmount = formValues['depositAmount']
    const status = 'pending'
    console.log('vehicle: ', formValues['vehicle'])
    console.log('Full Name:', fullName);
    console.log('Contact:', contactNumber);
    console.log('deposit', depositAmount)
    // 2. check if the customer exists, 
    let existingCustomer = await checkCustomerExists(fullName);
    if(!existingCustomer) {
      existingCustomer = await insertCustomerData(fullName, contactNumber, emailAddress)
    }
    
    // 4. create order based on customer data

    const order = await insertOrderData(existingCustomer.id, vehicleId, depositAmount, status);
      if (order) {
        console.log('Order created successfully:', order);
      }
      btn.value = 'Submit';
      btn.disabled = false; 
  
    // 5. create payment via stripe
    });
    async function checkCustomerExists(customerName) {
      let { data, error } = await sup
        .from('Customers')
        .select()
        .eq('customer_name', customerName)
      if(data && data.length > 0) {
        return data[0];
      }
      return null;
    }
})();

