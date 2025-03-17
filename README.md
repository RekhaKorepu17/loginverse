### Cloud adventure
It is a simple web-application where users register to a system with their details like firstname, lastName and profile.

#### Features
##### User-Authentication
users can registerby giving the necessary details. User data is stored in Amazon RDS database. The user-profile is stored in S3 bucket.

##### Resize-profile
When a image is uploaded to S3 bucket, lambda function is triggered and it resizes the user-profile and stores it in another S3 bucket.

##### Demo-video
When users access the application, a demo video is played which includes how to register to the system. It will help and enhance user experience to register easily.

