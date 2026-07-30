import {
 motion,
 useMotionValue,
 useSpring,
 useTransform
} from "framer-motion";


import FloatingCard from "./FloatingCard";



export default function HeroVisual(){



/*
 მაუსის მოძრაობის კონტროლი
*/

const mouseX = useMotionValue(0);

const mouseY = useMotionValue(0);




const smoothX = useSpring(mouseX,{
 stiffness:80,
 damping:20
});


const smoothY = useSpring(mouseY,{
 stiffness:80,
 damping:20
});





/*
 მთავარი card-ის 3D მოძრაობა
*/

const rotateX = useTransform(
 smoothY,
 [-0.5,0.5],
 [15,-15]
);


const rotateY = useTransform(
 smoothX,
 [-0.5,0.5],
 [-15,15]
);




const moveX = useTransform(
 smoothX,
 [-0.5,0.5],
 [-20,20]
);


const moveY = useTransform(
 smoothY,
 [-0.5,0.5],
 [-20,20]
);






function mouseMove(e){


const rect =
e.currentTarget.getBoundingClientRect();



const x =
(e.clientX-rect.left)
/rect.width;



const y =
(e.clientY-rect.top)
/rect.height;



mouseX.set(x-.5);

mouseY.set(y-.5);


}




function reset(){

mouseX.set(0);

mouseY.set(0);

}






const cards=[

{
title:"Revenue",
value:"$42K",
type:"chart",
position:
"top-10 left-3 sm:left-8 lg:-left-14"
},


{
title:"Users",
value:"12K",
type:"users",
position:
"top-10 right-3 sm:right-8 lg:-right-14"
},


{
title:"Growth",
value:"+98%",
type:"progress",
position:
"bottom-10 left-3 sm:left-8 lg:-left-14"
},


{
title:"Status",
value:"Online",
type:"status",
position:
"bottom-10 right-3 sm:right-8 lg:-right-14"
}


];







return (

<div


onMouseMove={mouseMove}

onMouseLeave={reset}



className="

relative

w-full

h-[550px]

sm:h-[650px]

flex

items-center

justify-center

perspective-[1200px]

overflow-visible

"

>





{/* Background glow */}


<motion.div

animate={{

scale:[1,1.2,1],

opacity:[.4,.8,.4]

}}

transition={{

duration:6,

repeat:Infinity

}}



className="

absolute

w-[300px]

h-[300px]

rounded-full

bg-purple-500/30

blur-[120px]

"

/>






{/* Main card */}


<motion.div



style={{

rotateX,

rotateY,

x:moveX,

y:moveY

}}



initial={{

opacity:0,

scale:.7,

y:80

}}


animate={{

opacity:1,

scale:1,

y:0

}}


transition={{

duration:1

}}




className="

z-10

w-[280px]

sm:w-[400px]

md:w-[480px]


h-[280px]


rounded-[35px]


border

border-white/20


bg-white/10


backdrop-blur-2xl


p-8


shadow-2xl

"

>



<p className="text-white/50">

Dashboard

</p>



<h1 className="

text-white

text-4xl

font-bold

">

Analytics

</h1>



<div className="

mt-12

h-32

flex

items-end

gap-3

">


{

[40,70,50,90,60].map((h,i)=>(


<motion.div

key={i}

animate={{

height:[`${h}%`,`40%`,`${h}%`]

}}

transition={{

repeat:Infinity,

duration:2

}}



className="

flex-1

bg-white/20

rounded-xl

"

/>


))


}



</div>



</motion.div>






{

cards.map((card,index)=>(


<FloatingCard

key={card.title}

{...card}

index={index}

/>


))


}




</div>


)

}