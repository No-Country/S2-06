import axios from "axios"

export const getFullGameInfo = async (req, res) => {

    const { gameID } = req.params; // extraemos el gameID que viene de la url
    const url = `https://store.steampowered.com/api/appdetails?appids=${gameID}&cc=US`
    axios.get(url)
    .then(response => {
        res.json(response.data)
    })
    .catch(error => {
        console.log(error);
        return res.status(400).json({ msg: error.message });
    });
  };