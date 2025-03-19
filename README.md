### Cloud adventure
It is a simple web-application where users register to a system with their details like firstname, lastName and profile.

#### Features
##### User-Authentication
users can registerby giving the necessary details. User data is stored in Amazon RDS database. The user-profile is stored in S3 bucket.

##### Resize-profile
When a image is uploaded to S3 bucket, lambda function is triggered and it resizes the user-profile and stores it in another S3 bucket.

##### Demo-video
When users access the application, a demo video is played which includes how to register to the system. It will help and enhance user experience to register easily.


## Technologies Used
- React.js
- Node.js

## Installation and Setup

### Prerequisites
Ensure the following are installed on your system:
- Node.js 
- npm 


### Steps to Clone and Run the Project
1. Clone the repository:
``` '
git clone https://github.com/RekhaKorepu17/loginverse.git

```
2. Navigate to project directory
``` '
cd loginverse
```
3. Install dependencies
```
npm install
```
4.  Start the application:
```
npm run dev
```
Once the application starts, open your browser and navigate to `http://localhost:5173` to access the Event Management System.
