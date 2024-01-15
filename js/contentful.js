const client = contentful.createClient({
  space: 'upmrz1fb9c75',
  environment: 'master', // defaults to 'master' if not set
  accessToken: 'k_PQxX4kFsJnzKRr0ZirmgcLfFt4eboN2tc0vFcplkc'
})

client.getEntry('5DYLF7S68ziynIN9cU8vnI')
  .then((entry) => {
    console.log(entry)
    //
    document.getElementById('page-title').innerHTML = entry.fields.title;
    document.getElementById('page-subTitle').innerHTML = entry.fields.subtitle;
  })
  .catch(console.error)