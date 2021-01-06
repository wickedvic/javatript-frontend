/* DOM ELEMents */
let id = 1

const addPostForm = document.querySelector('form#add-post-form')
const postImage = document.querySelector("#post-img")
const postCaption = document.querySelector("#post-caption")
const tripTitle = document.querySelector("#trip-title")
const tripNavBar = document.querySelector('ul#nav-bar')
const postUl = document.querySelector('ul#post-ul')
const newTripForm = document.querySelector('form#new-trip-form')

// const postComments = document.querySelector("#post-comments")


/* Event Handler ****/


addPostForm.addEventListener('submit', (event) => {
    event.preventDefault()
    let tripId = parseInt(addPostForm.dataset.id)
    console.log(tripId)
    newPostObj = {
        caption: event.target.caption.value,
        img_url: event.target.img_url.value,
        like: 0,
        trip_id: tripId
    }
    let posterId = parseInt(event.target.dataset.id)
    console.log(posterId)
        fetch('http://localhost:3000/api/v1/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(newPostObj),
         })    
        .then(r => r.json())
        .then(addedPostObj => {
            console.log(addedPostObj)

            let newLi = document.createElement('li')
            let newP = document.createElement('p')
            let likeP = document.createElement('p')
            let imgNew = document.createElement('img')
            let button = document.createElement('button')

            imgNew.src = addedPostObj.img_url 
            newP.textContent = addedPostObj.caption
            likeP.textContent = `Likes: ${addedPostObj.like}`
            likeP.classList.add('likes')

            button.textContent = '👍'
            button.classList.add('like-button')


            newLi.append(imgNew, newP, likeP, button)
            postUl.append(newLi)

        })

         addPostForm.reset()
  })

////**** */

newTripForm.addEventListener('submit', (event) => {
    event.preventDefault()
    newTripObj = {
        location: event.target.location.value,
        date: event.target.date.value,
        user_id: id
    }
    console.log('click')
        fetch('http://localhost:3000/api/v1/trips', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(newTripObj),
         })    
        .then(r => r.json())
        .then(addedTripObj => {
            let newLi = document.createElement('li')
            newLi.textContent = `${addedTripObj.location}, ${addedTripObj.date}`
            tripNavBar.append(newLi)
        })
        
         newTripForm.reset()
  })

postUl.addEventListener('click', (e) => {

if(e.target.matches('.like-button')) {
    const likesBar = document.querySelector('p.likes')
    const likeId = parseInt(e.target.dataset.id)
    const newLikeNum = parseInt(likesBar.textContent.substring(7)) + 1
       console.log(newLikeNum)
       const newLikeObj = {like: newLikeNum}

        addNewLike(newLikeObj, likeId, likesBar)




        }
    })
    







    // const id = event.target.dataset.id
    // const cardDiv = event.target.closest(".card")
    // const likesPtag = cardDiv.querySelector("p")
    // const newNumberOfLikes = parseInt(likesPtag.textContent) + 1

    // const config = {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json"
    //   },
    //   body: JSON.stringify({
    //     likes: newNumberOfLikes
    //   })
    // }

    // fetch(`http://localhost:3000/toys/${id}`, config)
    //   .then(response => response.json())
    //   .then(toyObj => {
    //     likesPtag.textContent = `${toyObj.likes} Likes`
    //   })









/* Render ELEMents ******/

const renderUserDetails = userObj => {

    // userObj.posts.forEach(post => {
    //         postImage.src = userObj.posts[0].img_url
    //     })

    // tripTitle.textContent = `TRIP: ${userObj.trips[0].location}`

    // postCaption.textContent = `Post: ${userObj.posts[0].caption}`

    userObj.trips.forEach(trip => {

    let li = document.createElement("li")
    li.dataset.id = trip.id
    li.textContent = `${trip.location}, ${trip.date}`
    tripNavBar.append(li)
    
    })

        tripNavBar.addEventListener('click', e => {
        if(e.target.matches('li')) {
            let newId = parseInt(e.target.dataset.id)
            addPostForm.dataset.id = newId
            console.log(addPostForm.dataset.id)
            tripTitle.textContent = e.target.textContent

            console.log(userObj)
            console.log(newId)

            postUl.innerHTML = ''
                userObj.posts.forEach(poster => {

                if(poster.trip_id === newId) {
                            console.log(poster)
                            let li = document.createElement('li')
                            let img = document.createElement('img')
                            let p = document.createElement('p')
                            let pLikes = document.createElement('p')
                            let button = document.createElement('button')
                            
                            img.src = poster.img_url 
                            img.alt = poster.caption 
                            p.textContent = poster.caption
                            pLikes.textContent = `Likes: ${poster.like}`
                            pLikes.classList.add('likes')
                            // button.textContent = '👍'
                            button.textContent = poster.id
                            button.classList.add('like-button')
                            button.dataset.id = poster.id 
                            li.dataset.id = newId
                            addPostForm.dataset.id = newId
                            console.log(addPostForm.dataset.id)
                            
                            li.append(img, p, pLikes, button)
                            postUl.append(li)
                        }
                    })
        }
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


function addNewLike(newLikeObj, likeId, likesBar) {
    fetch(`http://localhost:3000/api/v1/posts/${likeId}`, {
    method: 'PATCH', 
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(newLikeObj)
 })
 .then(r => r.json())
 .then(updatedObj => {
     console.log(updatedObj.like)
     likesBar.textContent = `Likes: ${updatedObj.like}`
 })
}

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