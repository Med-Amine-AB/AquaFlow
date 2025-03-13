// pages/Home.js
import React ,{ useEffect, useState } from "react";
import { motion ,useAnimation} from "framer-motion";
import ScrollAnimation from "react-animate-on-scroll";
import { IconCloud } from "../components/magicui";
// import "../../public/static/css/home.css"
"use client";
import { InteractiveGridPattern } from "../components/interactive-grid-pattern";
import Navbar from "../components/Navbar";
import { FaWater, FaBell, FaChartLine, FaPlug, FaShieldAlt, FaMobileAlt } from "react-icons/fa";


const images = [
  "/react-logo.png",
  "/python-logo.png",
  "/flask-logo.png",
  "/jupyter-logo.png",
  "/vite-logo.png",
  "/scikit-learn-logo.png",
  "/tenserflow-logo.png",
  "/taillwind-logo.png",
  "/javasript-logo.png",
  "/ts-logo.png",
  "/html-logo.png",
  "/css-logo.png",
  "/neural-network.png",
  "/pandas.png",
  "/numpy.png",
  "/matplotlib.png",
  "/condas.png",
  "/Karas.png",
];
const features = [
  { title: "Real-time Monitoring", description: "Track water usage 24/7.", icon: FaWater },
  { title: "AI-powered Leak Detection", description: "Identify anomalies instantly.", icon: FaChartLine },
  { title: "Instant Alerts", description: "Get notified immediately.", icon: FaBell },
  { title: "Automatic Shutoff", description: "Prevent damage and wastage.", icon: FaShieldAlt },
  { title: "Smart Home Integration", description: "Works with Alexa & Google Assistant.", icon: FaPlug },
  { title: "Mobile Dashboard", description: "View usage trends & analytics.", icon: FaMobileAlt }
];


