/* DOM ELEMents */
let id = 1




const addPostHtml = `
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

postUl.addEventListener('submit', (e) => {
    e.preventDefault()
    const closeDiv = e.target.closest('div')
    // const closestUl = document.querySelector(`[data-id="${e.target.dataset.id}]`)
    console.log(e.target)
    const closestUl = e.target.closest('ul')
    const postId = closeDiv.dataset.id 
    console.log(postId)
    const addCommentForm = document.querySelector('#add-comment-form')
    console.log(addCommentForm)
    const postToAddComment = e.target.closest('li')
    const commentForm = document.querySelector('.all-the-comments')
    console.log(commentForm)
    // const closestCommentForm = e.target.closest(commentForm)
    // const commentPostId = parseInt(commentForm.dataset.id)
    // console.log(commentPostId)
    const newComment = e.target.comment.value
    const commentUserName = e.target.username.value 
    console.log(commentUserName)
    console.log(newComment)
    console.log(postId)

    let commentToAdd = {
        username: commentUserName,
        content: newComment,
        post_id: postId
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
        let li = document.createElement('li')
        li.innerHTML = `${updatedCommentObj.username} says: ${updatedCommentObj.content}`
        
        postUl.append(li)
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
            console.log(addedPostObj.id)


            let divPost = document.createElement('div')
                            
                            let divCard = document.createElement('div')
                            divCard.classList.add('card')
                            divCard.style.width = "18rem"

                            let divCardBody = document.createElement('div')
                            divCardBody.classList.add('card-body')
                            divCardBody.dataset.id = addedPostObj.id 

                            let imgTop = document.createElement('img')
                            imgTop.classList.add('card-img-top')

                            imgTop.src = addedPostObj.img_url 
                            imgTop.alt = addedPostObj.caption 

                        //       <h5 class="card-title">${addedPostObj.caption}</h5>

                            let h4 = document.createElement('h4')
                            h4.classList.add('card-title')
                            h4.textContent = addedPostObj.caption

                            let likeButton = document.createElement('button')
                            likeButton.innerHTML = `❤️ ${addedPostObj.like}`
                            likeButton.classList.add('like-button')
                            likeButton.dataset.id = addedPostObj.id 

                            let deleteButton = document.createElement('button')
                            deleteButton.classList.add('delete-post-button')
                            deleteButton.textContent = "🗑️"
                            deleteButton.dataset.id = addedPostObj.id 


                            let commentsUl2 = document.createElement('ul')

                            commentsUl2.classList.add('all-the-comments') 
                            commentsUl2.dataset.id = addedPostObj.id 
                            
                            addedPostObj.comments.forEach(comment => {
                                let comLi = document.createElement('li')
                                comLi.innerHTML = `${comment.username} says ${comment.content}`
                                commentsUl2.append(comLi)
                            })

                        let commentFormDiv2 = document.createElement('div')
                        commentFormDiv2.dataset.id = addedPostObj.id 
                          commentFormDiv2.innerHTML = `
                          <br>
                          <form id="add-comment-form" data-id="${addedPostObj.id}">
                          <p>Add a Comment!</p>
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
                          data-id="${addedPostObj.id}"
                            type="submit"
                            name="submit"
                            value="Add New Comment"
                            class="submit-comment"
                          />
                        </form>    <br>`

                            divCardBody.append(h4, likeButton, deleteButton, commentsUl2, commentFormDiv2)
                            divCard.append(imgTop, divCardBody)
                            divPost.append(divCard)
                            postUl.append(divPost)

            // let newLi = document.createElement('li')
            // let newP = document.createElement('p')
            // let likeP = document.createElement('p')
            // let imgNew = document.createElement('img')
            // let button = document.createElement('button')
            // let deleteBtn = document.createElement('button')
            // let commentFormDiv = document.createElement('div')
        

            // imgNew.src = addedPostObj.img_url 
            // newP.textContent = addedPostObj.caption
            // likeP.textContent = `Likes: ${addedPostObj.like}`
            // likeP.classList.add('likes')
            // newLi.dataset.id = addedPostObj.id

            // button.textContent = '👍'
            // button.classList.add('like-button')
            // button.dataset.id = addedPostObj.id 
            // deleteBtn.classList.add('delete-post-button')
            // deleteBtn.textContent = "X"
            // deleteBtn.dataset.id = addedPostObj.id 
            // commentFormDiv.innerHTML = addPostHtml


            // newLi.append(imgNew, newP, likeP, button, deleteBtn, commentFormDiv)
            // postUl.append(newLi)

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
            let htmlPop = `<div class="marker-popup" data-id="${addedTripObj.id}">${addedTripObj.location} </div>`
            let popup = new mapboxgl.Popup({ offset: 25 }).setHTML(htmlPop)

            let marker = new mapboxgl.Marker()
.setLngLat(newLatLong)
.setPopup(popup)
.addTo(map);
marker.getElement().dataset.id = addedTripObj.id 
console.log(marker)
marker.getElement().addEventListener('click', function (e) { console.log("marker clicked");
let newId = parseInt(addedTripObj.id)
addPostForm.dataset.id = newId
            console.log(addPostForm.dataset.id)
            tripTitle.innerHTML = `${addedTripObj.location}, ${addedTripObj.date}`

            // console.log(userObj)
            console.log(newId)

            postUl.innerHTML = ''
                addedTripObj.posts.forEach(poster => {

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
                            commentsUl.dataset.id = poster.id 
                            commentFormDiv.dataset.id = poster.id 
                            
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
                            <form id="add-comment-form" data-id="${poster.id}">
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
          data-id="${poster.id}"
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

});

        })

         newTripForm.reset()
  })

