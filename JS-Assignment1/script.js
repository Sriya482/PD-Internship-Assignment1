const clientId = '473c10402e414f69a166dba11ce5e901';
const clientSecret = '68da177027f24e458eab6a1e32530c55';

const artistIds = [
    '0oOet2f43PA68X5RxKobEy',
    '1tqysapcCh1lWEAc9dIFpa',
    '2GoeZ0qOTt6kjsWW4eA6LS',
    '0y59o4v8uw5crbN9M3JiL1',
    '4IKVDbCSBTxBeAsMKjAuTs',
    '70B80Lwx2sxti0M1Ng9e8K',
    '3tHD07u1ON4uHxmnT9rwqZ',
    '5ixQ5hSywFLUaxoaA0uVaH',
    '4YRxDV8wJFPHPTeXepOstw',
    '4fEkbug6kZzzJ8eYX6Kbbp'
  ];


const getAccessToken = async () => {
    
    const basicAuth = btoa(`${clientId}:${clientSecret}`);

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${basicAuth}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
    });

    const data = await response.json();
    if(response.status == 200) {
        console.log("Success : ", data)
   } else {
      console.log('Server Error : ', data.error.message)
       }
    return data.access_token;
};


async function fetchArtistData(artistId, accessToken) {
    const artistUrl = `https://api.spotify.com/v1/artists/${artistId}`;
    const headers = {
        'Authorization': `Bearer ${accessToken}`
    };

    try {
        const response = await fetch(artistUrl, { headers });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching artist data:", error);
        return null;
    }
}
// Render artists on the webpage
const renderArtists = (artists) => {
    const dataContainer = document.getElementById('data-container');
    artists.forEach((artist) => {
        const artistCard = document.createElement('div');
        artistCard.classList.add('artist-card');

        const artistName = document.createElement('h2');
        artistName.textContent = artist.name;

        const artistImage = document.createElement('img');
        artistImage.classList.add('artist-image');
        artistImage.src = artist.images[1] ? artist.images[1].url : 'default-image.jpg';
        artistImage.alt = artist.name;

        const listItem = document.createElement("p");
        listItem.textContent = `Popularity: ${artist.popularity},Followers:${artist.followers.total}`;


        artistCard.appendChild(artistImage);
        artistCard.appendChild(artistName);
        artistCard.appendChild(listItem);
        dataContainer.appendChild(artistCard);
    });
};

const main = async () => {
    try {
        const accessToken = await getAccessToken();
        const artistDataPromises = artistIds.map((artistId) => fetchArtistData(artistId, accessToken));
        const topArtists = await Promise.all(artistDataPromises);
        renderArtists(topArtists);
        console.log(accessToken);
    } catch (error) {
        console.error('An error occurred:', error);
    }
    console.log('Main function called.');
};

main();