async function getLocationData(roomKey: string) {
  const res = await fetch(`http://localhost:3000/api/list/${roomKey}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data.locationData;
}

export default getLocationData;