postUl.addEventListener('click', (e) => {
if(e.target.matches('.delete-post-button')) { 
    console.log(e.target)
    const deleteId = parseInt(e.target.dataset.id)
    console.log(deleteId)

    deletePost(deleteId)

    function deletePost(deleteId) {
    fetch(`http://localhost:3000/api/v1/posts/${deleteId}`, {
        method: "DELETE",
    })
    // .then(r => r.json())
    const postGone = e.target.closest("div")
    const alsoPostGone = postGone.closest('div.card')
    postGone.remove()
    alsoPostGone.remove()
    }
}

if(e.target.matches('.like-button')) {
    console.log(e.target)
    const divCardBody = e.target.closest("div")
    const likeButton = divCardBody.querySelector('.like-button')
    console.log(likeButton)

    const likeId = parseInt(divCardBody.dataset.id)
    const newLikeNum = parseInt(likeButton.textContent.substring(2)) + 1

    console.log(divCardBody)    
    console.log(likeId)
    console.log(newLikeNum)
    const newLikeObj = {like: newLikeNum}

    addNewLike(newLikeObj, likeId, likeButton)

        }
    })

    function addNewLike(newLikeObj, likeId, likeButton) {
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
         likeButton.textContent = `❤️ ${updatedObj.like}`
     })
    }

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

    let htmlPop = `<div class="marker-popup" data-id="${trip.id}">${trip.location} </div>`

        let popup = new mapboxgl.Popup({ offset: 25 }).setHTML(htmlPop)
    

    const el = document.createElement('div');
    el.id = 'marker'

   let marker = new mapboxgl.Marker()
.setLngLat(newLatLong)
.setPopup(popup)
.addTo(map);
marker.getElement().dataset.id = trip.id 

