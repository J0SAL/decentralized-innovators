import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Map from './Map';

const root = ReactDOM.createRoot(document.getElementById('root'));

const crimeData = {
  "crime_data": [
    {
      "crime_subcategory": "Assault",
      "latitude": 19.0790,
      "longitude": 72.8777
      },
      {
      "crime_subcategory": "Assault",
      "latitude": 19.1169,
      "longitude": 72.9082
      },
      {
      "crime_subcategory": "Assault",
      "latitude": 19.1453,
      "longitude": 72.9217
      },
      {
      "crime_subcategory": "Assault",
      "latitude": 19.1120,
      "longitude": 72.9082
      },
      {
      "crime_subcategory": "Assault",
      "latitude": 19.0049,
      "longitude": 72.8422
      },
      {
      "crime_subcategory": "Assault",
      "latitude": 19.1177,
      "longitude": 72.8441
      },
      {
      "crime_subcategory": "Assault",
      "latitude": 19.1741,
      "longitude": 72.8608
      },
      {
      "crime_subcategory": "Assault",
      "latitude": 19.0526,
      "longitude": 72.8338
      },
      {
      "crime_subcategory": "Assault",
      "latitude": 19.0169,
      "longitude": 72.8553
      },
      {
      "crime_subcategory": "Assault",
      "latitude": 19.1184,
      "longitude": 72.8701
      },
      {
      "crime_subcategory": "Assault",
      "latitude": 19.0193,
      "longitude": 72.8326
      },
      {
      "crime_subcategory": "Assault",
      "latitude": 19.0766,
      "longitude": 72.8213
      },
      {
      "crime_subcategory": "Assault",
      "latitude": 19.0499,
      "longitude": 72.8827
      },
      {
      "crime_subcategory": "Assault",
      "latitude": 19.0184,
      "longitude": 72.8884
      },
      {
      "crime_subcategory": "Assault",
      "latitude": 19.0497,
      "longitude": 72.9362
      },
      {
      "crime_subcategory": "Assault",
      "latitude": 19.0360,
      "longitude": 72.8708
      },
      {
      "crime_subcategory": "Assault",
      "latitude": 19.0263,
      "longitude": 72.8321
      },
      {
      "crime_subcategory": "Assault",
      "latitude": 19.0426,
      "longitude": 72.8147
      },
      {
      "crime_subcategory": "Assault",
      "latitude": 19.0727,
      "longitude": 72.9022
      },
      {
      "crime_subcategory": "Assault",
      "latitude": 19.0840,
      "longitude": 72.8969
      },
      {
      "crime_subcategory": "Assault",
      "latitude": 19.1312,
      "longitude": 72.9117
      },
      {
        "crime_subcategory": "Robbery",
        "latitude": 19.0866,
        "longitude": 72.9074
        },
        {
        "crime_subcategory": "Burglary",
        "latitude": 19.1178,
        "longitude": 72.8504
        },
        {
        "crime_subcategory": "Drug Offense",
        "latitude": 19.0633,
        "longitude": 72.8678
        },
        {
        "crime_subcategory": "Fraud",
        "latitude": 19.0221,
        "longitude": 72.8477
        },
        {
        "crime_subcategory": "Theft",
        "latitude": 19.0576,
        "longitude": 72.8311
        },
        {
        "crime_subcategory": "Assault",
        "latitude": 19.1738,
        "longitude": 72.9447
        },
        {
        "crime_subcategory": "Murder",
        "latitude": 19.0729,
        "longitude": 72.9083
        },
        {
        "crime_subcategory": "Kidnapping",
        "latitude": 19.1275,
        "longitude": 72.8495
        },
        {
        "crime_subcategory": "Cybercrime",
        "latitude": 19.0067,
        "longitude": 72.8335
        },
        {
        "crime_subcategory": "Sexual Offense",
        "latitude": 19.0461,
        "longitude": 72.8765
        },
        {
        "crime_subcategory": "Vandalism",
        "latitude": 19.0654,
        "longitude": 72.8917
        },
        {
        "crime_subcategory": "Pickpocketing",
        "latitude": 19.1302,
        "longitude": 72.9352
        },
        {
        "crime_subcategory": "Fraud",
        "latitude": 19.0041,
        "longitude": 72.8891
        },
        {
        "crime_subcategory": "Theft",
        "latitude": 19.0625,
        "longitude": 72.8373
        },
        {
        "crime_subcategory": "Assault",
        "latitude": 19.1640,
        "longitude": 72.8212
        },
        {
        "crime_subcategory": "Drug Offense",
        "latitude": 19.0836,
        "longitude": 72.8489
        },
        {
        "crime_subcategory": "Robbery",
        "latitude": 19.0382,
        "longitude": 72.9350
        },
        {
        "crime_subcategory": "Burglary",
        "latitude": 19.0998,
        "longitude": 72.8892
        },
        {
        "crime_subcategory": "Sexual Offense",
        "latitude": 19.0192,
        "longitude": 72.8584
        },
        {
        "crime_subcategory": "Vandalism",
        "latitude": 19.0547,
        "longitude": 72.8126
        },
        {
          "crime_subcategory": "Robbery",
          "latitude": 19.0854,
          "longitude": 72.9156
          },
          {
          "crime_subcategory": "Burglary",
          "latitude": 19.0423,
          "longitude": 72.9214
          },
          {
          "crime_subcategory": "Drug Offense",
          "latitude": 19.1007,
          "longitude": 72.8781
          },
          {
          "crime_subcategory": "Fraud",
          "latitude": 19.0542,
          "longitude": 72.8456
          },
          {
          "crime_subcategory": "Theft",
          "latitude": 19.1196,
          "longitude": 72.8489
          },
          {
          "crime_subcategory": "Assault",
          "latitude": 19.0530,
          "longitude": 72.9337
          },
          {
          "crime_subcategory": "Murder",
          "latitude": 19.0247,
          "longitude": 72.8539
          },
          {
          "crime_subcategory": "Kidnapping",
          "latitude": 19.1381,
          "longitude": 72.8423
          },
          {
          "crime_subcategory": "Cybercrime",
          "latitude": 19.0045,
          "longitude": 72.8258
          },
          {
          "crime_subcategory": "Sexual Offense",
          "latitude": 19.0419,
          "longitude": 72.8708
          },
          {
          "crime_subcategory": "Vandalism",
          "latitude": 19.1062,
          "longitude": 72.9022
          },
          {
          "crime_subcategory": "Pickpocketing",
          "latitude": 19.0598,
          "longitude": 72.9187
          },
          {
          "crime_subcategory": "Fraud",
          "latitude": 19.0097,
          "longitude": 72.8954
          },
          {
          "crime_subcategory": "Theft",
          "latitude": 19.0734,
          "longitude": 72.8651
          },
          {
          "crime_subcategory": "Assault",
          "latitude": 19.1609,
          "longitude": 72.9328
          },
          {
          "crime_subcategory": "Drug Offense",
          "latitude": 19.0776,
          "longitude": 72.8490
          },
          {
          "crime_subcategory": "Robbery",
          "latitude": 19.0346,
          "longitude": 72.9123
          },
          {
          "crime_subcategory": "Burglary",
          "latitude": 19.1129,
          "longitude": 72.9042
          },
          {
          "crime_subcategory": "Sexual Offense",
          "latitude": 19.0137,
          "longitude": 72.8785
          },
          {
          "crime_subcategory": "Vandalism",
          "latitude": 19.0469,
          "longitude": 72.8005
          }
  ]
}

root.render(
  <React.StrictMode>
    <Map crimeData={crimeData}/>
  </React.StrictMode>
);