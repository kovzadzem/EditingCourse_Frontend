import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Syllabus.css";

import {
FaMoon,
FaSun,
FaBars,
FaSearch,
FaTachometerAlt,
FaBook,
FaLayerGroup,
FaVideo,
FaPlayCircle,
FaUserGraduate,
FaCreditCard,
FaImages,
FaFileAlt,
FaEnvelope,
FaCog,
FaSignOutAlt,
FaBell,
FaUserCircle
} from "react-icons/fa";


function Syllabus(){


const [darkMode,setDarkMode]=useState(
localStorage.getItem("theme")==="dark"
);


const [sidebarOpen,setSidebarOpen]=useState(false);

const [search,setSearch]=useState("");



useEffect(()=>{

if(darkMode){

document.body.classList.add("dark");
localStorage.setItem("theme","dark");

}else{

document.body.classList.remove("dark");
localStorage.setItem("theme","light");

}

},[darkMode]);




const syllabusData=[


{
title:"ლექცია 01",
subtitle:"Adobe Premiere Pro-ის გაცნობა და პროექტის შექმნა",
topics:[
"რა არის Adobe Premiere Pro",
"პროგრამის ინტერფეისის მიმოხილვა",
"Workspace-ის მოწყობა",
"პროექტის შექმნა და შენახვა",
"მედია ფაილების იმპორტი",
"Project Panel-ის გამოყენება",
"ფაილების ორგანიზება და Bin-ები"
]
},


{
title:"ლექცია 02",
subtitle:"Sequence & Tools",
topics:[
"Sequence-ის შექმნა",
"Sequence-ის პარამეტრები",
"Timeline-ის სრული მიმოხილვა",
"Selection Tool",
"Razor Tool",
"Ripple Edit Tool",
"Slip & Slide Tool",
"Track Select Tool",
"Timeline-ში ეფექტური მუშაობა"
]
},


{
title:"ლექცია 03",
subtitle:"Effect Controls & Video Options",
topics:[
"Effect Controls Panel",
"Position",
"Scale",
"Rotation",
"Opacity",
"Anchor Point",
"Motion-ის საფუძვლები",
"პრაქტიკული მაგალითები"
]
},


{
title:"ლექცია 04",
subtitle:"Motion Design, Graphs & Keyframes",
topics:[
"Keyframe-ის პრინციპები",
"Smooth Animation",
"Ease In / Ease Out",
"Speed Graph",
"Value Graph",
"Motion Design",
"დინამიკური ანიმაციები"
]
},


{
title:"ლექცია 05",
subtitle:"Text & Titles",
topics:[
"Essential Graphics Panel",
"ტექსტის დამატება",
"Typography",
"Text Animation",
"Kinetic Typography",
"AI Titles",
"თანამედროვე ტიტრები"
]
},


{
title:"ლექცია 06",
subtitle:"Effects & Blending Modes",
topics:[
"Effects Panel",
"Adjustment Layer",
"Blend Modes",
"Transition Effects",
"Blur Effects",
"Glow Effects",
"Visual Effects"
]
},


{
title:"ლექცია 07",
subtitle:"Lumetri Color & Color Grading",
topics:[
"ფერის თეორია",
"Lumetri Color",
"Basic Correction",
"Curves",
"Color Wheels",
"HSL Secondary",
"LUT გამოყენება"
]
},


{
title:"ლექცია 08",
subtitle:"Masking & Color Masking",
topics:[
"Masking საფუძვლები",
"Ellipse Mask",
"Rectangle Mask",
"Pen Tool Mask",
"Object Tracking",
"Background Blur",
"Creative Mask Transitions"
]
},


{
title:"ლექცია 09",
subtitle:"ვიდეო და აუდიოს სინქრონიზაცია",
topics:[
"Auto Sync",
"Manual Sync",
"Multicam Sync",
"Waveform გამოყენება",
"Sync პრობლემები",
"ინტერვიუს მონტაჟი"
]
},


{
title:"ლექცია 10",
subtitle:"Sound Design & Sound Effects",
topics:[
"აუდიოს დამუშავება",
"Sound Effects",
"Whoosh",
"Impact",
"Risers",
"Ambience",
"Audio Mixing"
]
},


{
title:"ლექცია 11",
subtitle:"Green Screen, Nesting & Multicam",
topics:[
"Green Screen",
"Ultra Key Effect",
"ფონის შეცვლა",
"Spill Removal",
"Nesting",
"Multicam Editing"
]
},


{
title:"ლექცია 12",
subtitle:"Render, Envato, Epidemic Sound & Export",
topics:[
"Render",
"Export Settings",
"H.264",
"YouTube Export",
"TikTok Export",
"Instagram Reels Export",
"Proxy Workflow",
"Envato Elements",
"Epidemic Sound"
]
}



];





return (

<div className="dashboard">


{sidebarOpen &&

<div 
className="overlay"
onClick={()=>setSidebarOpen(false)}
></div>

}



<aside className={sidebarOpen ? "sidebar open" : "sidebar"}>

  <div className="logo">
    <h2>ედიტოლოგია</h2>
  </div>

  <ul>

    <li>
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          isActive ? "sidebar-link active-link" : "sidebar-link"
        }
      >
        <FaTachometerAlt />
        <span>მართვის პანელი</span>
      </NavLink>
    </li>

    <li>
      <NavLink
        to="/courses"
        className={({ isActive }) =>
          isActive ? "sidebar-link active-link" : "sidebar-link"
        }
      >
        <FaBook />
        <span>კურსები</span>
      </NavLink>
    </li>

    <li>
      <NavLink to="/calendar" className="sidebar-link">
        <FaLayerGroup />
        <span>კალენდარი</span>
      </NavLink>
    </li>

    <li>
      <NavLink to="/offlinecourse" className="sidebar-link">
        <FaVideo />
        <span>დამსწრე ჯგუფები</span>
      </NavLink>
    </li>

    <li>
      <NavLink to="/recordings" className="sidebar-link">
        <FaPlayCircle />
        <span>ჩანაწერები</span>
      </NavLink>
    </li>

    <li>
      <NavLink to="/students" className="sidebar-link">
        <FaUserGraduate />
        <span>სტუდენტები</span>
      </NavLink>
    </li>

    <li>
      <NavLink to="/payments" className="sidebar-link">
        <FaCreditCard />
        <span>გადახდები</span>
      </NavLink>
    </li>

    <li>
      <NavLink to="/gallery" className="sidebar-link">
        <FaImages />
        <span>გალერეა</span>
      </NavLink>
    </li>

    <li>
      <NavLink to="/syllabus" className="sidebar-link">
        <FaFileAlt />
        <span>სილაბუსი</span>
      </NavLink>
    </li>

    <li>
      <NavLink to="/contact" className="sidebar-link">
        <FaEnvelope />
        <span>კონტაქტი</span>
      </NavLink>
    </li>

    <li>
      <NavLink to="/settings" className="sidebar-link">
        <FaCog />
        <span>პარამეტრები</span>
      </NavLink>
    </li>

    <li className="logout">
      <NavLink to="/login" className="sidebar-link">
        <FaSignOutAlt />
        <span>გასვლა</span>
      </NavLink>
    </li>

  </ul>

</aside>




<main className="main-content">


<header className="syllabus-header">


<div className="syllabus-left">


<button 
className="syllabus-menu-btn"
onClick={()=>setSidebarOpen(!sidebarOpen)}
>

<FaBars/>

</button>



<div className="search-box">

<FaSearch/>

<input
placeholder="ლექციის ძებნა..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

</div>


</div>





<div className="syllabus-right">


<button
className="syllabus-theme-btn"
onClick={()=>setDarkMode(!darkMode)}
>

{
darkMode?<FaSun/>:<FaMoon/>
}

</button>


<button className="notification-btn">

<FaBell/>

</button>



<div className="admin-profile">

<FaUserCircle/>

<div className="admin-info">

<h4>
Admin
</h4>

<span>
Administrator
</span>

</div>

</div>



</div>


</header>





<section className="syllabus-grid">


{
syllabusData.map((lesson,index)=>(


<div className="syllabus-card" key={index}>


<div className="lesson-number">

{lesson.title}

</div>


<h2>
{lesson.subtitle}
</h2>



<ul>

{
lesson.topics.map((item,i)=>(

<li key={i}>
{item}
</li>

))
}

</ul>



</div>


))
}


</section>



</main>


</div>

);


}


export default Syllabus;