import { useRecoilState, useResetRecoilState } from 'recoil';
import { readingListState } from '../recoil/atoms/User';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getReadings } from '../api/reading';
import ReadingList from '../layouts/ReadingList';
import { PulseLoader } from 'react-spinners';

const Readings = () => {
   const [readings, setReadings] = useRecoilState(readingListState);
   const resetReadings = useResetRecoilState(readingListState);
   const { userId } = useParams();

   useEffect(() => {
      getReadings(userId)
         .then((data) => setReadings(data.readings))
         .catch((error) => console.log(error));
      return () => resetReadings();
   }, [userId, setReadings, resetReadings]);

   if (!readings)
      return (
         <div className="loader">
            <PulseLoader color="rgb(20, 20, 20)" />
         </div>
      );

   return (
      <div className="BookSearch">
         <div className="container">
            <div className="card -wide">
               <h2>Összes olvasás</h2>
               <ReadingList readings={readings} />
            </div>
         </div>
      </div>
   );
};

export default Readings;
