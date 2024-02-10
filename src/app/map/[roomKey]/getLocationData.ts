async function getLocationData(roomKey: string) {
  const res = await fetch(`/api/list/${roomKey}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data.locationData;
}

export default getLocationData;
