const express = require("express");
const axios = require("axios");
//config exp
const app = express();
//config port
const PORT = 8080;
//fetch train details
app.get("/trains", async (req, res) => {
  try {
    const mytrains = await fone();
    const filteredTrains = ftwo(mytrains);
    const trainSorted = fthree(filteredTrains);
    res.json({
      success: true,
      trainSorted,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "An error occurred",
    });
  }
});
//filter train
async function fone() {
  try {
    const myresponse = await axios.get("http://20.244.56.144/train/trains");
    return myresponse.data;
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
}
//sort train

function ftwo(trains) {
  const now = new Date();
  const next12Hours = new Date(now.getTime() + 12 * 60 * 60 * 1000);
  const filteredTrains = trains.filter((train) => {
    const departureTime = new Date(train.departureTime);
    return departureTime > now && departureTime <= next12Hours;
  });
  return filteredTrains;
}

function fthree(trains) {
  return trains.sort((trainone, traintwo) => {
    if (trainone.price === traintwo.price) {
      if (trainone.tickets === traintwo.tickets) {
        return (
          new Date(traintwo.departureTime) - new Date(trainone.departureTime)
        );
      }
      return traintwo.tickets - trainone.tickets;
    }
    return trainone.price - traintwo.price;
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
