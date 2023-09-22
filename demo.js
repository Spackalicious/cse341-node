const {MongoClient} = require('mongodb');
const dotenv = require("dotenv");

dotenv.config();

async function main() {

    const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.0cp9vcj.mongodb.net/`;

    const client = new MongoClient(uri);

    try {
        await client.connect();

        // call to list the databases in the cluster:
        // await listDatabases(client);

        // call to create a single listing: 
        // await createListing(client, {
        //     name: "Lovely Loft", 
        //     summary: "A charming loft in Paris", 
        //     bedrooms: 1, 
        //     bathrooms: 1
        // })

        // call to create multiple listings: 
        // await createMultipleListings(client, [
        //     {
        //         name: "Infinite Views", 
        //         summary: "Modern home with infinite views from the infinity pool", 
        //         property_type: "House", 
        //         bedrooms: 5, 
        //         bathrooms: 4.5, 
        //         beds: 5
        //     }, 
        //     {
        //         name: "Private room in London", 
        //         property_type: "Apartment", 
        //         bedrooms: 1, 
        //         bathroom: 1
        //     }, 
        //     {
        //         name: "Beautiful Beach House", 
        //         Summary: "Enjoy relaxed beach living in this house with a private beach", 
        //         bedrooms: 4, 
        //         bathrooms: 2.5, 
        //         beds: 7, 
        //         last_review: new Date()
        //     }
        // ])

        // call to find a single listing by name
        // await findOneListingByName(client, "Infinite Views");

        // call to query with specific search parameters
        await findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(client, {
            minimumNumberOfBedrooms: 4, 
            minimumNumberOfBathrooms: 2, 
            maximumNumberOfResults: 5
        });

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
    
}

main().catch(console.error);

// Reading documents one at a time: 
async function findOneListingByName(client, nameOfListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").findOne({name: nameOfListing});

    if (result) {
        console.log(`Found a listing in the collection with the name '${nameOfListing}'`);
        console.log(result);
    } else {
        console.loog(`No listings found with the name '${nameOfListing}'`);
    }
}

// Query for multiple documents at a time: 
async function findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(client, {
    minimumNumberOfBedrooms = 0, 
    minimumNumberOfBathrooms = 0, 
    maximumNumberOfResults = Number.MAX_SAFE_INTEGER
}  = {}){

    const cursor = await client.db("sample_airbnb").collection("listingsAndReviews").find({
        bedrooms: { $gte: minimumNumberOfBedrooms},
        bathrooms: { $gte: minimumNumberOfBathrooms}
    }).sort({ last_review: -1})
    .limit(maximumNumberOfResults);

    const results = await cursor.toArray();

    if (results.length > 0) {
        console.log(`Found listing(s) with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms: `);
        results.forEach((result, i) => {
            date = new Date(result.last_review).toDateString();
            console.log();
            console.log(`${i + 1}. name: ${result.name}`);
            console.log(`   _id: $result._id}`);
            console.log(`   bedrooms: ${result.bedrooms}`);
            console.log(`   bathrooms: ${result.bathrooms}`);
            console.log(`   most recent review date: : ${new Date(result.last_review).toDateString()}`);
        });
    } else {
        console.log(`No listings found with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms.`);
    }
}

// Example of how to create a single document:
async function createListing(client, newListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing);
    // optionally, use insertMany to insert an array of documents.

    console.log(`New Listing created with the following id: ${result.insertedId}`);
}

// example to create multiple listings: 
async function createMultipleListings(client, newListings) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertMany(newListings);

    console.log(`${result.insertedCount} new  listings created with the following id(s):`);
    console.log(result.insertedIds);
}

async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => {
        console.log(`– ${db.name}`);
    })
}