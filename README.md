# Server

Node.js based API server built using Express.js
A video watch application. Watch videos and earn stars.
See your rank on the leaderboard.

### Install dependencies

```
npm install
```

### Start Server

```
npm start
```

### Sample Data

1. List of users
2. List of videos

### APIs

1. Get the details of a video by id, the API returns a json object that contains

```
Request:
video id

Response:
{
    id: <id>,
    title: "",
    description: "",
    url: ""
}
```

2. Submit API called on completion of a video. It should track the video watched for specific user and do all the star calculations (20 stars per video watch). Pass the user email as identifier in the request header

```
Header:
x-user-email: "noreply@rocked.us"

Request:
video id
```

3. Get leaderboard API. It gives the list of all users with there ranks based on the stars collected by watching videos. Support pagination, filter based on name/gender/department.

```
Response:
[
    {
        email: <email>,
        name: "",
        rank:
    }
]
```

### Guidelines

1. Use of SQL Database is preferred
2. Use of ORM tools/packages is a plus
3. Do not use any AI tool or plugin
4. Make sure to have proper error handling for APIs and field validations
5. Modular well organized code.
6. Feel free to work on a design that is flexible for future extensions

###

1. If you watch the video again today, you want get any stars. If you watch it tomorrow, you can get star.
2. In a you watch (for a particular day)
   for first 2 videos - you get 20 stars each
   for next 3 videos - you get 5 star each
   for next set of videos(after 5 videos for a particular day) - no stars awarded
