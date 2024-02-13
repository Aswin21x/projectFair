import { commonAPI } from "./commonAPI"
import SERVER_URL from "./serverUrl"

//register API
export const registerAPI = async(user)=>{
    return await commonAPI("POST",`${SERVER_URL}/register`,user,"")
}

//login
export const loginAPI = async(user)=>{
    return await commonAPI("POST",`${SERVER_URL}/login`,user,"")
}

//add pro api
export const addProjectAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/add-project`,reqBody,reqHeader)

}


//getHome projects
export const getHomeProjectsAPI = async()=>{
    return await commonAPI("GET",`${SERVER_URL}/get-home-projects`,"","")
   
}

//get all projects
export const getAllProjectsAPI = async(searchKey,reqHeader)=>{
return await commonAPI("GET",`${SERVER_URL}/get-all-projects?search=${searchKey}`,"",reqHeader)
}

//get user projects
export const getUserProjectsAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/get-user-projects`,"",reqHeader)
    }


    //user edit
    export const updateUserProfileAPI = async(reqBody,reqHeader)=>{
        return await commonAPI("PUT",`${SERVER_URL}/user/edit`,reqBody,reqHeader)
    }

    //project/edit
    export const updateProjectAPI = async(projectId,reqBody,reqHeader)=>{
        return await commonAPI("PUT",`${SERVER_URL}/project/edit/${projectId}`,reqBody,reqHeader)
    }
 
    //remove project
    export const deleteProjectAPI = async(projectId,reqHeader)=>{
        return await commonAPI("DELETE",`${SERVER_URL}/remove-project/${projectId}`,{},reqHeader)
    }