const axios = require('axios')

const getBreeds = async () => {
  try {
    return await axios.get('https://a6dxgre3d8.execute-api.us-east-1.amazonaws.com/prd/projects')
  } catch (error) {
    console.error(error)
  }
}

const countBreeds = async () => {
  const breeds = await getBreeds()
  console.log(breeds.data)
}

countBreeds()


const request_id = Math.floor(Math.random() * 100).toString();

console.log(typeof(request_id))