const Home = () => {
  const cn = (...args) => args.filter(Boolean).join(' ');
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const services = [
    {
      title: "Nettoyage de Données pour un Ensemble de Données sur les Voitures",
      description:
        "Dans le monde d'aujourd'hui, axé sur les données, la qualité de vos données influence directement la précision de vos analyses. Notre processus complet de nettoyage de données pour les ensembles de données sur les voitures garantit une base solide pour des analyses et des prédictions fiables.",
      image:"/cars_cleaning.png",
      link: "/Data_Cleaning/Houses",
    },
    {
      title: "Analyser des Données des Voitures",
      description:
        "Explorez et comprenez les données liées aux voitures grâce à des visualisations intuitives et des statistiques descriptives. Plongez dans les tendances et obtenez des perspectives claires pour des prises de décision éclairées.",
      image: "/cars_analse.png",
      link: "/Analyse/cars",
    },
    {
      title: "Prédisez les Prix des Voitures avec un Modele de Machine Learning Avancées",
      description:
        "Découvrez notre solution innovante pour prédire les prix des voitures grâce à des techniques avancées de machine learning. Ce projet intègre un modèle de réseau neuronal sophistiqué construit avec TensorFlow, conçu pour fournir des estimations précises et fiables des prix des véhicules.",
      image: "/cars_model.png",
      link: "/Models/Cars-model",
    },
    {
      title: "Nettoyage de Données pour le Secteur Immobilier",
      description:
        "Dans un marché immobilier compétitif, des données fiables sont essentielles pour prendre des décisions éclairées. Ce projet se concentre sur le nettoyage et la préparation de données immobilières provenant de Casablanca pour une analyse précise.",
      image: "/house_cleaning.png",
      link: "/Data_Cleaning/Houses",
    },
    {
      title: "Analyse des Données des Maisons",
      description:
        "Découvrez les tendances du marché immobilier grâce à des visualisations et des graphiques interactifs. Analysez des indicateurs clés comme les prix par surface, la répartition des propriétés, les conditions des biens, et bien plus encore.",
      image: "/house_analyse.png",
      link: "/Analyse/houses",
    },
    {
      title: "Prédiction des Prix Immobiliers",
      description:
        "Prédisez les prix des biens immobiliers en fonction de leurs caractéristiques grâce à un modèle avancé. Notre outil innovant utilise des algorithmes de machine learning pour offrir des estimations précises sur les propriétés au Maroc, en tenant compte de facteurs tels que la localisation, la surface et l'état.",
      image: "/house_model.png",
      link: "/Models/Houses-model",
    },
  ];
  
  return (
        <div className="bg-gray-100 text-gray-800 ">
           <Navbar/>
          {/* Hero Section */}
      <motion.section
        className="relative bg-white sm:h-screen :bg-gray-900"
        initial={{ opacity: 0 }}
        animate={{opacity:1}}
        transition={{ duration: 1 }}
      >
         <video
        className="absolute z-0 top-0 left-0 h-screen w-full object-cover"
        src="/istockphoto-1961001965-640_adpp_is.mp4" // Replace with the path to your video file
        autoPlay
        loop
        muted
      ></video>

        <div className="grid max-w-screen-xl z-50 px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
          <motion.div
            className="mr-auto place-self-center z-50 lg:col-span-7"
            initial={{ x: -200 }}
            animate={{ x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
           <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl :text-white z-50 text-gray-800">
            Smart Water Leak Detection and Prevention System
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-700 lg:mb-8 md:text-lg lg:text-xl :text-gray-400 z-50">
              This project involves predicting the prices of cars and houses using machine learning models.
            </p>
            <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4 z-50">
              <motion.a
                href="https://github.com/youssefmaimouni/houses_cars_prices_prediction"
                className="inline-flex items-center justify-center w-full px-5 py-3 z-50 text-sm font-medium text-center text-gray-900 border border-gray-200 rounded-lg sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 :text-white :border-gray-700 :hover:bg-gray-700 :focus:ring-gray-800"
                whileHover={{ scale: 1.1 }}
              >
                <svg
                  className=" z-50 w-4 h-4 mr-2 text-gray-500 :text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 496 512"
                >
                  <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                </svg>
                View on GitHub
              </motion.a>
            </div>
          </motion.div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex z-50">
            <motion.img
              src="/waterLeak1.png"
              alt="hero image"
              initial={{ opacity: 0 }}
              animate={{opacity:1}}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </div>
        </div>
      </motion.section>
{/* Problem Section */}
<section className="relative py-20 px-6 bg-blue-50 min-sm:h-screen flex items-center">
{/* <div 
    className="absolute inset-0 bg-[url('/waterlight.png')] bg-no-repeat bg-cover bg-center blur-sm" ></div> */}
  {/* Background Image */}
  
  {/* Content Container */}
  <div className="container mx-auto px-6 relative z-10">
    <h2 className="text-4xl font-bold text-center text-blue-800 mb-12">
      The Silent Crisis: Water Waste from Leaks and Overuse
    </h2>
    
    {/* Grid Layout for Text and Image */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center">
      {/* Text Content */}
      <div className="flex  w-full justify-center items-center">
      <div className="space-y-6  w-4/5 bg-gray-50 p-6 rounded-lg shadow-xl">
        <p className="text-gray-900 text-lg leading-relaxed">
          Water scarcity is a growing global issue, with many regions experiencing severe shortages due to climate change, population growth, and inefficient water management.
        </p>
        <p className="text-gray-900 text-lg leading-relaxed">
          A significant contributor to water wastage is undetected leaks and unintentional overuse. Homeowners, businesses, and industries often remain unaware of leaks until they receive an unusually high water bill or notice water damage.
        </p>
        <p className="text-gray-900 text-lg leading-relaxed">
          Traditional leak detection methods rely on physical inspections or expensive smart meters, which are not accessible to all users.
        </p>
      </div>
      </div>
      
      {/* Image */}
      <div className="flex justify-center">
        <img
          src="waterWast.png"
          alt="Water Wastage Infographic"
          className="rounded-lg shadow-lg w-full max-w-md"
        />
      </div>
    </div>
  </div>
</section>

{/* Solution Section */}
<section className="relative py-20 px-6 bg-[#023047]  sm:h-screen">
{/* <div 
    className="absolute inset-0 bg-[url('/waterdark.png')] bg-no-repeat bg-cover bg-center blur-sm" ></div> */}
  {/* Background Image */}
  
  {/* Content Wrapper */}
  <div className="relative container mx-auto px-6 z-10">
    <h2 className="text-3xl font-bold text-center mb-8 text-blue-300">A Smarter Way to Detect and Prevent Water Leaks</h2>
    
    <div className="grid md:grid-cols-2 gap-5 items-center">
      <div className="flex justify-center">
        <img src="waterLeak2.png" alt="System Diagram" className="rounded-lg shadow-lg" />
      </div>
      <div>
        <p className="text-gray-300 mb-4">
          Our <span className="font-bold">Smart Water Leak Detection and Prevention System</span> utilizes a single sensor installed at the main water entry point of a house, factory, farm, or any other facility.
        </p>
        <p className="text-gray-300 mb-4">
          The system applies data science techniques to analyze daily water consumption patterns, identifying unusual behaviors that may indicate leaks or accidentally left-open faucets.
        </p>
        <ul className="list-disc list-inside text-gray-300">
          <li>Real-time monitoring with a single sensor.</li>
          <li>AI-driven anomaly detection.</li>
          <li>Automatic shutoff mechanism.</li>
          <li>Customizable settings and data insights.</li>
        </ul>
      </div>
    </div>
  </div>
</section>


      {/* Key Features Section */}
      {/* <section className="relative py-20 px-6 bg-white sm:h-screen">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">
            Why Choose Our Smart Water Leak Detection System?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold mb-4">Real-Time Monitoring</h3>
              <p className="text-gray-600">
                A single sensor at the main water inlet collects data on water flow and consumption patterns.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold mb-4">AI-Powered Anomaly Detection</h3>
              <p className="text-gray-600">
                Machine learning algorithms analyze real-time data and compare it to historical trends.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold mb-4">Automatic Shutoff</h3>
              <p className="text-gray-600">
                If a leak is detected and the user does not respond, the system can automatically shut off the main water supply.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Features Section */}
      <section id="features" className="relative py-20 px-6 bg-blue-50 sm:h-screen">
  {/* Background Image with Blur */}
  {/* <div
    className="absolute inset-0 bg-[url('/waterlight1.png')] bg-no-repeat bg-cover bg-center blur-sm z-0"
  ></div> */}

  {/* Content Container */}
  <div className="relative z-10">
    <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">
      Key Features
    </h2>
    <div className="grid md:grid-cols-3 gap-6 mt-10 px-6">
      {features.map((feature, index) => (
        <div key={index} className="p-6 text-center shadow-lg rounded bg-gray-50">
          <feature.icon className="text-blue-500 text-4xl mx-auto" />
          <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
          <p className="text-gray-600 mt-2">{feature.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Why Choose Us Section */}
      <section id="features" className="relative py-20 px-6 bg-[#023047] sm:h-screen">
  {/* Background Image with Blur */}
  {/* <div
    className="absolute inset-0 bg-[url('/waterdark1.png')] bg-no-repeat bg-cover bg-center blur-sm z-0"
  ></div> */}

  {/* Content Container */}
  <div className="container mx-auto px-6 relative z-10">
    <h2 className="text-3xl font-bold text-center text-gray-100 mb-12">
      Why Choose Our Solution?
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-20">
      {/* Cost-Effective */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-blue-800 mb-4">Cost-Effective</h3>
        <p className="text-gray-700">
          Our system uses a single sensor, making it 90% cheaper than traditional multi-sensor systems.
        </p>
      </div>

      {/* Easy Installation */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-blue-800 mb-4">Easy Installation</h3>
        <p className="text-gray-700">
          Plug-and-play compatibility with existing plumbing—no need to replace pipes or faucets.
        </p>
      </div>

      {/* AI-Powered Accuracy */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-blue-800 mb-4">AI-Powered Accuracy</h3>
        <p className="text-gray-700">
          AI-driven anomaly detection ensures accurate leak identification without expensive infrastructure changes.
        </p>
      </div>

      {/* Scalable */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-blue-800 mb-4">Scalable</h3>
        <p className="text-gray-700">
          Suitable for homes, farms, factories, and industrial plants—scales efficiently across sectors.
        </p>
      </div>
    </div>
  </div>
</section>

      {/* Impact Section */}
      <section id="features" className="relative py-20 px-6 bg-blue-50 sm:h-screen">
  {/* Background Image with Blur */}
  {/* <div
    className="absolute inset-0 bg-[url('/waterlight2.png')] bg-no-repeat bg-cover bg-center blur-sm z-0"
  ></div> */}

  {/* Content Container */}
  <div className="container mx-auto px-6 relative z-10">
    <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">
      Impact & Benefits
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Water Conservation */}
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h3 className="text-xl font-semibold text-green-700 mb-4">Water Conservation</h3>
        <p className="text-gray-700">
          Reduces water wastage by detecting and preventing leaks early.
        </p>
      </div>

      {/* Cost Savings */}
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h3 className="text-xl font-semibold text-green-700 mb-4">Cost Savings</h3>
        <p className="text-gray-700">
          Saves on water bills by avoiding excessive and undetected usage.
        </p>
      </div>

      {/* Property Protection */}
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h3 className="text-xl font-semibold text-green-700 mb-4">Property Protection</h3>
        <p className="text-gray-700">
          Prevents water damage in homes, factories, and farms.
        </p>
      </div>

      {/* Sustainability */}
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h3 className="text-xl font-semibold text-green-700 mb-4">Sustainability</h3>
        <p className="text-gray-700">
          Promotes responsible water usage and supports global conservation efforts.
        </p>
      </div>
    </div>
  </div>
</section>
    <section className="relative sm:h-screen ">
      <div 
    className="absolute inset-0 bg-[url('/section6-bg.png')] bg-no-repeat bg-cover bg-center blur-sm" ></div>
     
     <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="container grid grid-cols-2 items-center sm:h-screen  mx-auto px-6">
      <motion.div
            className="container mx-auto px-6  lg:px-20 text-start"
            initial={{ opacity: 0, x: -50 }}
            animate={{opacity:1,x:50}}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">development tools</h1>
      </motion.div>
        <div className="relative flex  max-w-lg max-h-lg items-center justify-center overflow-hidden rounded-lg border bg-background px-20 py-20 ">
              <IconCloud  imageArray={images} />
         </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
