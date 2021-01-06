/* DOM ELEMents */
let id = 1





























const mainMap = document.querySelector('div#main-map')
const postComments = document.querySelector('#post-comments')
// const addCommentForm = document.querySelector('#add-comment-form')
const addPostForm = document.querySelector('form#add-post-form')
const postImage = document.querySelector("#post-img")
const postCaption = document.querySelector("#post-caption")
const tripTitle = document.querySelector("#trip-title")
const tripNavBar = document.querySelector('ul#nav-bar')
const postUl = document.querySelector('ul#post-ul')
const newTripForm = document.querySelector('form#new-trip-form')

// const postComments = document.querySelector("#post-comments")


/* Event Handler ****/

postUl.addEventListener('submit', (event) => {
    const addCommentForm = document.querySelector('#add-comment-form')
    event.preventDefault()
    const postToAddComment = event.target.closest('li')
    const commentPostId = parseInt(postToAddComment.dataset.id)
    const newComment = event.target.comment.value
    const commentUserName = event.target.username.value 
    console.log(commentPostId)

    let commentToAdd = {
        username: commentUserName,
        content: newComment,
        post_id: commentPostId
    }

console.log(commentToAdd)

    fetch('http://localhost:3000/api/v1/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(commentToAdd),
    })
    .then((r => r.json()))
    .then((updatedCommentObj) => {
        console.log(updatedCommentObj)
        let commentsUl = document.querySelector('ul.all-the-comments')
        let li = document.createElement('li')

        li.innerHTML = `${updatedCommentObj.username} says: ${updatedCommentObj.content}`
        
        commentsUl.append(li)
    })
    addCommentForm.reset()
})





// fetch('http://localhost:3000/api/v1/trips', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body:JSON.stringify(newTripObj),
//  })    
// .then(r => r.json())
// .then(addedTripObj => {
//     let newLi = document.createElement('li')
//     newLi.textContent = `${addedTripObj.location}, ${addedTripObj.date}`
//     tripNavBar.append(newLi)
// })

//  newTripForm.reset()
// })










  // const lis = spiceObj.ingredients.map(ingredient => {
  //   return `<li>${ingredient.name}</li>`
  // })
  // spiceDetails.innerHTML = `
  // <img class="detail-image" src="${spiceObj.image}" alt="${spiceObj.title}" />
  // <h2 class="title">${spiceObj.title}</h2>

  // <div class="ingredients-container">
  //   <h4>Ingredients:</h4>
  //   <ul class="ingredients-list">
  //     ${lis.join("")}
  //   </ul>
  // </div>
  // `



    // let li = document.createElement('li')

    // li.textContent = event.target.comment.value 

    // postComments.append(li)
    


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
            let deleteBtn = document.createElement('button')
            let commentFormDiv = document.createElement('div')
        

            imgNew.src = addedPostObj.img_url 
            newP.textContent = addedPostObj.caption
            likeP.textContent = `Likes: ${addedPostObj.like}`
            likeP.classList.add('likes')
            newLi.dataset.id = addedPostObj.id

            button.textContent = '👍'
            button.classList.add('like-button')
            button.dataset.id = addedPostObj.id 
            deleteBtn.classList.add('delete-post-button')
            deleteBtn.textContent = "X"
            deleteBtn.dataset.id = addedPostObj.id 
            commentFormDiv.innerHTML = `
            <form id="add-comment-form">
<h3>Add a Comment!</h3>
<input
type="text"
value=""
name="username"
placeholder="Please enter your username..."
class="input-username"
/>
<br />
<input
type="text"
value=""
name="comment"
placeholder="Please leave a comment..."
class="input-text"
/>
<br />
<input
type="submit"
name="submit"
value="Add New Comment"
class="submit-comment"
/>
</form>    <br> `


            newLi.append(imgNew, newP, likeP, button, deleteBtn, commentFormDiv)
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
 
            let newLatLong = {
                lng: addedTripObj.longitude,
                lat: addedTripObj.latitude
            }
            let marker = new mapboxgl.Marker()
.setLngLat(newLatLong)
.addTo(map);
// marker.dataset.id = addedTripObj.id 
        })
        
         newTripForm.reset()
  })

