'use client'

import { useEffect, useState } from "react";

import { useOrbis } from "@/lib/hooks/use-orbis";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export function UpdateProfile() {
    const [trainingData, setTrainingData] = useState({
        voiceId: '',
        data: ''
    })
    const { profileData, updateTrainingData, user, connect, data, voiceId } = useOrbis()

    useEffect(() => {
        if (profileData) {
            setTrainingData({
                voiceId: voiceId,
                data: data
            })
        }

    }, [profileData])

    return (
        <div className="flex flex-col w-full max-w-2xl text-center mx-auto justify-center gap-4 py-16">
            <form onSubmit={(e) => {
                e.preventDefault()
                updateTrainingData(trainingData)
            }} className="flex flex-col gap-4 mt-4">
                <p className="font-bold">Profile Training Data</p>
                <Textarea value={trainingData.data} onChange={
                    (e) => {
                        setTrainingData({
                            ...trainingData,
                            data: e.target.value
                        })
                    }
                } placeholder="Enter your profile data here" />

                <p className="font-bold mt-4">Elevenlabs VoiceId</p>
                <Textarea value={voiceId} onChange={
                    (e) => {
                        e.preventDefault()
                        setTrainingData({
                            ...trainingData,
                            voiceId: e.target.value
                        })
                    }
                } placeholder="Enter your elevenlabs voiceId here" />

                {user ?
                    <Button className="mx-auto mt-4" type="submit">Update Profile</Button>
                    :
                    <Button className="mx-auto mt-4" onClick={(e) => {
                        e.preventDefault;
                        connect()
                    }}>Connect</Button>
                }


            </form >
        </div >
    )
};


