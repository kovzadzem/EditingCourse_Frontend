import { motion } from "framer-motion";
import { useState } from "react";


export default function FloatingCard({
  title,
  value,
  position,
}) {


  /*
    ბოქსის გახსნის მდგომარეობა

    false = ჩვეულებრივი მდგომარეობა
    true = გახსნილი დიზაინი
  */

  const [open, setOpen] = useState(false);



  /*
    მაუსის მდებარეობა

    ამით ვაკეთებთ განათებას,
    რომელიც მაუსს მიყვება
  */

  const [mouse, setMouse] = useState({

    x:0,
    y:0

  });





  /*
    მაუსის მოძრაობის დაჭერა

    ვიგებთ სად არის მაუსი
    ბოქსის შიგნით
  */

  function handleMouseMove(e){


    const rect =
    e.currentTarget.getBoundingClientRect();



    setMouse({

      x:e.clientX - rect.left,

      y:e.clientY - rect.top

    });


  }





  /*
    მაუსის გასვლისას
    განათება ბრუნდება ცენტრში
  */

  function resetGlow(){


    setMouse({

      x:70,

      y:70

    });


  }






  /*
    ბოქსის გახსნა

    მუშაობს:

    Desktop click-ზე
    Mobile touch-ზე
  */

  function openCard(){


    setOpen(!open);


  }







return (



<motion.div



onMouseMove={handleMouseMove}


onMouseLeave={resetGlow}



onClick={openCard}



onTouchStart={openCard}






animate={{


  /*
    გახსნისას ბოქსი მაღლა იწევა
  */

  y: open ? -80 : [0,-18,0],



  /*
    პატარა მოძრაობა
  */

  rotateZ: open ? 3 : 0


}}





transition={{

duration:.8,

ease:"easeInOut"

}}






whileHover={{

scale:1.08

}}






className={`


absolute

${position}


z-20



w-[125px]

sm:w-[150px]

md:w-44



rounded-3xl



border

border-white/20



bg-white/10



backdrop-blur-xl



shadow-2xl



p-3

sm:p-5



overflow-hidden



cursor-pointer



select-none



`}



>






{/*

    MOUSE GLOW EFFECT

    მაუსის უკან მოძრავი განათება

*/}



<motion.div



animate={{

x:mouse.x - 80,

y:mouse.y - 80

}}




transition={{

type:"spring",

stiffness:120,

damping:25

}}





className="


pointer-events-none


absolute



w-40

h-40



rounded-full



bg-purple-400/40



blur-3xl



"





/>








{/*

    მეორე ლურჯი განათება

*/}


<motion.div



animate={{

x:mouse.x - 40,

y:mouse.y - 40

}}




className="


pointer-events-none


absolute



w-24

h-24



rounded-full



bg-blue-400/40



blur-2xl



"





/>









{/*

    დაჭერისას დამატებითი ნათება

*/}



<motion.div



animate={{

opacity:open ? 1 : 0,

scale:open ? 1.5 : .5


}}




className="


absolute


inset-0



bg-gradient-to-br


from-purple-400/40


via-blue-400/20


to-transparent



blur-xl



"




/>









{/*

    მთავარი ტექსტი

*/}



<div className="relative z-10">





<p className="


text-white/50


text-xs



">

{title}

</p>





<h3 className="


text-white


font-bold



text-lg

sm:text-xl



mt-1



">

{value}

</h3>









{/*

    ჩვეულებრივი მდგომარეობის დიზაინი

*/}



{!open && (



<div className="


flex


gap-2


mt-4



">


<div className="


w-7

h-7



rounded-xl



bg-purple-400/40



"/>




<div className="


w-7

h-7



rounded-xl



bg-blue-400/40



"/>




<div className="


w-7

h-7



rounded-xl



bg-white/20



"/>



</div>



)}









{/*

    გახსნილი მდგომარეობა

*/}



{open && (



<motion.div



initial={{

opacity:0,

y:20

}}



animate={{

opacity:1,

y:0

}}



transition={{

duration:.5

}}





className="mt-4"



>



<p className="


text-white/80


text-xs



">

Analytics details

</p>







{/*

    პატარა სტატისტიკის ბლოკები

*/}



<div className="


flex


gap-2


mt-3



">


<div className="


w-8

h-8



rounded-xl



bg-white/30



"/>



<div className="


w-8

h-8



rounded-xl



bg-white/20



"/>



<div className="


w-8

h-8



rounded-xl



bg-white/10



"/>



</div>







{/*

    Progress bar

*/}



<div className="


mt-4



h-2



rounded-full



bg-white/20



overflow-hidden



">


<motion.div



initial={{

width:"0%"

}}



animate={{

width:"85%"

}}



transition={{

duration:1

}}



className="


h-full



bg-white



rounded-full



"




/>



</div>





</motion.div>



)}



</div>






</motion.div>



);


}