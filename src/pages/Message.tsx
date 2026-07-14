
import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Message = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log("Submitting contact form:", formData);
      
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      if (error) {
        throw error;
      }

      console.log("Email sent successfully:", data);

      toast({
        title: "Message Sent!",
        description: "Thanks for getting in touch. I'll get back to you soon.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });

    } catch (error: unknown) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };


    useEffect(() => {
    const mountTimeout = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(mountTimeout);
  }, []);
  
  const handleBacktoHome = () => {
    setIsExiting(true); // trigger slide-down animation
  };
  
  const handleBackToHome = () => {
    setIsExiting(true);
  };


   useEffect(() => {
    if (isExiting) {
      const timeout = setTimeout(() => {
        navigate("/");
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [isExiting, navigate]);
  
  return (
    <div className={`select-none min-h-screen bg-white dark:bg-black flex items-center justify-center bg-white dark:bg-black transition-colors duration-500 pb-20 ${
      isExiting ? "animate-slide-down" : "animate-slide-up"
    }`}>
      <div className="w-full max-w-lg bg-white dark:bg-black dark:text-gray-400 p-8">


           <div className="text-left text-2xl sm:text-3xl transition-all mb-8">
            <br/><br/>
for inquiries:<br />
<a
  href="mailto:tostudierzimmer@gmail.com"
  className="text-black-600 hover:underline cursor-pointer"
>
  <u>tostudierzimmer@gmail.com</u>
</a>
<br /><br />
        </div>
      
      {/* Back Button */}
    {isMounted && (
        <div
          className={`fixed top-5 xl:top-20 right-0 md:right-0 xl:right-20 z-50 transition-opacity duration-3000 ease-in-out ${
            !isExiting ? "animate-elastic-grow opacity-100" : "animate-elastic-shrink opacity-100"
          }`}
        >
          <button
            onClick={handleBackToHome}
            className="relative 2xl:px-4 py-2 bg-alpha hover:scale-110 active-scale-110 dark:bg-gray-900 text-gray-900 dark:text-white dark:border-white/20 border-gray-300 font-9xl dark:hover:bg-gray-800 transition-all duration-500"
          >
            <div className="text-2xl sm:text-4xl transition-all w-10 h-10 mr-1 animate-bounce duration-2000">&lt;
</div>
          </button>
        </div>
      )}
      
      </div>
    </div>
    
  );
};

export default Message;
