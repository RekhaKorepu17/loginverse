import { useForm } from "react-hook-form";
import "./register.css";
import profile from "../assets/profile-pic.jpeg";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import axios from "axios";
import { useState } from "react";

export const Register = () => {
  const [imageUrl, setImageUrl] = useState(" ");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const registerUser = async (data: any) => {
    try {
      const formData = {
        firstName: data.firstname,
        lastName: data.lastname,
        imageUrl,
      };
      const response = await axios.post('http://13.232.204.144:3005/api/users', formData);
      if (response.status === 201) {
        window.alert("User registered successfully");
      } else if (response.status === 409) {
        window.alert("User already exists");
      }
    } catch (err) {
      window.alert("Eror while creating a user");
    }
  };

  const S3_BUCKET = import.meta.env.VITE_S3_BUCKET || "";
  const REGION = import.meta.env.VITE_REGION || "";
  const s3Client = new S3Client({
    region: REGION,
    credentials: {
      accessKeyId: import.meta.env.VITE_ACCESS_KEY_ID || "",
      secretAccessKey: import.meta.env.VITE_SECRET_ACCESS_KEY || "",
    },
  });

  const uploadToS3 = async (event: any) => {
    const selectedProfile = event.target.files[0];
    if (!selectedProfile) {
      alert("No image selected");
      return;
    }
    const profileInfo = await selectedProfile.arrayBuffer();
    const params = {
      Bucket: S3_BUCKET,
      Key: selectedProfile.name,
      Body: profileInfo,
      ContentType: selectedProfile.type,
      Credential: {
        accessKeyId: import.meta.env.VITE_ACCESS_KEY_ID || "",
        secretAccessKey: import.meta.env.VITE_SECRET_ACCESS_KEY || "",
      },
    };

    try {
      const results = await s3Client.send(new PutObjectCommand(params));
      const uploadedImageUrl =
        `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${selectedProfile.name}` ||
        " ";
      setImageUrl(uploadedImageUrl);

      return results;
    } catch (err) {
      console.log("Error", err);
      window.alert("Error uploading image");
    }
  };
  return (
    <>
      <div className="wrapper">
        <img className="profile" src={profile} />
        <input data-testid="file-upload" type="file" onChange={uploadToS3} />
      </div>

      <form className="register-form" onSubmit={handleSubmit(registerUser)}>
        <label>Firstname</label>
        <input type="text" {...register("firstname", { required: true })} />
        {errors.firstname && <p role="alert">First name is required</p>}

        <label>Lastname</label>
        <input type="text" {...register("lastname", { required: true })} />
        {errors.lastname && <p role="alert">Last name is required </p>}

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
      <video width={600} height={400} controls loop autoPlay>
        <source
          src="https://d90y3w005lpp6.cloudfront.net/register-demo-video.mp4"
          type="video/mp4"
        />
      </video>
    </>
  );
};
