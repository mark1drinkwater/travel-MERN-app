import React from "react";
import { useParams } from "react-router-dom";

import './UserPlaces';
import PlaceList from "../components/PlaceList";

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg',
        address: '20 W 34th St., New York, NY 10001',
        location: {
            lat: 40.7484405,
            long: -73.9878584
        },
        creator: 'u1'
    },
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        imageUrl: 'https://media.timeout.com/images/101705309/750/422/image.jpg',
        address: '20 W 34th St., New York, NY 10001',
        location: {
            lat: 40.7484405,
            long: -73.9882393
        },
        creator: 'u2'
    }
];

const UserPlaces = () => {
    // Retrieves the userId from the URL parameter
    const userId = useParams().userId;
    // Filters out to only show the places shown by the creator.
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);

    return (
        <PlaceList items={loadedPlaces} />
    );
}

export default UserPlaces;