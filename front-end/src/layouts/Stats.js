import { getFriendsReadings, getReadings } from '../api/reading';
import '../styles/layouts/Stats.scss';
import { useEffect } from 'react';
import moment from 'moment/moment';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
   myReadingsState,
   friendsReadingsState,
   readingStatsState
} from '../recoil/atoms/Stats';
import { authState } from '../recoil/atoms/Auth';

const Stats = () => {
   const [readingStats, setReadingStats] = useRecoilState(readingStatsState);
   const [myReadings, setMyReadings] = useRecoilState(myReadingsState);
   const [friendsReadings, setFriendsReadings] =
      useRecoilState(friendsReadingsState);
   const auth = useRecoilValue(authState);

   useEffect(() => {
      getFriendsReadings()
         .then((data) => setFriendsReadings(data.readings))
         .catch((error) => console.log(error));
      getReadings(auth.user.user_id)
         .then((data) => setMyReadings(data.readings))
         .catch((error) => console.log(error));
   }, [setFriendsReadings, setMyReadings]);

   const countReadingStat = (readings) => {
      let result = { week: 0, month: 0, year: 0 };
      readings.forEach((reading) => {
         if (reading.end) {
            if (
               new Date(reading.end).getFullYear() === new Date().getFullYear()
            ) {
               result.year++;
               if (new Date(reading.end).getMonth() === new Date().getMonth()) {
                  result.month++;
                  if (moment(reading.end).week() == moment().week()) {
                     result.week++;
                  }
               }
            }
         }
      });
      return result;
   };

   useEffect(() => {
      const my = countReadingStat(myReadings);
      const friends = countReadingStat(friendsReadings);
      setReadingStats({ my: my, friends: friends });
   }, [myReadings, friendsReadings]);

   const calculatePercentage = (friend, my) => {
      if (friend === 0 || my === 0) return '-- %';
      if (friend > my) {
         let value = Math.round((friend / my) * 100 * 100) / 100;
         return <span className="red">{'-' + value + '%'}</span>;
      }
      let value = Math.round((my / friend) * 100 * 100) / 100;
      return <span className="green">{'+' + value + '%'}</span>;
   };

   return (
      <div className="Stats">
         <h2>Statisztikák</h2>
         <table>
            <thead>
               <tr>
                  <th></th>
                  <th>Barátaid olvasásai</th>
                  <th>A te olvasásaid</th>
                  <th>Különbség</th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td>Ebben az évben:</td>
                  <td>{readingStats.friends.year}</td>
                  <td>{readingStats.my.year}</td>
                  <td>
                     {calculatePercentage(
                        readingStats.friends.year,
                        readingStats.my.year
                     )}
                  </td>
               </tr>
               <tr>
                  <td>Ebben a hónapban:</td>
                  <td>{readingStats.friends.month}</td>
                  <td>{readingStats.my.month}</td>
                  <td>
                     {calculatePercentage(
                        readingStats.friends.month,
                        readingStats.my.month
                     )}
                  </td>
               </tr>
               <tr>
                  <td>Ezen a héten:</td>
                  <td>{readingStats.friends.week}</td>
                  <td>{readingStats.my.week}</td>
                  <td>
                     {calculatePercentage(
                        readingStats.friends.week,
                        readingStats.my.week
                     )}
                  </td>
               </tr>
            </tbody>
         </table>
      </div>
   );
};

export default Stats;
