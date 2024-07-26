const generateTimeOptions = () => {
  const times = [];
  for (let hour = 0; hour <= 23; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const formattedHour = (hour % 12 === 0 ? 12 : hour % 12)
        .toString()
        .padStart(2, "0");
      const formattedMinute = minute.toString().padStart(2, "0");
      times.push(
        `${formattedHour}:${formattedMinute} ${hour < 12 ? "AM" : "PM"}`
      );
    }
  }
  return times;
};

export default generateTimeOptions;
