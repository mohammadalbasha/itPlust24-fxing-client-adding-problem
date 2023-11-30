import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AddSelectInput, AddTextInput, AddSelectButtonsInput } from '../../components/forms/add-input/add-input'
import { Geolocation } from '../../components/geolocation/geolocation'
import useHttp from '../../hooks/use-http'
import styles from './geolocation-page.module.css'
import Spinner from '../../components/Spinner/spinner'
import Error from '../../components/Spinner/error'

export function GeolocationPage(){

    const [searchParams, setSearchParams] = useSearchParams();
    const longitude = searchParams.get("longitude") || 0;
    const latitude = searchParams.get("latitude") || 0;
    const addressParam = searchParams.get("search") || ""


    const [location, setLocation] = useState([latitude,longitude])
    const [address, setAddress] = useState(addressParam)

    const [addFields, setAddFields] = useState({
        address: "",
        postal: "",
        countryCode: "",
        sendEmail: false,
        email: ""
    });
    
    
  const addFieldsChangeHandler = (key, value) => {
    console.log(key, value)
    setAddFields((prev) => {
      return {
        ...prev,
        [key]: value
      };
    });
  };


    const {isLoading, error, sendRequest: fetchGeolocation} = useHttp();
    
  const submitHandler = (event) => {
    console.log(addFields)
    event.preventDefault();
    const responseHandler = (response) => {
        setAddress(response.address);
        setLocation([response.location.y, response.location.x])

    };

    console.log(process.env.BACKEND_DOMAIN)
    let url = `http://localhost:8080/geolocation`;
    fetchGeolocation(
      {
        url,
        method: 'POST',
        body: JSON.stringify(addFields),
        headers: {
          'Content-Type': 'application/json'
        }
      },
      responseHandler
    );
  };


  const countryOptions = [
    { "placeholder": "", "value": false },
    { "placeholder": "Afghanistan", "value": "AF" },
    { "placeholder": "Albania", "value": "AL" },
    { "placeholder": "Algeria", "value": "DZ" },
    { "placeholder": "Andorra", "value": "AD" },
    { "placeholder": "Angola", "value": "AO" },
    { "placeholder": "Antigua and Barbuda", "value": "AG" },
    { "placeholder": "Argentina", "value": "AR" },
    { "placeholder": "Armenia", "value": "AM" },
    { "placeholder": "Australia", "value": "AU" },
    { "placeholder": "Austria", "value": "AT" },
    { "placeholder": "Azerbaijan", "value": "AZ" },
    { "placeholder": "Bahamas", "value": "BS" },
    { "placeholder": "Bahrain", "value": "BH" },
    { "placeholder": "Bangladesh", "value": "BD" },
    { "placeholder": "Barbados", "value": "BB" },
    { "placeholder": "Belarus", "value": "BY" },
    { "placeholder": "Belgium", "value": "BE" },
    { "placeholder": "Belize", "value": "BZ" },
    { "placeholder": "Benin", "value": "BJ" },
    { "placeholder": "Bhutan", "value": "BT" },
    { "placeholder": "Bolivia", "value": "BO" },
    { "placeholder": "Bosnia and Herzegovina", "value": "BA" },
    { "placeholder": "Botswana", "value": "BW" },
    { "placeholder": "Brazil", "value": "BR" },
    { "placeholder": "Brunei", "value": "BN" },
    { "placeholder": "Bulgaria", "value": "BG" },
    { "placeholder": "Burkina Faso", "value": "BF" },
    { "placeholder": "Burundi", "value": "BI" },
    { "placeholder": "Cabo Verde", "value": "CV" },
    { "placeholder": "Cambodia", "value": "KH" },
    { "placeholder": "Cameroon", "value": "CM" },
    { "placeholder": "Canada", "value": "CA" },
    { "placeholder": "Central African Republic", "value": "CF" },
    { "placeholder": "Chad", "value": "TD" },
    { "placeholder": "Chile", "value": "CL" },
    { "placeholder": "China", "value": "CN" },
    { "placeholder": "Colombia", "value": "CO" },
    { "placeholder": "Comoros", "value": "KM" },
    { "placeholder": "Congo, Democratic Republic of the", "value": "CD" },
    { "placeholder": "Congo, Republic of the", "value": "CG" },
    { "placeholder": "Costa Rica", "value": "CR" },
    { "placeholder": "Côte d'Ivoire", "value": "CI" },
    { "placeholder": "Croatia", "value": "HR" },
    { "placeholder": "Cuba", "value": "CU" },
    { "placeholder": "Cyprus", "value": "CY" },
    { "placeholder": "Czech Republic", "value": "CZ" },
    { "placeholder": "Denmark", "value": "DK" },
    { "placeholder": "Djibouti", "value": "DJ" },
    { "placeholder": "Dominica", "value": "DM" },
    { "placeholder": "Dominican Republic", "value": "DO" },
    { "placeholder": "East Timor", "value": "TL" },
    { "placeholder": "Ecuador", "value": "EC" },
    { "placeholder": "Egypt", "value": "EG" },
    { "placeholder": "El Salvador", "value": "SV" },
    { "placeholder": "Equatorial Guinea", "value": "GQ" },
    { "placeholder": "Eritrea", "value": "ER" },
    { "placeholder": "Estonia", "value": "EE" },
    { "placeholder": "Eswatini", "value": "SZ" },
    { "placeholder": "Ethiopia", "value": "ET" },
    { "placeholder": "Fiji", "value": "FJ" },
    { "placeholder": "Finland", "value": "FI" },{ "placeholder": "France", "value": "FR" },
    { "placeholder": "Gabon", "value": "GA" },
    { "placeholder": "Gambia", "value": "GM" },
    { "placeholder": "Georgia", "value": "GE" },
    { "placeholder": "Germany", "value": "DE" },
    { "placeholder": "Ghana", "value": "GH" },
    { "placeholder": "Greece", "value": "GR" },
    { "placeholder": "Grenada", "value": "GD" },
    { "placeholder": "Guatemala", "value": "GT" },
    { "placeholder": "Guinea", "value": "GN" },
    { "placeholder": "Guinea-Bissau", "value": "GW" },
    { "placeholder": "Guyana", "value": "GY" },
    { "placeholder": "Haiti", "value": "HT" },
    { "placeholder": "Honduras", "value": "HN" },
    { "placeholder": "Hungary", "value": "HU" },
    { "placeholder": "Iceland", "value": "IS" },
    { "placeholder": "India", "value": "IN" },
    { "placeholder": "Indonesia", "value": "ID" },
    { "placeholder": "Iran", "value": "IR" },
    { "placeholder": "Iraq", "value": "IQ" },
    { "placeholder": "Ireland", "value": "IE" },
    { "placeholder": "Israel", "value": "IL" },
    { "placeholder": "Italy", "value": "IT" },
    { "placeholder": "Jamaica", "value": "JM" },
    { "placeholder": "Japan", "value": "JP" },
    { "placeholder": "Jordan", "value": "JO" },
    { "placeholder": "Kazakhstan", "value": "KZ" },
    { "placeholder": "Kenya", "value": "KE" },
    { "placeholder": "Kiribati", "value": "KI" },
    { "placeholder": "Korea, North", "value": "KP" },
    { "placeholder": "Korea, South", "value": "KR" },
    { "placeholder": "Kosovo", "value": "XK" },
    { "placeholder": "Kuwait", "value": "KW" },
    { "placeholder": "Kyrgyzstan", "value": "KG" },
    { "placeholder": "Laos", "value": "LA" },
    { "placeholder": "Latvia", "value": "LV" },
    { "placeholder": "Lebanon", "value": "LB" },
    { "placeholder": "Lesotho", "value": "LS" },
    { "placeholder": "Liberia", "value": "LR" },
    { "placeholder": "Libya", "value": "LY" },
    { "placeholder": "Liechtenstein", "value": "LI" },
    { "placeholder": "Lithuania", "value": "LT" },
    { "placeholder": "Luxembourg", "value": "LU" },
    { "placeholder": "Madagascar", "value": "MG" },
    { "placeholder": "Malawi", "value": "MW" },
    { "placeholder": "Malaysia", "value": "MY" },
    { "placeholder": "Maldives", "value": "MV" },
    { "placeholder": "Mali", "value": "ML" },
    { "placeholder": "Malta", "value": "MT" },
    { "placeholder": "Marshall Islands", "value": "MH" },
    { "placeholder": "Mauritania", "value": "MR" },
    { "placeholder": "Mauritius", "value": "MU" },
    { "placeholder": "Mexico", "value": "MX" },
    { "placeholder": "Micronesia", "value": "FM" },
    { "placeholder": "Moldova", "value": "MD" },
    { "placeholder": "Monaco", "value": "MC" },
    { "placeholder": "Mongolia", "value": "MN" },
    { "placeholder": "Montenegro", "value": "ME" },
    { "placeholder": "Morocco", "value": "MA" },
    { "placeholder": "Mozambique", "value":"MZ" },
    { "placeholder": "Myanmar", "value": "MM" },
    { "placeholder": "Namibia", "value": "NA" },
    { "placeholder": "Nauru", "value": "NR" },
    { "placeholder": "Nepal", "value": "NP" },
    { "placeholder": "Netherlands", "value": "NL" },
    { "placeholder": "New Zealand", "value": "NZ" },
    { "placeholder": "Nicaragua", "value": "NI" },
    { "placeholder": "Niger", "value": "NE" },
    { "placeholder": "Nigeria", "value": "NG" },
    { "placeholder": "North Macedonia", "value": "MK" },
    { "placeholder": "Norway", "value": "NO" },
    { "placeholder": "Oman", "value": "OM" },
    { "placeholder": "Pakistan", "value": "PK" },
    { "placeholder": "Palau", "value": "PW" },
    { "placeholder": "Panama", "value": "PA" },
    { "placeholder": "Papua New Guinea", "value": "PG" },
    { "placeholder": "Paraguay", "value": "PY" },
    { "placeholder": "Peru", "value": "PE" },
    { "placeholder": "Philippines", "value": "PH" },
    { "placeholder": "Poland", "value": "PL" },
    { "placeholder": "Portugal", "value": "PT" },
    { "placeholder": "Qatar", "value": "QA" },
    { "placeholder": "Romania", "value": "RO" },
    { "placeholder": "Russia", "value": "RU" },
    { "placeholder": "Rwanda", "value": "RW" },
    { "placeholder": "Saint Kitts and Nevis", "value": "KN" },
    { "placeholder": "Saint Lucia", "value": "LC" },
    { "placeholder": "Saint Vincent and the Grenadines", "value": "VC" },
    { "placeholder": "Samoa", "value": "WS" },
    { "placeholder": "San Marino", "value": "SM" },
    { "placeholder": "Sao Tome and Principe", "value": "ST" },
    { "placeholder": "Saudi Arabia", "value": "SA" },
    { "placeholder": "Senegal", "value": "SN" },
    { "placeholder": "Serbia", "value": "RS" },
    { "placeholder": "Seychelles", "value": "SC" },
    { "placeholder": "Sierra Leone", "value": "SL" },
    { "placeholder": "Singapore", "value": "SG" },
    { "placeholder": "Slovakia", "value": "SK" },
    { "placeholder": "Slovenia", "value": "SI" },
    { "placeholder": "Solomon Islands", "value": "SB" },
    { "placeholder": "Somalia", "value": "SO" },
    { "placeholder": "South Africa", "value": "ZA" },
    { "placeholder": "South Sudan", "value": "SS" },
    { "placeholder": "Spain", "value": "ES" },
    { "placeholder": "Sri Lanka", "value": "LK" },
    { "placeholder": "Sudan", "value": "SD" },
    { "placeholder": "Suriname", "value": "SR" },
    { "placeholder": "Sweden", "value": "SE" },
    { "placeholder": "Switzerland", "value": "CH" },
    { "placeholder": "Syria", "value": "SY" },
    { "placeholder": "Taiwan", "value": "TW" },
    { "placeholder": "Tajikistan", "value": "TJ" },
    { "placeholder": "Tanzania", "value": "TZ" },
    { "placeholder": "Thailand", "value": "TH" },
    { "placeholder": "Timor-Leste", "value": "TL" },
    { "placeholder": "Togo", "value": "TG" },
    { "placeholder": "Tonga", "value": "TO" },
    { "placeholder": "Trinidad and Tobago", "value": "TT" },
    { "placeholder": "Tunisia", "value": "TN" },
    { "placeholder": "Turkey", "value": "TR" },
    { "placeholder": "Turkmenistan", "value": "TM" },
    { "placeholder": "Tuvalu", "value": "TV" },
    { "placeholder": "Uganda", "value": "UG" },
    { "placeholder": "Ukraine", "value": "UA" },
    { "placeholder": "United Arab Emirates", "value": "AE" },
    { "placeholder": "United Kingdom", "value": "GB" },
    { "placeholder": "United States", "value": "US" },
    { "placeholder": "Uruguay", "value": "UY" },
    { "placeholder": "Uzbekistan", "value": "UZ" },
    { "placeholder": "Vanuatu", "value": "VU" },
    { "placeholder": "Vatican City", "value": "VA" },
    { "placeholder": "Venezuela", "value": "VE" },
    { "placeholder": "Vietnam", "value": "VN" },
    { "placeholder": "Yemen", "value": "YE" },
    { "placeholder": "Zambia", "value": "ZM" },
    { "placeholder": "Zimbabwe", "value": "ZW" }

]

const sendEmailOptions = [
    {
      placeholder: 'no',
      value: false
    },
    {
      placeholder: 'yes',
      value: true
    }
  ];

    return (
        <div className={`${styles.geolocationPage}`}>
                  <section className={`${styles.search}`}>
            <h3 className={`${styles.search__heading}`}>address details </h3>
            <form onSubmit={submitHandler}>
              <div className={`${styles.add__fieldsItems}`}>
               

                <AddSelectInput
                  addFieldsChangeHandler={addFieldsChangeHandler}
                  label={'country'}
                  indexKey={'countryCode'}
                  largeScreenWidth="w50"
                  options={countryOptions}
                  value={addFields.countryCode}
                />

                <AddTextInput
                  label={'address'}
                  addFieldsChangeHandler={addFieldsChangeHandler}
                  indexKey={'address'}
                  largeScreenWidth="w50"
                  required="true"
                  value={addFields.address}
                />
                
                                <AddSelectButtonsInput
                  label={'send email  '}
                  addFieldsChangeHandler={addFieldsChangeHandler}
                  buttons={sendEmailOptions}
                  indexKey={'sendEmail'}
                  largeScreenWidth="w50"
                  selectedValue={addFields.sendEmail}
                />
{
                    addFields.sendEmail && (
                        <AddTextInput
                        label={'email '}
                        addFieldsChangeHandler={addFieldsChangeHandler}
                        indexKey={'email'}
                        largeScreenWidth="w50"
                        value={addFields.email}
                      />
      
                    )
                }

              </div>
              <div className={`${styles.search__submitButton}`}>
                <button type="subimt" className={`${styles.search__submitButton__button} `}>
                  send
                </button>
              </div>
            </form>
          </section>
    
            <div className={`${styles.geolocationContainer}`}>
            {error && <Error error={error}/>}
            {!isLoading &&<Geolocation position={location}/>}
            {isLoading && <Spinner/>}
            <div className={`${styles.geolocationDetails}`}>
                <h1>
                    {address}
                </h1>
            </div>
    
            </div>
        </div>
    
        )
}