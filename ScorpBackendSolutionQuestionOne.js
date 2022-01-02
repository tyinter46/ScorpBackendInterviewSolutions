//User declarations
const user_id = Math.random() * 1000000000
let username
let full_name
let profile_picture


// get random likes or followers (boolean)
const getRandomLikesOrFollowers = () => {
  const trueOrFalse = Math.floor(Math.random() * 2 + 1)
  return trueOrFalse == 1 ? false : true
}

// generate random text for username and full_names
function randomText() {
  const output = (0|Math.random()*9e6).toString(36)
  return output
}

//create a user constructor
function User() {
  this.user_id = 1,
    this.username = randomText(),
    this.full_name = full_name,
    this.profile_picture = profile_picture,
    this.followed = getRandomLikesOrFollowers()
}

//create an instance of a new random user

const newRandomUser = new User()
newRandomUser.user_id = 1
newRandomUser.username = randomText()
newRandomUser.full_name =  randomText() + " " + randomText()
newRandomUser.profile_picture = profile_picture
newRandomUser.followed = getRandomLikesOrFollowers()


//Posts declarations
let post_id //= Math.floor(Math.random() * 20000000000)
let description
let owner = User
let image
let created_at = Date.now()
let liked = false

// creating a Post constructor
function Post(description, post_id) {
  this.post_id = post_id,
    this.description = description,
    this.owner = owner,
    this.image = image,
    this.created_at = created_at,
    this.getRandomLikes = getRandomLikesOrFollowers()
}

//instances of hardcoded posts
const firstPost = new Post(null, 1)
const secondPost = new Post("i am the first post", 2)
const thirdPost = new Post("i am the third post", 3)
const fourthPost = new Post("i am the fourth post", 4)
const fifthPost = new Post("hi", 5)


//assuming there are five posts 
// and posts are sent to the server in no particular order
const posts = [secondPost, firstPost, fifthPost, fourthPost, thirdPost]

// function to return an array of posts with null values inclusive 
const getPostsWithNullValuesInclusive = () => {

  try {
    const postsWithNullValuesInclusive = []

    //  set post to null if there is no image and description
    posts.forEach(post => {

      if (post.description == null && post.image == undefined) {

        post = null

      }

      postsWithNullValuesInclusive.push(post)
      postsWithNullValuesInclusive.sort()

    });


    //  console.log(postsWithNullValuesInclusive)
    return postsWithNullValuesInclusive.sort()

  }
  catch (error) {
    console.log(error.message)
  }
}





// Finally unto the main problem solution
const getPosts = (user_id, postIds) => {
   
  // a function that returns a boolean value to check if user exist in the database
  const userIfExist = () => {
    if (user_id == newRandomUser.user_id) {
      return true
    } else return false
  }


  
  const postIdsFromServer = []
  //This step is taken to push null and post_id of posts in an array called 
  //postIdsFromServer since each post has its own id and the post_id value of a null post is null in this case  
  getPostsWithNullValuesInclusive().forEach(post => {
    if (post == null) {
      postIdsFromServer.push(post)
    } else {
      postIdsFromServer.push(post.post_id)
      return postIdsFromServer.sort()
    }

  })


  const existingPostIds = []
  //This step is taken to compare the post_id of posts requested from the user and compare it with 
  //the postIdsFromServer to see if there are matches and store it in an array called existingPostIds
    postIds.forEach(postId => {
    if (postIdsFromServer.includes(postId)  ) {
      existingPostIds.push(postId)
      existingPostIds.sort()
    } else if (postIdsFromServer.includes(null)){
      existingPostIds.push(null)
      existingPostIds.sort()
    }

  });



  const postResults = []
//Finally this step is  taken to fetch available posts requested by the user from 
//postWithNullValuesInclusive (coming from the server)      
// 
  getPostsWithNullValuesInclusive().forEach(postWithNullValueInclusive => {
    //allow results of posts requested to include null posts 
    if (postWithNullValueInclusive == null && existingPostIds.includes(postWithNullValueInclusive)) {
      postResults.push(null)
      // compare the post_id requested with post_id from server and push that post to an array called postResults
     } else if (existingPostIds.includes(postWithNullValueInclusive.post_id)  ){
       postResults.push(postWithNullValueInclusive)
       postResults.sort()
    }

  })

  console.log(existingPostIds, postResults)
  const isUserExist = userIfExist()
  if (isUserExist) {

    return `${JSON.stringify(newRandomUser)} requested for ${JSON.stringify(postResults)} }`
  } else {
    return 'userId or Posts Does not exist'
  }
}


// the only user available has an id of 1 and there are only five posts available in the datase with post_ids from 1 -5  
// only the post_id of 1 has null value 
console.log(getPosts(1, [5,0,1, 4 ]))
