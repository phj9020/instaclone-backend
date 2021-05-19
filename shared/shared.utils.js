import AWS from "aws-sdk";

// login
AWS.config.update({
    credentials: {
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET
    }
})


export const uploadPhoto = async(file, userId) => {
    const {filename, createReadStream} = await file;
    const objectName = `${userId}-${Date.now()}-${filename}`;
    const readStream = createReadStream();

    const upload = await new AWS.S3().upload({
        Bucket: "instaclone-phj9020",    //bucket name 
        Key: objectName,
        ACL: "public-read",
        Body: readStream,
    }).promise()


    // console.log(upload);
    return upload.Location;
}