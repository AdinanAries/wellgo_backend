const RatedPlaces = require("../models/ratedPlaces");
const wellgo_reviewer = '../data/wellgo_reviewer.jpg';
const wellgo_reviewer2 = '../data/wellgo_reviewer2.jpg';
const wellgo_reviewer3 = '../data/wellgo_reviewer3.jpg';
const wellgo_reviewer4 = '../data/wellgo_reviewer4.jpg';
const wellgo_reviewer5 = '../data/wellgo_reviewer5.jpg';
const wellgo_reviewer6 = '../data/wellgo_reviewer6.jpg';
const defaultProf = "../data/defaultProf2.jpg";
const photo5 = "../data/explore_destination_img1.jpg";
const photo7 = "../data/explore_destination_img3.jpg";
const AccraImg = "../data/citiesImg/AccraGhana.jpg";
const LAImg = "../data/citiesImg/LA_US.jpg";
const ParisImg = "../citiesImg/Paris.jpg";
const pic1 = "../explore_destination_img.jpg";
const pic2 = "../explore_destination_img1.jpg";
const pic3 = "../explore_destination_img2.jpg";
const pic4 = "../explore_destination_img4.jpg";
const pic5 = '../explore_destination_img3.jpg';
const pic6 = "../explore_destination_img5.jpg";
const pic7 = "../explore_destination_img6.jpg";
const pic8 = "../explore_destination_img7.jpg";
const pic9 = "../explore_destination_img8.jpg";

