import DBconnect from "../db/index.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import axios from "axios";



const analyzer=asyncHandler(async (req, res) => {
    try {
        const username = req.params.username;

        // 1. GitHub API call
        const response = await axios.get(`https://api.github.com/users/${username}`);
        const data = response.data;

        // 2. Extract useful info
        const userData = {
            username: data.login,
            name: data.name,
            public_repos: data.public_repos,
            followers: data.followers,
            following: data.following
        };

        // 3. Save to DB
        const sql = `
            INSERT INTO profiles 
            (username, name, public_repos, followers, following)
            VALUES (?, ?, ?, ?, ?)
        `;

        await DBconnect.execute(sql, [
            userData.username,
            userData.name,
            userData.public_repos,
            userData.followers,
            userData.following
        ]);

        // 4. Response
        return res.status(201).json(
            new ApiResponse(
                201,
                "user analyzed and saved successfully",
                userData
            )
        );

    } 
    catch (error) {
        console.log("Error file fetching github username: ",error)
        throw new ApiError(
            500,
            error?.response?.data?.message || "error analyzing gitHub user"
        );
    }
});



const getAllProfiles = asyncHandler(async (req, res) => {
    try {
        const [rows] = await DBconnect.execute(
            "SELECT * FROM profiles ORDER BY id DESC"
        );

        return res.status(200).json(
            new ApiResponse(
                200, 
                rows, 
                "all profiles fetched successfully"
            )
        );

    } 
    catch (error) {
        console.log("Error file fetching profile: ",error)
        throw new ApiError(
            500, 
            "error fetching profiles"
        );
    }
});



const getProfileByUsername = asyncHandler(async (req, res) => {
    try {
        const { username } = req.params;

        const [rows] = await DBconnect.execute(
            "SELECT * FROM profiles WHERE username = ?",
            [username]
        );

        if (rows.length === 0)
            throw new ApiError(
                404, 
                "profile not found"
            );

        return res.status(200).json(
            new ApiResponse(
                200, 
                rows[0], 
                "profile fetched successfully"
            )
        );

    } 
    catch (error) {
        console.log("Error while fetch single profile: ",error)
        throw new ApiError(
            500,
            error.response?.data?.message || "error fetching profile"
        );
    }
});

export {analyzer,getProfileByUsername,getAllProfiles};