'use client'

import { useEffect, useState } from "react";

import { Orbis } from "@orbisclub/orbis-sdk";

const orbis = new Orbis({});

export function useOrbis(username?: string) {
    const [user, setUser] = useState();
    const [profileData, setProfileData] = useState<any>();
    const [fetchedProfileData, setFetchedProfileData] = useState<any>();
    const data = profileData?.details?.profile?.data?.trainingData.data;
    const voiceId = profileData?.details?.profile?.data?.trainingData?.voiceId;

    useEffect(() => {
        if (!profileData) {
            orbis.isConnected().then((res: any) => {
                setProfileData(res);
            });
            if (username && !fetchedProfileData) {
                orbis.getProfilesByUsername(username).then((res: any) => {
                    setFetchedProfileData(res);
                });
            }
        }
    }, [profileData, username, fetchedProfileData]);

    /** Calls the Orbis SDK and handles the results */
    async function connect() {
        const res = await orbis.connect_v2({ chain: "ethereum", lit: false });

        /** Check if the connection is successful or not */
        if (res.status == 200) {
            setUser(res.did);
        } else {
            console.log("Error connecting to Ceramic: ", res);
            alert("Error connecting to Ceramic.");
        }
    }

    const updateTrainingData = async (trainingData: Record<string, string>) => {
        const res = await orbis.updateProfile({
            data: {
                trainingData
            }
        });
    }




    return {
        orbis,
        profileData,
        data,
        voiceId,
        updateTrainingData,
        user,
        connect,
        fetchedProfileData
    }
};
