# ScorpBackendInterviewSolutions

Imagine we have a social media application. This application has very simple features:


•	A user can sign up using a username, email and password.
•	Each user has an account containing his username, email, full name, profile picture and bio.
•	Each user can follow and unfollow another user, and they can see people who they follow or who follows them.
•	Each user can like another user’s posts.
•	Each user can post a photo which can be seen in his profile in chronological order.

We are using a SQL database to store information. The database diagram is shown below (For simplicity, authentication information is omitted).


 


Q1 - Day-to-day programming (approx. 15 minutes)
We are implementing a simple procedure to get information for a list of posts that might be used in arbitrary places for our project. (Think of this like a random post feed on Instagram.) Write a simple function (signature is given below) to get all information for given post ids.

Note: You don’t have to adhere to any language or syntax, just make sure that the execution steps are logically correct.

Data structures that should be returned from the function
struct User:
   id: int
   username: string
   full_name: string
   profile_picture: string
   followed: boolean  // whether or not requesting user follows

struct Post:
   id: int
   description: string
   owner: User
   image: string
   created_at: int
   liked: boolean  // whether or not requesting user likes

Signature 
def get_posts(user_id: int, post_ids: List[int]) -> List[Post]: // implement

Input parameters
user_id	The requesting user id. Use this to determine liked field of struct Post and followed field of struct User
post_ids	List of post ids that are requested

Requirements / Assumptions
•	Assume given post_ids are unique.
•	Procedure should return a list of struct Post in the same order as post_ids.
•	Procedure should place null values for non-existing posts in the resulting list.
•	You can only read from a single table in each query (no joins are allowed).
•	You can use this kind of format for executing SQL queries:
db_posts = SELECT * FROM post WHERE id IN post_ids
