import { useEffect, useState } from "react";
import PomodoroWidget from "./PomodoroWidget";
import { XCircle, Clock ,CheckCircle2Icon } from "lucide-react";
export default function DashBoard({isLightTheme,tasks}) {
    const [quote,setQuote] = useState([])

    // If using APi nijas 

    const apiKey = import.meta.env.VITE_API_KEY;

    useEffect(() => {
      const fetchQuote = async (attempt = 0) => {
          if (attempt >= 5) return; // avoid infinite loop
  
          try {
              const response = await fetch('https://api.api-ninjas.com/v1/quotes', {
                  headers: {
                      "X-Api-Key": apiKey,
                  }
              });
              const data = await response.json();
              if (data[0] && data[0].quote && data[0].quote.length < 200) {
                  setQuote(data[0]);
              } else {
                  fetchQuote(attempt + 1); // retry
              }
          } catch (error) {
              console.error(error);
          }
      };
  
      fetchQuote();
  }, []);
  
  

   
    
    return (
        <div className=" w-full p-6    ">    
        {/* from-gray-50 to-gray-100 bg-gradient-to-br */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Main Quote Card */}
            <div className="relative p-8 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 text-white rounded-3xl shadow-2xl overflow-hidden group hover:shadow-3xl transition-all duration-300">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-20 translate-y-20"></div>
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="mb-6">
                  <h2 className="text-2xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                    Good Morning, User 🌞
                  </h2>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-0.5 bg-white/40"></div>
                    <h3 className="text-lg font-medium text-blue-100">Quote of the Day</h3>
                  </div>
                </div>
                
                <blockquote className="relative">
                  <div className="text-6xl text-white/20 absolute -top-4 -left-2">"</div>
                  <p className="text-xl font-medium leading-relaxed pl-8 italic">
                    {quote?.quote || "Loading inspirational quote..."}
                  </p>
                  {quote?.author && (
                    <cite className="block text-right text-blue-200 mt-4 font-semibold">
                      — {quote.author}
                    </cite>
                  )}
                </blockquote>
              </div>
              
              {/* Shine Effect */}
              <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
            </div>

           <div className=" relative p-8 bg-gradient-to-br rounded-3xl h-52 from-blue-300 via-purple-400 overflow-hidden to-pink-500  ">
                 <div className="inset-0 absolute opacity-10">
                 <div className=" absolute rounded-full w-32 h-32 top-0 left-0 bg-white  -translate-x-12 -translate-y-10"></div>
                 <div className=" absolute rounded-full w-32 h-32 bottom-0 right-0 bg-white  translate-x-12 translate-y-10"></div>
                 </div>
                  <div className="relative z-10">
<PomodoroWidget/>
                  </div>
           </div>

           <div className="relative p-5 bg-gradient-to-br from-purple-700 via-pink-500 to-blue-500 rounded-3xl overflow-hidden shadow-lg">
  {/* Faint background circles */}
  <div className="inset-0 absolute opacity-10 pointer-events-none">
    <div className="bg-white absolute top-0 left-0 rounded-full w-32 h-32 -translate-x-12 -translate-y-10"></div>
    <div className="bg-white absolute bottom-0 right-0 rounded-full w-32 h-32 translate-x-12 translate-y-10"></div>
  </div>

  {/* Content wrapper */}
  <div className="relative z-10 p-6 bg-black/20 rounded-2xl backdrop-blur-md">
    <div className="flex w-full">
      <h2 className="font-bold text-3xl text-white mb-6">Current Tasks</h2>
    </div>

    {/* Header row */}
    <div className="grid grid-cols-3 gap-4 mb-2 text-white/90 font-semibold">
      <h2 className="text-lg md:text-xl">Tasks</h2>
      <h2 className="text-lg md:text-xl">Priority</h2>
      <h2 className="text-lg md:text-xl">Status</h2>
    </div>

    <hr className="mb-4 border-white/20" />

    {/* Task rows */}
    {tasks.map((task) => (
      <div className="grid grid-cols-3 gap-4 items-center py-2" key={task.id}>
        {/* Task Title  */}
        <div className="whitespace-normal break-words max-w-[200px] md:max-w-xs">
          <h2 className="text-white text-lg md:text-xl italic font-semibold">
            {task.title}
          </h2>
        </div>

        {/* Priority */}
        <div>
          <h2
            className={`text-lg italic font-semibold ${
              task.priority === "high"
                ? "text-red-400"
                : task.priority === "medium"
                ? "text-yellow-300"
                : "text-green-300"
            }`}
          >
            {task.priority}
          </h2>
        </div>

        {/* Status */}
        <div>
          {task.status === "pending" ? (
            <Clock size={26} className="text-red-300" />
          ) : (
            <CheckCircle2Icon size={26} className="text-green-300" />
          )}
        </div>
      </div>
    ))}
  </div>
</div>



          </div> 
        </div>


      </div>
    );
}
