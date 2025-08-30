import React, { useState } from 'react';
import { ChevronDown, Phone, ExternalLink, Mail, Menu, X } from 'lucide-react';

const GetHelpNowPage = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const countries = [
    'India',
    'United States',
    'United Kingdom',
    'Canada',
    'Australia',
    'Other'
  ];

  const helplineData = {
    India: {
      emergency: '112',
      resources: [
        { name: 'Suicide Hotline', phone: '8888817666' },
        { name: 'iCALL Helpline', phone: '+91-91529-87821', website: 'https://icallhelpline.org' },
        { name: 'KIRAN Mental Health Helpline', phone: '1800-599-0019' },
        { name: 'Sneha India', phone: '91 44 24640050', website: 'http://www.snehaindia.org' },
        { name: 'Student / Child Helpline', phone: '1098', website: 'https://www.csindia.org/helpline-numbers' },
        { name: 'Vandrevala Foundation Helpline', phone: '+91-9999-666-555', website: 'https://www.vandrevalafoundation.com' },
        { name: 'Women Helpline Number', phone: '181', website: 'https://wcd.nic.in/women-helpline-number-181' }
      ]
    },
    'United States': {
      emergency: '911',
      resources: [
        { name: '988 Suicide & Crisis Lifeline', phone: '988', website: 'https://988lifeline.org/' },
        { name: 'Crisis Text Line', phone: 'Text HOME to 741741', website: 'https://www.crisistextline.org/' },
        { name: 'NAMI HelpLine', phone: '800-950-6264', website: 'https://www.nami.org/' },
        { name: 'Veterans Crisis Line', phone: '988 then press 1', website: 'https://www.veteranscrisisline.net/' },
        { name: 'The Trevor Project (LGBTQ Youth)', phone: '866-488-7386', website: 'https://www.thetrevorproject.org/' },
        { name: 'National Domestic Violence Hotline', phone: '800-799-7233', website: 'https://www.thehotline.org/' },
        { name: 'Childhelp National Child Abuse Hotline', phone: '800-422-4453', website: 'https://childhelphotline.org/' }
      ]
    },
    'United Kingdom': {
      emergency: '999',
      resources: [
        { name: 'Samaritans', phone: '116 123', website: 'https://www.samaritans.org/' },
        { name: 'National Suicide Prevention Helpline UK', phone: '0800 689 5652', website: 'https://spuk.org.uk/' },
        { name: 'CALM', phone: '0800 58 58 58', website: 'https://www.thecalmzone.net/' },
        { name: 'Shout', phone: 'Text SHOUT to 85258', website: 'https://giveusashout.org/' },
        { name: 'Papyrus HOPELINE247 (under 35)', phone: '0800 068 4141', website: 'https://www.papyrus-uk.org/' },
        { name: 'Childline', phone: '0800 1111', website: 'https://www.childline.org.uk/' },
        { name: 'National Domestic Abuse Helpline', phone: '0808 2000 247', website: 'https://www.nationaldahelpline.org.uk/' }
      ]
    },
    Canada: {
      emergency: '911',
      resources: [
        { name: '988 Suicide Crisis Helpline', phone: '9-8-8', website: 'https://988.ca/' },
        { name: 'Kids Help Phone', phone: '1-800-668-6868', website: 'https://kidshelpphone.ca/' },
        { name: 'Hope for Wellness Helpline (Indigenous)', phone: '1-855-242-3310', website: 'https://www.hopeforwellness.ca/' },
        { name: 'Trans Lifeline', phone: '1-877-330-6366', website: 'https://translifeline.org/' },
        { name: 'Crisis Text Line (Youth)', phone: 'Text WELLNESS to 686868', website: 'https://kidshelpphone.ca/' }
      ]
    },
    Australia: {
      emergency: '000',
      resources: [
        { name: 'Lifeline', phone: '13 11 14', website: 'https://www.lifeline.org.au/' },
        { name: 'Beyond Blue', phone: '1300 22 4636', website: 'https://www.beyondblue.org.au/' },
        { name: 'Suicide Call Back Service', phone: '1300 659 467', website: 'https://www.suicidecallbackservice.org.au/' },
        { name: 'Kids Helpline', phone: '1800 55 1800', website: 'https://kidshelpline.com.au/' },
        { name: 'MensLine Australia', phone: '1300 78 99 78', website: 'https://mensline.org.au/' },
        { name: '1800RESPECT (Domestic Violence)', phone: '1800 737 732', website: 'https://www.1800respect.org.au/' }
      ]
    },
    Other: {
      emergency: 'Local emergency services (e.g., 911, 112, or 999)',
      resources: [
        { name: 'Befrienders Worldwide', website: 'https://befrienders.org/' },
        { name: 'International Association for Suicide Prevention', website: 'https://www.iasp.info/suicidalthoughts/' },
        { name: 'Lifeline International', website: 'https://lifeline-international.com/' },
        { name: 'Find a Helpline', website: 'https://findahelpline.com/' }
      ]
    }
  };

  const navigationItems = [
    'Business', 'About', 'Advice', 'FAQ', 'Therapist jobs', 'Contact'
  ];

  const footerLinks = [
    'Home', 'Business', 'About', 'FAQ', 'Advice', 'Careers', 
    'Find a Therapist', 'Contact', 'For Therapists'
  ];

  const currentData = helplineData[selectedCountry];

  return (
    <div className="min-h-screen bg-white">
      
      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Get Help Now
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              If you are in a crisis or any other person may be in danger, the following resources can provide you with immediate help.
            </p>
          </div>
        </section>

        {/* Country Selection and Resources */}
        <section className="bg-green-700 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Country Selector */}
            <div className="mb-8">
              <div className="relative max-w-md mx-auto">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <span className="text-gray-700">
                    {selectedCountry || 'Find a country'}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                    {countries.map((country) => (
                      <button
                        key={country}
                        onClick={() => {
                          setSelectedCountry(country);
                          setIsDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg text-gray-700"
                      >
                        {country}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Crisis Resources */}
            {currentData && (
              <div className="bg-white rounded-lg p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{selectedCountry}</h2>
                
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <span className="font-semibold text-red-600 mr-2">Emergency:</span>
                    <a href={`tel:${currentData.emergency}`} className="text-blue-600 hover:underline flex items-center">
                      <Phone size={16} className="mr-1" />
                      {currentData.emergency}
                    </a>
                  </div>

                  {currentData.resources.map((res, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:items-start">
                      <span className="font-semibold text-gray-700 mr-2">{res.name}:</span>
                      <div className="flex flex-col space-y-1">
                        {res.phone && (
                          <a href={`tel:${res.phone}`} className="text-blue-600 hover:underline flex items-center">
                            <Phone size={16} className="mr-1" />
                            {res.phone}
                          </a>
                        )}
                        {res.website && (
                          <a href={res.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                            <ExternalLink size={16} className="mr-1" />
                            {res.website}
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Updated on August 26, 2025</strong>
                  </p>
                  <p className="text-sm text-gray-600">
                    Spiritus assumes no responsibility or liability for the professional ability, reputation, or quality of services provided by the entities or individuals listed above. Inclusion on this list does not constitute an endorsement by Spiritus. The order does not imply any ranking or evaluation. Spiritus cannot vouch for the contact information's accuracy. If you discover any inaccuracies in the contact information, please email us at{' '}
                    <a href="mailto:sudheesh@duck.com" className="text-blue-600 hover:underline">
                      sudheesh@duck.com
                    </a>
                    {' '}so we can update it.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        
      </main>

 
      
    </div>
  );
};

export default GetHelpNowPage;