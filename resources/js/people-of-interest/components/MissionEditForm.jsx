import axios from "axios";
import React, { useState, useEffect } from "react";

const MissionEditForm = ({ missionId, setMissionId }) => {
    const [mission, setMission] = useState(null);
    const [values, setValues] = useState({
        name: null,
        year: null,
        outcome: null,
    });
    const [message, setMessage] = useState(null);

    const fetchMission = async () => {
        try {
            const response = await axios.get("/api/missions/" + missionId);

            setMission(response.data);
            setValues({
                name: response.data.name ?? "",
                year: response.data.year ?? "",
                outcome: response.data.outcome ?? "",
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchMission();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "/api/missions/store/" + mission.id,
                values
            );

            fetchMission();
            setMessage(response.data.message);
        } catch (error) {
            console.log(error);
            setMessage(error.response.data.message);
        }
    };

    const handleChange = (event) => {
        setValues((previousValues) => {
            return {
                ...previousValues,
                [event.target.name]: event.target.value,
            };
        });

        setMission((previousMission) => {
            return {
                ...previousMission,
                [event.target.name]: event.target.value,
            };
        });
    };

    return (
        <>
            <button onClick={() => setMissionId(null)}>
                Go back to missions list
            </button>
            {mission ? (
                <>
                    <h1>
                        Mission - {mission.name} ({mission.year})
                    </h1>

                    <h2>Edit mission:</h2>
                    {message ? <p>{message}</p> : ""}

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={mission.name}
                            onChange={handleChange}
                        />
                        <label htmlFor="year">Year</label>
                        <input
                            type="number"
                            id="year"
                            name="year"
                            value={mission.year}
                            onChange={handleChange}
                        />

                        <label htmlFor="outcome">Outcome</label>
                        <select
                            id="outcome"
                            name="outcome"
                            value={mission.outcome}
                            onChange={handleChange}
                        >
                            <option value={""}>Unknown</option>
                            <option value={"success"}>Success</option>
                            <option value={"failure"}>Failure</option>
                        </select>

                        <button type="submit">Save</button>
                    </form>
                </>
            ) : (
                ""
            )}
        </>
    );
};

export default MissionEditForm;
