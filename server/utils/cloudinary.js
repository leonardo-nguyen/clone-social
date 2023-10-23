import {v2 as _cloudinary} from "cloudinary"

const cloudinary = () => {
    const runtimeConfig = useRuntimeConfig();

    _cloudinary.config({
        cloud_name: runtimeConfig.cloudinaryCloudName,
        api_key: runtimeConfig.cloudinaryApiKey,
        api_secret: runtimeConfig.cloudinaryApiSecret,
    })

    return _cloudinary
}

export const uploadToCloudinary = async (image) => {{
    try {
        const result = await cloudinary().uploader.upload(image);
        return result;
    }
    catch(error){
        throw error
    }
}}