// marker.dataset.id = trip.id 
marker.getElement().addEventListener('click', function (e) { console.log("marker clicked");
let newId = parseInt(trip.id)
console.log(newId)
            addPostForm.dataset.id = newId
            console.log(addPostForm.dataset.id)
            tripTitle.innerHTML = `${trip.location}, ${trip.date} <button class="delete-trip-button" data-id="${trip.id}">Delete</button>`

            console.log(userObj)
            console.log(newId)

            postUl.innerHTML = ''
                userObj.posts.forEach(poster => {

                if(poster.trip_id === newId) {
                            console.log(poster)

                            let divPost = document.createElement('div')
                            
                            let divCard = document.createElement('div')
                            divCard.classList.add('card')
                            divCard.style.width = "18rem"

                            let divCardBody = document.createElement('div')
                            divCardBody.classList.add('card-body')
                            divCardBody.dataset.id = poster.id 

                            let imgTop = document.createElement('img')
                            imgTop.classList.add('card-img-top')

                            imgTop.src = poster.img_url 
                            imgTop.alt = poster.caption 

                        //       <h5 class="card-title">${poster.caption}</h5>

                            let h4 = document.createElement('h4')
                            h4.classList.add('card-title')
                            h4.textContent = poster.caption

                            let likeButton = document.createElement('button')
                            likeButton.innerHTML = `❤️ ${poster.like}`
                            likeButton.classList.add('like-button')
                            likeButton.dataset.id = poster.id 

                            let deleteButton = document.createElement('button')
                            deleteButton.classList.add('delete-post-button')
                            deleteButton.textContent = "🗑️"
                            deleteButton.dataset.id = poster.id 


                            let commentsUl2 = document.createElement('ul')

                            commentsUl2.classList.add('all-the-comments') 
                            commentsUl2.dataset.id = poster.id  
                            
                            poster.comments.forEach(comment => {
                                let comLi = document.createElement('li')
                                comLi.innerHTML = `${comment.username} says ${comment.content}`
                                commentsUl2.append(comLi)
                            })

                        let commentFormDiv2 = document.createElement('div')
                        commentFormDiv2.dataset.id = poster.id 
                          commentFormDiv2.innerHTML = `
                          <br>
                          <form id="add-comment-form">
                          <p>Add a Comment!</p>
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
                        </form>    <br>`

                            divCardBody.append(h4, likeButton, deleteButton, commentsUl2, commentFormDiv2)
                            divCard.append(imgTop, divCardBody)
                            divPost.append(divCard)
                            postUl.append(divPost)

                            console.log(divCard)
                        //     divPost.innerHTML = 
                        //     `<div class="card" style="width: 18rem;">
                        //     <img class="card-img-top" src=${poster.img_url} alt=${poster.caption}>
                        //     <div class="card-body">
                        //       <h5 class="card-title">${poster.caption}</h5>
                        //       <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        //       <a href="#" class="btn btn-primary">❤️ ${poster.like}</a>
                        //       <br>
                        //       <br>
                        //       <a href="#" class="btn btn-primary">Delete</a>
                              
                        //     </div>
                        //   </div> `
                          
                            // const divCardBody = document.querySelector('p.card-text')
                            // let commentsUl2 = document.createElement('ul')
                            

                            // commentsUl2.classList.add('all-the-comments') 
                            
                            // poster.comments.forEach(comment => {
                            //     let comLi = document.createElement('li')
                            //     comLi.innerHTML = `${comment.username} says ${comment.content}`
                            //     commentsUl2.append(comLi)
                            // })
                        // divPost.append(commentsUl2, commentFormDiv2, divCard)
                        // postUl.append(divPost)







        //                     let li = document.createElement('li')
        //                     let img = document.createElement('img')
        //                     let p = document.createElement('p')
        //                     let pLikes = document.createElement('p')
        //                     let button = document.createElement('button')
        //                     let deleteBtn = document.createElement('button')
        //                     deleteBtn.classList.add('delete-post-button')
        //                     deleteBtn.textContent = "X"
        //                     let commentFormDiv = document.createElement('div')
        //                     let commentsUl = document.createElement('ul')

        //                     commentsUl.classList.add('all-the-comments') 
                            
        //                     poster.comments.forEach(comment => {
        //                         let comLi = document.createElement('li')
        //                         comLi.innerHTML = `${comment.username} says ${comment.content}`
        //                         commentsUl.append(comLi)
        //                     })


        //                     img.src = poster.img_url 
        //                     img.alt = poster.caption 
        //                     p.textContent = poster.caption
        //                     pLikes.textContent = `Likes: ${poster.like}`
        //                     pLikes.classList.add('likes')
        //                     // button.textContent = '👍'
        //                     button.textContent = poster.id
        //                     button.classList.add('like-button')
        //                     button.dataset.id = poster.id 
        //                     deleteBtn.dataset.id = poster.id 
        //                     li.dataset.id = poster.id
        //                     addPostForm.dataset.id = poster.id 
        //                     console.log(addPostForm.dataset.id)
        //                     commentFormDiv.innerHTML = `
        //                     <form id="add-comment-form">
        //   <h3>Add a Comment!</h3>
        //   <input
        //   type="text"
        //   value=""
        //   name="username"
        //   placeholder="Please enter your username..."
        //   class="input-username"
        // />
        // <br />
        //   <input
        //     type="text"
        //     value=""
        //     name="comment"
        //     placeholder="Please leave a comment..."
        //     class="input-text"
        //   />
        //   <br />
        //   <input
        //     type="submit"
        //     name="submit"
        //     value="Add New Comment"
        //     class="submit-comment"
        //   />
        // </form>    <br> `     
          
        // li.append(img, p, pLikes, button, deleteBtn, commentsUl, commentFormDiv)
        //                     postUl.append(li)
                        }
                    })
});

// markerPopup.addEventListener('click', e => {
//     console.log('click')
// })

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
// // .setPopup(popup)
// .addTo(map);


// mainMap.addEventListener('click', e => {
//     console.log(e.target)
// })

// map.on('click', function(e) {
//     console.log(e.target)

//     // if(e.target.matches('.marker-popup')) {
//     //     console.log('clicked correct')
//     // }

//     let features = map.queryRenderedFeatures(e.point, {});

//     console.log(features)

//       console.log('click', e.lngLat)
        
//       if (!features.length) {
//         return;
//       }

//       let feature = features[0];
//       let popup = new mapboxgl.Popup({ offset: [0, -15] })
//     .setLngLat(feature.geometry.coordinates)
//     .setHTML(`<h3> Hello </h3>`)
//     .addTo(map);
// });



tripTitle.addEventListener('click', e => {
    if(e.target.matches('.delete-trip-button')) {
    const divDelete = document.querySelector('.delete-trip-button')
    const deleteId = parseInt(e.target.dataset.id)
    console.log(divDelete)
    console.log(deleteId)

    const tripTitleDelete = e.target.closest('h1')

console.log(mainMap)
// .mapboxgl-marker mapboxgl-marker-anchor-center
let markToGo = document.querySelector(`div[data-id="${deleteId}"]`)
let popupToGo = document.querySelector('div.marker-popup')
let popupToGo2 = document.querySelector('div.mapboxgl-popup-content')
// let markToGo = document.querySelector('div[aria-label="Map marker"')
console.log(markToGo)
    deleteTrip(deleteId)
    tripTitleDelete.innerHTML = ""
    postUl.innerHTML = ""
    addPostForm.innerHTML = ""
    markToGo.remove()
    popupToGo.remove()
    popupToGo2.remove()
    

}
}
)

function deleteTrip(deleteId) {
    fetch(`http://localhost:3000/api/v1/trips/${deleteId}`, {
        method: "DELETE",
    })
    }