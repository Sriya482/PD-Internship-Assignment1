const url="https://api.spotify.com/v1/artists?ids=7uIbLdzzSEqnX0Pkrb56cR%2C1tqysapcCh1lWEAc9dIFpa%2C2GoeZ0qOTt6kjsWW4eA6LS%2C0y59o4v8uw5crbN9M3JiL1%2C4IKVDbCSBTxBeAsMKjAuTs%2C70B80Lwx2sxti0M1Ng9e8K%2C3tHD07u1ON4uHxmnT9rwqZ%2C5ixQ5hSywFLUaxoaA0uVaH%2C4YRxDV8wJFPHPTeXepOstw%2C4fEkbug6kZzzJ8eYX6Kbbp"
const token = "BQCz0BgJy-JMYPGm28Irjtxybo4cm3ubzBL_590H8VGDQW6j7gFGSEncoZkeSXOnYCD3MqvQ9lchmEb5HUaUYlG4MDiOrI_wrP7GmARKSYtTpvuW4SirLLzOFZXiClUhXsU4fTzb1a4tj7YSQ1aSN57FwVKCGP1coqutiU3dWZH3MLK0zrHxXUW3aiAM7fPuKeuHFMpjcpPrXxsmQsb-CU2aFKFPpWqdJoZLBJL7ChE8HxBXGFsvul2yjN0MyFVhtC4op4k4Ed3-T8wUEP20BAYD";


const request = new Request(
    url,{
        headers:{
            'Authorization': `Bearer ${token}`
        },
    })



    async function getData() {
        try {
            const response = await fetch(request);
            const data = await response.json();
            console.log(data);
            
            // Get the data-container element
            const dataContainer = document.getElementById("data-container");

            // Create an HTML structure to display the data (modify as needed)
            const artistList = document.createElement("ul");

            // Loop through the data and create list items for each artist
            data.artists.forEach(artist => {
                const listItem = document.createElement("li");
                listItem.textContent = `Artist Name: ${artist.name}, Popularity: ${artist.popularity}`;
                artistList.appendChild(listItem);
            });

            // Append the artistList to the data-container
            dataContainer.appendChild(artistList);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

getData()