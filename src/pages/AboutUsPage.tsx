import AnnouncementBar from '../components/AnnouncementBar';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ScrollUpButton from '../components/ScrollUpButton';
import { LoginModal } from "../components/ui/LoginModal";
import { SearchModal } from "../components/ui/SearchModal";
import React, { useEffect } from "react";
import { Leaf, Users, Award, Heart } from "lucide-react";

function AboutUsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen relative">
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/A3_Landscape.jpg')" }}
      />

      <AnnouncementBar />
      <Navigation />

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-green-800 mb-4">About Bubble Organic</h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              We're passionate about bringing you the finest organic products, sourced directly from nature's bounty.
              Our commitment to quality, sustainability, and health drives everything we do.
            </p>
          </div>

          {/* Our Story */}
          <div className="bg-white/40 backdrop-blur-lg rounded-xl p-8 mb-12 border border-white/50">
            <h2 className="text-3xl font-bold text-green-800 mb-6 flex items-center gap-3">
              <Leaf className="w-8 h-8" />
              Our Story
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
               Our company proudly introducing organic essential product for our modern society.
               It is our great delight and pride to introduce our company as organic certified company in the market, we are endeavouring food manufacturing and marketing organic products in the market. Our company has been following traditional in-store selling methods and also in digital shops. We have very good connectivity over the city and rural shops in India especially southern part. We also available in online stores. We offer better services and good price.
            </p>
          </div>

          {/* Our Vision, Mission & Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/40 backdrop-blur-lg rounded-xl p-8 border border-white/50">
              <h3 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-3">
                <Award className="w-6 h-6" />
                Our Vision
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Our company goal to forefront the development of essential products, advance on the path to sustainability and to be leading brand.
              </p>
            </div>

            <div className="bg-white/40 backdrop-blur-lg rounded-xl p-8 border border-white/50">
              <h3 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-3">
                <Award className="w-6 h-6" />
                Our Mission
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Our company committed to providing the highest quality authentic organic food and legitimate services.
              </p>
            </div>

            <div className="bg-white/40 backdrop-blur-lg rounded-xl p-8 border border-white/50">
              <h3 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-3">
                <Heart className="w-6 h-6" />
                Our Values
              </h3>
              <ul className="text-gray-700 space-y-2">
                <li>Our moral principles and the method of modernism ensure the nutritional substances in organic food and also nudge towards organic food consumption.</li>
              </ul>
            </div>
          </div>

          {/* Our Team */}
          <div className="bg-white/40 backdrop-blur-lg rounded-xl p-8 mb-12 border border-white/50">
            <h2 className="text-3xl font-bold text-green-800 mb-6 flex items-center gap-3">
              <Users className="w-8 h-8" />
              Organic Farming Method
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
                Organic farming does not use any artificial or chemical pesticides, 
                fertilizers additional liquid boosters for more yields and so on, does not pollute the earth and the 
                ground water sources. These farms play a vital role in nourishing an ecosystem that is friendly to 
                human life. Organic foods are not only good for consumption and general health, but also are healthy 
                for the environment. The Organic food movement is an attempt to go back to the wisdom of our forefathers 
                whose cultivation practices ensured that food production was not in conflict with the natural ecosystem etc. 
                The inherent commitment of organic farming to crop rotation, living soil, companion planting, rural enterprise, pure water and sustainable agriculture is, in itself, a critical step toward protecting our environment. Organic food is produced by an ecological system of 
                agricultural management that produces nutritionally superior plants, resistant to pests and disease. 
                Organic farming builds and maintains healthy soil through traditional methods of crop rotation, planting cover crops, 
                releasing beneficial insects, and composting.
            </p>
          </div>
          
          {/* Certifications */}
          <div className="bg-white/40 backdrop-blur-lg rounded-xl p-8 border border-white/50">
            <h2 className="text-3xl font-bold text-green-800 mb-6">Our Certifications</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We're proud to be certified by leading organic and quality assurance organizations, ensuring you get
              the best nature has to offer.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <img src="/logos/fssai.jpg" alt="FSSAI" className="w-16 h-16 mx-auto mb-2 object-contain" />
                <p className="text-sm text-gray-700">FSSAI Certified</p>
              </div>
              <div className="text-center">
                <img src="/logos/organic-india.jpg" alt="Organic India" className="w-16 h-16 mx-auto mb-2 object-contain" />
                <p className="text-sm text-gray-700">Organic India</p>
              </div>
              <div className="text-center">
                <img src="/logos/usda-organic.jpg" alt="USDA Organic" className="w-16 h-16 mx-auto mb-2 object-contain" />
                <p className="text-sm text-gray-700">USDA Organic</p>
              </div>
              <div className="text-center">
                <img src="/logos/pgs.jpg" alt="PGS" className="w-16 h-16 mx-auto mb-2 object-contain" />
                <p className="text-sm text-gray-700">PGS Certified</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <ScrollUpButton />
      <LoginModal />
      <SearchModal />
    </div>
  );
}

export default AboutUsPage;
