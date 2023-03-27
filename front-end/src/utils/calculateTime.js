const calculateTime = (datetime) => {
   const difference = new Date() - new Date(datetime);
   const seconds = difference / 1000;
   const minutes = seconds / 60;
   const hours = minutes / 60;
   const days = hours / 24;
   const month = days / 30;
   const years = days / 365;

   if (minutes < 60) return Math.round(seconds) + ' másodperce';
   else if (minutes < 60) return Math.round(minutes) + ' perce';
   else if (hours < 24) return Math.round(hours) + ' órája';
   else if (days < 30) return Math.round(days) + ' napja';
   else if (days < 365) return Math.round(month) + ' hónapja';
   else return Math.round(years) + ' éve';
};

export default calculateTime;