postUl.addEventListener('click', (e) => {
if(e.target.matches('.delete-post-button')) {
    const deleteId = parseInt(e.target.dataset.id)
    console.log(deleteId)

    deletePost(deleteId)

    function deletePost(deleteId) {
    fetch(`http://localhost:3000/api/v1/posts/${deleteId}`, {
        method: "DELETE",
    })
    // .then(r => r.json())
    const postGone = e.target.closest("li")
    postGone.remove()
    }
}

if(e.target.matches('.like-button')) {
    const postCard = e.target.closest("li")
    const likesBar = postCard.querySelector('p.likes')
    const likeId = parseInt(e.target.dataset.id)
    const newLikeNum = parseInt(likesBar.textContent.substring(7)) + 1
    console.log(likesBar)
    console.log(postCard)
       console.log(newLikeNum)
       const newLikeObj = {like: newLikeNum}

        addNewLike(newLikeObj, likeId, likesBar)

        }
    })

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
    let newLatLong = {
        lng: trip.longitude,
        lat: trip.latitude
    }
        let popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
    ${trip.location}
        `);
    

    const el = document.createElement('div');
    el.id = 'marker'

    new mapboxgl.Marker()
.setLngLat(newLatLong)
.setPopup(popup)
.addTo(map);
    
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
                            let deleteBtn = document.createElement('button')
                            deleteBtn.classList.add('delete-post-button')
                            deleteBtn.textContent = "X"
                            let commentFormDiv = document.createElement('div')
                            let commentsUl = document.createElement('ul')

                            commentsUl.classList.add('all-the-comments')
                            // if(poster.comments[0].content) {
                            // commentsUl.textContent = poster.comments[0].content
                            // }
                            
                            
                            poster.comments.forEach(comment => {
                                let comLi = document.createElement('li')
                                comLi.innerHTML = `${comment.username} says ${comment.content}`
                                commentsUl.append(comLi)
                            })

                            img.src = poster.img_url 
                            img.alt = poster.caption 
                            p.textContent = poster.caption
                            pLikes.textContent = `Likes: ${poster.like}`
                            pLikes.classList.add('likes')
                            // button.textContent = '👍'
                            button.textContent = poster.id
                            button.classList.add('like-button')
                            button.dataset.id = poster.id 
                            deleteBtn.dataset.id = poster.id 
                            li.dataset.id = poster.id
                            addPostForm.dataset.id = poster.id 
                            console.log(addPostForm.dataset.id)
                            commentFormDiv.innerHTML = `
                            <form id="add-comment-form">
          <h3>Add a Comment!</h3>
          <input
          type="text"
          value=""
          name="username"
          placeholder="Please enter your username..."
          class="input-username"
        />
        <br />
          <input
            type="text"
            value=""
            name="comment"
            placeholder="Please leave a comment..."
            class="input-text"
          />
          <br />
          <input
            type="submit"
            name="submit"
            value="Add New Comment"
            class="submit-comment"
          />
        </form>    <br> `     
          
        li.append(img, p, pLikes, button, deleteBtn, commentsUl, commentFormDiv)
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

mapboxgl.accessToken = 'pk.eyJ1IjoiYXNoaWxsOTkiLCJhIjoiY2tqbHYzYWtsMDM0eDJ4cDQ4M2s2dGRoYSJ9.VL1ntoM7dGFLuXB_D82EYA';
const map = new mapboxgl.Map({
    container: mainMap,
    style: 'mapbox://styles/ashill99/ckjlvk9a10xqi19ohhqbngl85',
    attributionControl: false,
    zoom: 1,
    center: [2.21, 46.2]
})

// const mapBox = document.querySelector('map')
// const markerCopenhagen = new mapboxgl.Marker()
// .setLngLat([12.550343, 55.665957])
// .setPopup(popup)
// .addTo(map);

map.on('click', function(e) {
    // console.log(map)


    let features = map.queryRenderedFeatures(e.point, {});

    console.log(features)

      console.log('click', e.lngLat)
        
      if (!features.length) {
        return;
      }

      let feature = features[0];
      let popup = new mapboxgl.Popup({ offset: [0, -15] })
    .setLngLat(feature.geometry.coordinates)
    .setHTML(`<h3> Hello </h3>`)
    .addTo(map);
});