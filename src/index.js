/* DOM ELEMents */
let id = 1

const postImage = document.querySelector("#post-img")
const postCaption = document.querySelector("#post-caption")
const tripTitle = document.querySelector("#trip-title")
const tripNavBar = document.querySelector('ul#nav-bar')
const likesBar = document.querySelector('p#likes')
// const postComments = document.querySelector("#post-comments")


/* Event Handler */

/* Render ELEMents */
const renderUserDetails = userObj => {
    // postImage.src = userObj.trips.posts[id].img_url
    // postImage.alt = tripObj.posts[id].caption
    // tripTitle.textContent = `${tripObj.location} ${tripObj.date}`
    // postCaption.textContent = tripObj.posts[id].caption

    userObj.posts.forEach(post => {
            console.log(post)
            postImage.src = userObj.posts[id].img_url
            // Add code to connect posts trip_id with event_listener in navbar trip_id 
        })

    userObj.trips.forEach(trip => {
    let li = document.createElement("li")
    li.textContent = `${trip.location}, ${trip.date}`
    tripNavBar.append(li)
    })
    console.log(userObj)

    userObj.posts.forEach(post => {
    likesBar.textContent = `Likes: ${post.like}`
    console.log(post)
    })
}

/* Fetch ELEMents */

// const getOneTrip = id => {
//     fetch(`http://localhost:3000/api/v1/trips/${id}`)
//     .then(r => r.json())
//     .then(console.log)
// }

// const getAllTrips = async (id) => {
//     const url = `http://localhost:3000/api/v1/trips`
//         const response = await fetch(url)
//         const tripObj = await response.json()
//         renderTripDetails(tripObj)
// }

const getOneUser = async (id) => {
    const url = `http://localhost:3000/api/v1/users/${id}`
    const response = await fetch(url)
    const userObj = await response.json()
    renderUserDetails(userObj)
}


// const getOneTrip = async (id) => {
//     const url = `http://localhost:3000/api/v1/trips/${id}`
//     const response = await fetch(url)
//     const tripObj = await response.json()
//     renderTripDetails(tripObj)
// }

/* Initial ELEMents */
// getOneTrips(1)
getOneUser(id)