import React, { createContext, useState } from 'react'

export const ListProduct = createContext()

export default function ListProductProvider({ children }) {

    const [selected, setSelected] = useState("")
    const [locationSelected, setLocationSelected] = useState("")

    const changeSelectOptionHandler = val => {
        setSelected(val);


    }
    const changeSelectLocationHandler = val => {
        setLocationSelected(val);
    }

    // Product Categories

    const properties = [
        'Flat',
        "Shop",
        "House",
        "Plaza",
        'Hostel',
        'Event Space',
        'Parking Space',
    ]

    const vehicles = [
        'Car',
        'Van',
        'Bus',
        'Boat',
        'Truck',
        'Bicycle',
        'Motorcycle',

    ]

    const electronics = [
        'Laptop',
        'Tablet',
        'Camera',
        'Heater',
        'Television',
        'Smartphone',
        'Printer',
        'Projector',
        'Sound System',
        'Air Conditioner',
    ]

    const household = [
        'Furniture',
        'Appliance',
        'Home Decor',
        'Kitchenware',
        'Mobility Aid',
        'Vacuum Cleaner',
        'Musical Instrument',
        'Exercise Equipment',
        'Projector and Screen',
    ]

    const humanWorkers = [
        'Event Staff',
        'IT Consultant',
        'Photographer',
        'Videographer',
        'Catering Service',
        'Cleaning Service',
        'Personal Trainer',
        'Freelance Writer',
        'Virtual Assistant',
        'Graphic Designer',
        'Language Translator',
        'Construction Worker',
        'Landscaping Service',
    ]

    const necessities = [
        'Art and Props',
        'Clothes and Costumes',
        'Sports and Recreation',
        'Educational Resources',
    ]

    let type = null;

    let options = null;

    if (selected === "Properties") {
        type = properties;
    } else if (selected === "Vehicles") {
        type = vehicles;
    } else if (selected === "Electronics") {
        type = electronics;
    } else if (selected === "Household Goods") {
        type = household;
    } else if (selected === "Human Workers") {
        type = humanWorkers;
    } else if (selected === "Other Necessities") {
        type = necessities;
    } else {
        type = ['Select Category Name']
    }

    if (type) {
        options = type
    }


    // Location

    const punjab = [
        '18-Hazari', 'Ahmadpur East', 'Ahmedpur Sial', 'Alipur', 'Arifwala', 'Attock', 'Bahawalnagar', 'Bahawalpur City', 'Bahawalpur Saddar',
        'Bhakkar', 'Bhalwal', 'Bhawana', 'Bhera', 'Burewala', 'Chak Jhumra', 'Chakwal', 'Chaubara', 'Chichawatni', 'Chiniot', 'Chishtian',
        'Choa Saidan Shah', 'Chunian', 'Darya Khan', 'Daska', 'De-Ex.Area D.G.Khan', 'De-Ex.Area Rajanpur', 'Depalpur', 'Dera Ghazi Khan',
        'Dina', 'Dunyapur', 'Faisalabad City', 'Faisalabad Saddar', 'Fateh Jang', 'Ferozewala', 'Fort Abbas', 'Gojra', 'Gujar Khan', 'Gujranwala City',
        'Gujranwala Saddar', 'Gujrat', 'Hafizabad', 'Haroonabad', 'Hasilpur', 'Hassanabdal', 'Hazro', 'Isa Khel', 'Jalalpur Pirwala', 'Jampur', 'Jand',
        'Jaranwala', 'Jatoi', 'Jehanian', 'Jhang', 'Jhelum', 'Kabirwala', 'Kahror Pacca', 'Kahuta', 'Kallar Kahar', 'Kallar Sayyedan', 'Kalur Kot',
        'Kamalia', 'Kamoke', 'Karor Lal Esan', 'Kasur', 'Khairpur Tamewali', 'Khanewal', 'Khanpur', 'Kharian', 'Khushab', 'Kot Addu', 'Kot Chutta',
        'Kot Momin', 'Kot Radha Kishan', 'Kotli Sattian', 'Lahore Cantt', 'Lahore City', 'Lalian', 'Lawa', 'Layyah', 'Liaquatpur', 'Lodhran', 'Mailsi',
        'Malikwal', 'Mandi Bahauddin', 'Mankera', 'Mian Channu', 'Mianwali', 'Minchinabad', 'Model Town', 'Multan City', 'Multan Saddar', 'Muridkay',
        'Murree', 'Muzaffargarh', 'Nankana Sahib', 'Narowal', 'Naushehra', 'Nowshera Virkan', 'Nurpur', 'Okara', 'Pakpattan', 'Pasrur', 'Pattoki',
        'Phalia', 'Pind Dadan Khan', 'Pindi Bhattian', 'Pindi Gheb', 'Piplan', 'Pir Mahal', 'Quaidabad', 'Rahim Yar Khan', 'Raiwind', 'Rajanpur',
        'Rawalpindi', 'Renala Khurd', 'Rojhan', 'Sadiqabad', 'Safdarabad', 'Sahiwal', 'Sambrial', 'Sammundri', 'Sangla Hill', 'Sarai Alamgir',
        'Sargodha', 'Shahkot', 'Shahpur', 'Shakargarh', 'Shalimar', 'Sharaqpur', 'Sheikhupura', 'Shorkot', 'Shujabad', 'Sialkot', 'Sillanwali', 'Sohawa',
        'Talagang', 'Tandlianwala', 'Taunsa', 'Taxila', 'Toba Tek Singh', 'Vehari', 'Wazirabad', 'Yazman', 'Zafarwal'
    ]

    const kpk = [
        'Abbottabad', 'Adenzai', 'Allai', 'Alpuri', 'Babuzai(Swat)', 'Balakot', 'Banda Daud Shah', 'Bannu', 'Barikot', 'Batagram (Banna)', 'Behrain',
        'Besham', 'Buner', 'Charbagh', 'Charsadda', 'Chitral', 'Daggar/Buner', 'Daraban', 'Dassu', 'Dera Ismail Khan', 'Dir', 'Domel', 'Gagra', 'Ghazi',
        'Hangu', 'Haripur', 'Havelian', 'Jahangira', 'Judba', 'Kabal', 'Kandia', 'Karak', 'Katlang', 'Khadokhail', 'Khander', 'Khwaza Khela', 'Kohat',
        'Kohistan', 'Kulachi', 'Lachi', 'Lahor', 'Lakki Marwat', 'Lal Qila', 'Malakand', 'Mandar', 'Mansehra', 'Mardan', 'Mastuj', 'Matta Shamzai',
        'Mingora', 'Naurang', 'Nowshera', 'Oghi', 'Pabbi', 'Paharpur', 'Palas', 'Paroa', 'Pattan', 'Peshawar', 'Puran', 'Razar', 'Sam Ranizai',
        'Samarbagh(Barwa)', 'Shabqadar', 'Sharingal', 'Swabi', 'Swat Ranizai', 'Takht Bhai', 'Takht-E-Nasrati', 'Tall', 'Tangi', 'Tank', 'Temergara',
        'Topi', 'Wari'
    ]

    const sindh = [
        'Airport', 'Aram Bagh', 'Badin', 'Bakrani', 'Baldia', 'Bhiria', 'Bin Qasim', 'Bulri Shah Karim', 'Chachro', 'Chamber', 'Civil Line', 'Dadu',
        'Daharki', 'Daur', 'Dhali', 'Digri', 'Diplo', 'Dokri', 'Faiz Ganj', 'Ferozabad', 'Gadab', 'Gambat', 'Garden', 'Garhi Khairo', 'Garhi Yasin',
        'Ghorabari', 'Ghotki', 'Gulberg', 'Gulshan-E-Iqbal', 'Gulzar-E-Hijri', 'Hala', 'Harbour', 'Hussain Bux Marri', 'Hyderabad', 'Hyderabad City',
        'Ibrahim Hyderi', 'Islamkot', 'Jacobabad', 'Jam Nawaz Ali', 'Jamshed Quarter', 'Jati', 'Jhando Mari', 'Jhuddo', 'Johi', 'Kaloi', 'Kambar',
        'Kandhkot', 'Kandioro', 'Kashmore', 'Keti Bunder', 'Khairpur', 'Khairpur Nathan Shah', 'Khangarh (Khanpur)', 'Khanpur', 'Kharo Chan', 'Khipro',
        'Kingri', 'Korangi', 'Kot Diji', 'Kot Ghulam Mohammad', 'Kotri', 'Kubo Saeed Khan', 'Kunri', 'Lakhi', 'Landhi', 'Larkana', 'Latifabad', 'Liaquatabad',
        'Lyari', 'Madol Colony', 'Manghopir', 'Manjhand', 'Matiari', 'Matli', 'Mauripur', 'Mehar', 'Mehrabpur', 'Miro Khan', 'Mirpur Bathoro', 'Mirpur Khas',
        'Mirpur Mathelo', 'Mirpur Sakro', 'Mirwah', 'Mithi', 'Mominabad', 'Moro', 'Murad Memon', 'Nagar Parkar', 'Nara', 'Nasirabad', 'Naushahro Feroze',
        'Nawab Shah', 'Nazimabad', 'New Karachi', 'New Sukkur', 'North Nazimabad', 'Orangi', 'Pano Aqil', 'Pithoro', 'Qasimabad', 'Qazi Ahmed', 'Rato Dero',
        'Rohri', 'Saddar', 'Saeedabad', 'Sakrand', 'Salehpat', 'Samaro', 'Sanghar', 'Sehwan', 'Shah Bunder', 'Shah Faisal', 'Shah Murad', 'Shahdadkot',
        'Shahdadpur', 'Shaheed Fazal Rahu', 'Shikarpur', 'Shujabad', 'Sindhri', 'Sinjhoro', 'Site', 'Sobhodero', 'Sujawal', 'Sujawal Junejo', 'Sukkur',
        'Talhar', 'Tando Adam', 'Tando Allahyar', 'Tando Bago', 'Tando Ghulam Hyder', 'Tando Mohammad Khan', 'Tangwani', 'Thano Bula Khan', 'Thatta',
        'Thul', 'Ubauro', 'Umerkot', 'Warah'
    ]

    const balochistan = [
        'Aranji', 'Ashwat', 'Awaran', 'Baba Kot', 'Badini', 'Baiker', 'Balanari', 'Balnigor', 'Barkhan', 'Barshore', 'Bela', 'Besima', 'Bhag', 'Buleda', 'Chagai',
        'Chaman', 'Chattar', 'Dak', 'Dalbandin', 'Dasht', 'Dasht', 'Dera Bugti', 'Dera Murad Jamali', 'Dhadar', 'Dobandi', 'Drug', 'Duki', 'Dureji', 'Faridabad',
        'Gaddani', 'Gandakha', 'Gandawa', 'Gazg', 'Gichk', 'Gishkore', 'Gowargo', 'Grasha', 'Greshek', 'Grisini', 'Gulistan', 'Gwadar', 'Harnai', 'Hoshab', 'Hub',
        'Hurramzai', 'Jhal Jao', 'Jhal Magsi', 'Jhat Pat', 'Jiwani', 'Johan', 'Kahan', 'Kalat', 'Kanmetharzai', 'Kanraj', 'Karakh', 'Karezat', 'Kashatu', 'Khad Koocha',
        'Kharan', 'Khattan', 'Khoast', 'Khuzdar', 'Killa Abdullah', 'Killa Saifullah', 'Kingri', 'Kirdgap', 'Kohlu', 'Korak Jahoo', 'Kutmandai', 'Lakhra', 'Lehri',
        'Liari', 'Loiband', 'Loralai', 'Loti', 'Mach', 'Malam', 'Mand', 'Mangochar', 'Mashkai', 'Mashkhel', 'Mastung', 'Mawand', 'Mekhtar', 'Mirpur', 'Moola', 'Musakhel',
        'Muslim Bagh', 'Nag', 'Nokundi', 'Nushki', 'Ormara', 'Ornach', 'Panjgur', 'Panjpai', 'Parome', 'Pasni', 'Phelawagh', 'Pir Koh', 'Pishin', 'Qamar Din Karez',
        'Quetta City', 'Quetta Saddar', 'Sambaza', 'Sangan', 'Sangsillah', 'Sanhri', 'Sanni', 'Sar-Kharan', 'Saranan', 'Saroona', 'Shahgori', 'Sharigh', 'Sheerani',
        'Shinki', 'Sibi', 'Sinjawi', 'Sohbatpur', 'Sonmiani/Winder', 'Sui', 'Suntsar', 'Surab', 'Taftan', 'Tamboo', 'Tamboo', 'Tohumulk', 'Tump', 'Turbat',
        'Usta Mohammad', 'Uthal', 'Wadh', 'Washuk', 'Zamuran', 'Zehri', 'Zhob', 'Ziarat'
    ]

    const gilgit = [
        'Ali Abad', 'Astore', 'Babu Sar', 'Chilas', 'Darel', 'Gahkoch', 'Gilgit', 'Gojal', 'Gultari', 'Gupis', 'Ishkoman', 'Khaplu', 'Kharmang', 'Mashabrum', 'Nagar-I', 'Nagar-II',
        'Punial', 'Rondu', 'Shigar', 'Shounter', 'Skardu', 'Tangir', 'Yasin'
    ]

    let locationType = null;

    let locationOptions = null;

    if (locationSelected === "Punjab") {
        locationType = punjab;
    } else if (locationSelected === "Sindh") {
        locationType = sindh;
    } else if (locationSelected === "KPK") {
        locationType = kpk;
    } else if (locationSelected === "Balochistan") {
        locationType = balochistan;
    } else if (locationSelected === "Gilgit Baltistan") {
        locationType = gilgit;
    } else {
        locationType = ['Select City']
    }

    if (locationType) {
        locationOptions = locationType
    }

    return (
        <>
            <ListProduct.Provider value={{
                changeSelectOptionHandler, options, selected, changeSelectLocationHandler,
                locationOptions, locationSelected
            }}>
                {children}
            </ListProduct.Provider>
        </>
    )
}