const getAllRatedPlace = (req, res, next) => {
    try{
        res.status(201).send([
            {
                place: {
                    name: "London Bridge",
                    city: "London",
                    airport_name: "London Airport",
                    price: "24.35",
                    map_address: "",
                    currency: "USD",
                    IATA: "LHR",
                    ICAO: "EGLL",
                    pictures: [AccraImg, LAImg, ParisImg]
                },
                scores: {
                    safety: {
                        rating: 7,
                        notes: "Good to know",
                        url: ""
                    },
                    subway: {
                        rating: 8,
                        notes: "Got it thank you",
                        url: ""
                    },
                    taxi: {
                        rating: 5,
                        notes: "Give me a break",
                        url: ""
                    },
                    bus: {
                        rating: 8,
                        notes: "Dont go there",
                        url: ""
                    },
                    cost: {
                        rating: 4,
                        notes: "Ture message",
                        url: ""
                    },
                    urbanization: {
                        rating: 7,
                        notes: "Start from any where",
                        url: ""
                    }
                },
                reviews: [
                    {
                        name: "Evelin Grigory",
                        city: "New York City",
                        date: "July 11 2021",
                        img: wellgo_reviewer,
                        msg: `This is is each other reviewer message that can be only to some 
                        extent. Well add this message later. Lets see what Edward has said about our
                        service`,
                        rated: 4.7
                    },
                    {
                        name: "Edward Onsoh",
                        city: "New York City",
                        date: "July 11 2021",
                        img: wellgo_reviewer3,
                        msg: `This is is each other reviewer message that can be only to some 
                        extent. Well add this message later. Lets see what Edward has said about our
                        service`,
                        rated: 4.6
                    },
                    {
                        name: "Naana Agyeman",
                        city: "New York City",
                        date: "March 23 2021",
                        img: wellgo_reviewer4,
                        msg: `This is is each other reviewer message that can be only to some 
                        extent. Well add this message later. Lets see what Edward has said about our
                        service`,
                        rated: 4.7
                    },
                    {
                        name: "Regina Daniels",
                        city: "New York City",
                        date: "July 11 2021",
                        img: wellgo_reviewer5,
                        msg: `This is is each other reviewer message that can be only to some 
                        extent. Well add this message later. Lets see what Edward has said about our
                        service`,
                        rated: 5
                    }
                ]
            },
            {
                place: {
                    name: "Kintampo Water Falls",
                    city: "Kintampo",
                    airport_name: "Accra Airport",
                    price: "45.35",
                    map_address: "",
                    currency: "USD",
                    IATA: "ACC",
                    ICAO: "DGAA",
                    pictures: [pic7, pic8, pic9]
                },
                scores: {
                    safety: {
                        rating: 8,
                        notes: "Sounds Right",
                        url: ""
                    },
                    subway: {
                        rating: 4,
                        notes: "We are moving, regardless",
                        url: ""
                    },
                    taxi: {
                        rating: 7,
                        notes: "Let's hope for the best",
                        url: ""
                    },
                    bus: {
                        rating: 6,
                        notes: "Better days ahead",
                        url: ""
                    },
                    cost: {
                        rating: 9,
                        notes: "Stop dreaming, start doing",
                        url: ""
                    },
                    urbanization: {
                        rating: 5,
                        notes: "We outside",
                        url: ""
                    }
                },
                reviews: [
                    {
                        name: "Setzo Aldavis",
                        city: "New York City",
                        date: "October 14 2021",
                        img: wellgo_reviewer6,
                        msg: `This is is each other reviewer message that can be only to some 
                        extent. Well add this message later. Lets see what Edward has said about our
                        service`,
                        rated: 4.9
                    },
                    {
                        name: "Cecilia Branden",
                        city: "New York City",
                        date: "January 03 2021",
                        img: defaultProf,
                        msg: `This is is each other reviewer message that can be only to some 
                        extent. Well add this message later. Lets see what Edward has said about our
                        service`,
                        rated: 5
                    },
                    {
                        name: "Kojo Sheldon",
                        city: "New York City",
                        date: "February 03 2022",
                        img: defaultProf,
                        msg: `This is is each other reviewer message that can be only to some 
                        extent. Well add this message later. Lets see what Edward has said about our
                        service`,
                        rated: 4
                    },
                ]
            },
            {
                place: {
                    name: "Paris Saint Jemain",
                    city: "Paris",
                    airport_name: "Paris Airport",
                    price: "25.35",
                    map_address: "",
                    currency: "USD",
                    IATA: "LBG",
                    ICAO: "LFPB",
                    pictures: [pic1, pic2, pic3]
                },
                scores: {
                    safety: {
                        rating: 5,
                        notes: "Give it a try",
                        url: ""
                    },
                    subway: {
                        rating: 0,
                        notes: "This city doensn't have a subway system",
                        url: ""
                    },
                    taxi: {
                        rating: 5,
                        notes: "Starting to make an impact",
                        url: ""
                    },
                    bus: {
                        rating: 7,
                        notes: "Go there and prove it",
                        url: ""
                    },
                    cost: {
                        rating: 5,
                        notes: "Its ok to be dumb",
                        url: ""
                    },
                    urbanization: {
                        rating: 8,
                        notes: "Try not to loose yourself",
                        url: ""
                    }
                },
                reviews: [
                    {
                        name: "Kojo Sheldon",
                        city: "New York City",
                        date: "February 03 2022",
                        img: defaultProf,
                        msg: `This is is each other reviewer message that can be only to some 
                        extent. Well add this message later. Lets see what Edward has said about our
                        service`,
                        rated: 4
                    },
                    {
                        name: "Monica Totti",
                        city: "New York City",
                        date: "April 20 2022",
                        img: defaultProf,
                        msg: `This is is each other reviewer message that can be only to some 
                        extent. Well add this message later. Lets see what Edward has said about our
                        service`,
                        rated: 5
                    },
                    {
                        name: "Abdullah Mohammed",
                        city: "New York City",
                        date: "March 13 2021",
                        img: wellgo_reviewer2,
                        msg: `This is is each other reviewer message that can be only to some 
                        extent. Well add this message later. Lets see what Edward has said about our
                        service`,
                        rated: 5
                    },
                    {
                        name: "Mohammed Adinan",
                        city: "New York City",
                        date: "January 03 2021",
                        img: photo5,
                        msg: `This is is each other reviewer message that can be only to some 
                        extent. Well add this message later. Lets see what Edward has said about our
                        service`,
                        rated: 2.5
                    },
                    {
                        name: "Sallah Mohammed",
                        city: "New York City",
                        date: "June 14 2023",
                        img: defaultProf,
                        msg: `This is is each other reviewer message that can be only to some 
                        extent. Well add this message later. Lets see what Edward has said about our
                        service`,
                        rated: 3.1
                    },
                    {
                        name: "Marfo Brekum",
                        city: "New York City",
                        date: "January 03 2021",
                        img: photo7,
                        msg: `This is is each other reviewer message that can be only to some 
                        extent. Well add this message later. Lets see what Edward has said about our
                        service`,
                        rated: 4.2
                    }
                ]
            },
            {
                place: {
                    name: "China Tower",
                    city: "Beijing",
                    airport_name: "Beijing Airport",
                    price: "25.35",
                    map_address: "",
                    currency: "USD",
                    IATA: "PEK",
                    ICAO: "ZBAA",
                    pictures: [pic4, pic5, pic6]
                },
                scores: {
                    safety: {
                        rating: 9,
                        notes: "This is the safest place on earth",
                        url: ""
                    },
                    subway: {
                        rating: 8,
                        notes: "Lost of effort",
                        url: ""
                    },
                    taxi: {
                        rating: 9,
                        notes: "Ok.. enough",
                        url: ""
                    },
                    bus: {
                        rating: 4,
                        notes: "Give yourself a treat...",
                        url: ""
                    },
                    cost: {
                        rating: 9,
                        notes: "Go for it",
                        url: ""
                    },
                    urbanization: {
                        rating: 8,
                        notes: "Start from somewhere",
                        url: ""
                    }
                },
                reviews: [
                    {
                        name: "Evelin Grigory",
                        city: "New York City",
                        date: "July 11 2021",
                        img: wellgo_reviewer,
                        msg: `This is is each other reviewer message that can be only to some 
                        extent. Well add this message later. Lets see what Edward has said about our
                        service`,
                        rated: 4.7
                    },
                    {
                        name: "Edward Onsoh",
                        city: "New York City",
                        date: "July 11 2021",
                        img: wellgo_reviewer3,
                        msg: `This is is each other reviewer message that can be only to some 
                        extent. Well add this message later. Lets see what Edward has said about our
                        service`,
                        rated: 4.6
                    },
                    {
                        name: "Naana Agyeman",
                        city: "New York City",
                        date: "March 23 2021",
                        img: wellgo_reviewer4,
                        msg: `This is is each other reviewer message that can be only to some 
                        extent. Well add this message later. Lets see what Edward has said about our
                        service`,
                        rated: 4.7
                    },
                    {
                        name: "Regina Daniels",
                        city: "New York City",
                        date: "July 11 2021",
                        img: wellgo_reviewer5,
                        msg: `This is is each other reviewer message that can be only to some 
                        extent. Well add this message later. Lets see what Edward has said about our
                        service`,
                        rated: 5
                    },
                    {
                        name: "Setzo Aldavis",
                        city: "New York City",
                        date: "October 14 2021",
                        img: wellgo_reviewer6,
                        msg: `This is is each other reviewer message that can be only to some 
                        extent. Well add this message later. Lets see what Edward has said about our
                        service`,
                        rated: 4.9
                    },
                    {
                        name: "Cecilia Branden",
                        city: "New York City",
                        date: "January 03 2021",
                        img: defaultProf,
                        msg: `This is is each other reviewer message that can be only to some 
                        extent. Well add this message later. Lets see what Edward has said about our
                        service`,
                        rated: 5
                    },
                    {
                        name: "Kojo Sheldon",
                        city: "New York City",
                        date: "February 03 2022",
                        img: defaultProf,
                        msg: `This is is each other reviewer message that can be only to some 
                        extent. Well add this message later. Lets see what Edward has said about our
                        service`,
                        rated: 4
                    },
                    {
                        name: "Monica Totti",
                        city: "New York City",
                        date: "April 20 2022",
                        img: defaultProf,
                        msg: `This is is each other reviewer message that can be only to some 
                        extent. Well add this message later. Lets see what Edward has said about our
                        service`,
                        rated: 5
                    },
                    {
                        name: "Abdullah Mohammed",
                        city: "New York City",
                        date: "March 13 2021",
                        img: wellgo_reviewer2,
                        msg: `This is is each other reviewer message that can be only to some 
                        extent. Well add this message later. Lets see what Edward has said about our
                        service`,
                        rated: 5
                    },
                    {
                        name: "Mohammed Adinan",
                        city: "New York City",
                        date: "January 03 2021",
                        img: photo5,
                        msg: `This is is each other reviewer message that can be only to some 
                        extent. Well add this message later. Lets see what Edward has said about our
                        service`,
                        rated: 2.5
                    },
                    {
                        name: "Sallah Mohammed",
                        city: "New York City",
                        date: "June 14 2023",
                        img: defaultProf,
                        msg: `This is is each other reviewer message that can be only to some 
                        extent. Well add this message later. Lets see what Edward has said about our
                        service`,
                        rated: 3.1
                    },
                    {
                        name: "Marfo Brekum",
                        city: "New York City",
                        date: "January 03 2021",
                        img: photo7,
                        msg: `This is is each other reviewer message that can be only to some 
                        extent. Well add this message later. Lets see what Edward has said about our
                        service`,
                        rated: 4.2
                    }
                ]
            }
        ]);
    }catch(e){
        console.log(e);
        res.status(500).send({status: 500, message: e.message});
    }
}

const getRatedPlace = (req, res, next) => {

}

const getRatedPlacesByCity = (req, res, next) => {

}

module.exports = {
    getAllRatedPlace,
    getRatedPlace,
    getRatedPlacesByCity
}