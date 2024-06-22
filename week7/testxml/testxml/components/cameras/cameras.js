var cameras;

async function loadCameras() {
  if (cameras == undefined) {
    let response = await fetch(
      "http://localhost:8888/cameras.geojson",
      {
        method: "get",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    cameras = await response.json();
    console.log(cameras.features[0].properties.MAINROAD);
  }
  return cameras;
}

module.exports = {
  loadCameras
};