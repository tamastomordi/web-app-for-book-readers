import '../styles/layouts/Stats.scss';

const Stats = () => {
   return (
      <div className="Stats">
         <h2>Statisztikák</h2>
         <table>
            <thead>
               <tr>
                  <th></th>
                  <th>A te olvasásaid</th>
                  <th>Barátaid olvasásai</th>
                  <th>Különbség</th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td>Ebben az évben:</td>
                  <td>10</td>
                  <td>15</td>
                  <td>+23%</td>
               </tr>
               <tr>
                  <td>Ebben a hónapban:</td>
                  <td>7</td>
                  <td>8</td>
                  <td>-10%</td>
               </tr>
               <tr>
                  <td>Ezen a héten:</td>
                  <td>2</td>
                  <td>5</td>
                  <td>+15%</td>
               </tr>
            </tbody>
         </table>
      </div>
   );
};

export default Stats;
