import { useEffect, useState } from "react";

export default function DashBoard() {
    const [quote,setQuote] = useState([])
    const apiKey = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        const fetchquote = async () => {
            try {
                const response = await fetch('https://api.api-ninjas.com/v1/quotes', {
                    headers: {
                        "X-Api-Key": apiKey,
                    }
                });
                const data = await response.json();
                setQuote(data[0])
            } catch (error) {
                console.error(error);
            }
        };
        
        // fetchquote();
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
                  <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
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
            
          </div>
        </div>
      </div>
    );
}
