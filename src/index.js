/* DOM ELEMents */
const postImage = document.querySelector("#post-img")
const postCaption = document.querySelector("#post-caption")
const tripTitle = document.querySelector("#trip-title")
// const postComments = document.querySelector("#post-comments")


/* Event Handler */

/* Render ELEMents */
const renderTripDetails = tripObj => {
    postImage.src = tripObj.posts[0].img_url
    postImage.alt = tripObj.posts[0].caption
    tripTitle.textContent = `${tripObj.location} ${tripObj.date}`

    console.log(tripObj)
}




/* Fetch ELEMents */

// const getOneTrip = id => {
//     fetch(`http://localhost:3000/api/v1/trips/${id}`)
//     .then(r => r.json())
//     .then(console.log)
// }

const getOneTrip = async (id) => {
    const url = `http://localhost:3000/api/v1/trips/${id}`
    const response = await fetch(url)
    const tripObj = await response.json()
    renderTripDetails(tripObj)
}

/* Initial ELEMents */
getOneTrip(1)
